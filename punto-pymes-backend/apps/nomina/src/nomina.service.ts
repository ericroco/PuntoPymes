// apps/nomina/src/nomina.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato, Empleado, Beneficio, BeneficioAsignado, PeriodoNomina, NominaEmpleado, RubroNomina, ConceptoNomina } from 'default/database';
import { Repository, Not, LessThanOrEqual, MoreThanOrEqual, EntityManager } from 'typeorm';
import {
  CreateContratoDto,
  EstadoContrato,
} from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import {
  CreatePeriodoNominaDto,
  EstadoPeriodo,
} from './dto/create-periodo-nomina.dto';
import { UpdatePeriodoNominaDto } from './dto/update-periodo-nomina.dto';
import { CreateConceptoNominaDto } from './dto/create-concepto-nomina.dto';
import { UpdateConceptoNominaDto } from './dto/update-concepto-nomina.dto';
import { ProcesarNominaDto } from './dto/procesar-nomina.dto';
import { TipoRubro } from '../../../libs/database/src/entities/conceptoNomina.entity';

@Injectable()
export class NominaService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
    @InjectRepository(BeneficioAsignado)
    private readonly beneficioAsignadoRepository: Repository<BeneficioAsignado>,
    @InjectRepository(PeriodoNomina)
    private readonly periodoNominaRepository: Repository<PeriodoNomina>,
    @InjectRepository(NominaEmpleado)
    private readonly nominaEmpleadoRepository: Repository<NominaEmpleado>,
    @InjectRepository(RubroNomina)
    private readonly rubroNominaRepository: Repository<RubroNomina>,
    @InjectRepository(ConceptoNomina)
    private readonly conceptoNominaRepository: Repository<ConceptoNomina>,
    private readonly entityManager: EntityManager,
  ) { }

  /**
   * Lógica para OBTENER todos los contratos de UN empleado (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async getContratosByEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<Contrato[]> {
    console.log(
      `Microservicio NOMINA: Buscando contratos para empleado ${empleadoId}`,
    );

    // 1. Validar que el empleado pertenece a la empresa del usuario (RNF20)
    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new NotFoundException(
        'Empleado no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si es válido, buscar sus contratos
    return this.contratoRepository.find({
      where: { empleadoId: empleadoId },
      withDeleted: false, // No mostrar los borrados lógicamente
      order: { fechaInicio: 'DESC' }, // Mostrar los más recientes primero
    });
  }

  /**
   * Lógica para CREAR un nuevo contrato (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async createContrato(
    empresaId: string,
    dto: CreateContratoDto,
  ): Promise<Contrato> {
    // 1. Validar que el empleadoId del DTO pertenece a la empresa (RNF20)
    const empleado = await this.empleadoRepository.findOneBy({
      id: dto.empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new BadRequestException(
        'El empleadoId proporcionado no es válido o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "Solo un contrato puede estar activo"
    const estadoNuevo = dto.estado || EstadoContrato.VIGENTE;
    if (estadoNuevo === EstadoContrato.VIGENTE) {
      const contratoActivo = await this.contratoRepository.findOneBy({
        empleadoId: dto.empleadoId,
        estado: EstadoContrato.VIGENTE,
      });
      if (contratoActivo) {
        throw new ConflictException(
          'El empleado ya tiene un contrato "Vigente". No se puede crear otro.',
        );
      }
    }

    // 3. Crear el contrato
    const nuevoContrato = this.contratoRepository.create({
      ...dto,
      estado: estadoNuevo,
    });

    return this.contratoRepository.save(nuevoContrato);
  }

  /**
   * Lógica para ACTUALIZAR un contrato (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async updateContrato(
    empresaId: string,
    contratoId: string,
    dto: UpdateContratoDto,
  ): Promise<Contrato> {
    // 1. Validar que el contrato pertenece a la empresa (RNF20)
    // Hacemos un 'join' con empleado para verificar el empresaId
    const contrato = await this.contratoRepository.findOne({
      where: { id: contratoId },
      relations: ['empleado'], // Cargamos la relación
    });

    if (!contrato || contrato.empleado.empresaId !== empresaId) {
      throw new NotFoundException(
        'Contrato no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "Solo un contrato puede estar activo"
    // Si están intentando poner este contrato como "Vigente"...
    if (dto.estado === EstadoContrato.VIGENTE) {
      // ...buscamos si OTRO contrato (excluyendo el actual) ya está vigente.
      const otroContratoVigente = await this.contratoRepository.findOneBy({
        empleadoId: contrato.empleadoId,
        estado: EstadoContrato.VIGENTE,
        id: Not(contratoId), // ¡Importante: Excluirnos a nosotros mismos!
      });

      if (otroContratoVigente) {
        throw new ConflictException(
          'No se puede activar este contrato. El empleado ya tiene OTRO contrato vigente.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const contratoActualizado = this.contratoRepository.merge(contrato, dto);
    return this.contratoRepository.save(contratoActualizado);
  }

  /**
   * Lógica para "borrar" lógicamente (Soft Delete) un contrato.
   */
  async deleteContrato(
    empresaId: string,
    contratoId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el contrato pertenece a la empresa (RNF20)
    const contrato = await this.contratoRepository.findOne({
      where: { id: contratoId },
      relations: ['empleado'],
    });

    if (!contrato || contrato.empleado.empresaId !== empresaId) {
      throw new NotFoundException(
        'Contrato no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "No borrar un contrato vigente"
    // Esto fuerza al usuario a usar el flujo correcto de "Desvincular Empleado"
    // que definimos en personal.service.ts
    if (contrato.estado === EstadoContrato.VIGENTE) {
      throw new BadRequestException(
        'No se puede borrar un contrato "Vigente". Use la función "Desvincular Empleado" en el módulo de personal para finalizarlo.',
      );
    }

    // 3. Ejecutar Soft Delete
    await this.contratoRepository.softRemove(contrato);

    return { message: 'Contrato eliminado (desactivado) correctamente.' };
  }
  // --- INICIO DE CRUD PARA BENEFICIO (RF-19) ---

  /**
   * Lógica para OBTENER todos los beneficios (plantillas)
   * de una empresa (Multi-Tenant RNF20).
   */
  async getBeneficios(empresaId: string): Promise<Beneficio[]> {
    console.log(
      `Microservicio NOMINA: Buscando beneficios para empresaId: ${empresaId}`,
    );
    return this.beneficioRepository.find({
      where: { empresaId: empresaId },
      withDeleted: false,
    });
  }

  /**
   * Lógica para CREAR un nuevo beneficio (plantilla)
   * Validado por Multi-Tenant (RNF20).
   */
  async createBeneficio(
    empresaId: string,
    dto: CreateBeneficioDto,
  ): Promise<Beneficio> {
    // 1. Validar duplicados (Multi-Tenant)
    const beneficioExistente = await this.beneficioRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });
    if (beneficioExistente) {
      throw new ConflictException(
        'Ya existe un beneficio con ese nombre en esta empresa.',
      );
    }

    // 2. Crear el beneficio
    const nuevoBeneficio = this.beneficioRepository.create({
      ...dto,
      empresaId: empresaId, // ¡Forzamos el Multi-tenancy!
    });

    return this.beneficioRepository.save(nuevoBeneficio);
  }

  /**
   * Lógica para ACTUALIZAR un beneficio (plantilla)
   * Validado por Multi-Tenant (RNF20).
   */
  async updateBeneficio(
    empresaId: string,
    beneficioId: string,
    dto: UpdateBeneficioDto,
  ): Promise<Beneficio> {
    // 1. Validar que el beneficio pertenece a la empresa
    const beneficio = await this.beneficioRepository.findOneBy({
      id: beneficioId,
      empresaId: empresaId,
    });
    if (!beneficio) {
      throw new NotFoundException(
        'Beneficio no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se cambia el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== beneficio.nombre) {
      const beneficioExistente = await this.beneficioRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
        id: Not(beneficioId),
      });
      if (beneficioExistente) {
        throw new ConflictException(
          'Ya existe un beneficio con ese nombre en esta empresa.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const beneficioActualizado = this.beneficioRepository.merge(beneficio, dto);
    return this.beneficioRepository.save(beneficioActualizado);
  }

  /**
   * Lógica para "borrar" lógicamente (Soft Delete) un beneficio.
   */
  async deleteBeneficio(
    empresaId: string,
    beneficioId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el beneficio pertenece a la empresa
    const beneficio = await this.beneficioRepository.findOneBy({
      id: beneficioId,
      empresaId: empresaId,
    });
    if (!beneficio) {
      throw new NotFoundException(
        'Beneficio no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio "Ultra Completa":
    // ¡No podemos borrar una plantilla de beneficio si está asignada a empleados!
    const asignaciones = await this.beneficioAsignadoRepository.count({
      where: { beneficioId: beneficioId },
    });

    if (asignaciones > 0) {
      throw new ConflictException(
        `No se puede eliminar. Este beneficio está asignado a ${asignaciones} empleado(s).`,
      );
    }

    // 3. Ejecutar Soft Delete
    await this.beneficioRepository.softRemove(beneficio);

    return { message: 'Beneficio eliminado correctamente.' };
  }
  // --- INICIO DE CRUD PARA PERIODO NOMINA (RF-20) ---

  /**
   * Lógica para OBTENER todos los períodos de nómina
   * de una empresa (Multi-Tenant RNF20).
   */
  async getPeriodosNomina(empresaId: string): Promise<PeriodoNomina[]> {
    return this.periodoNominaRepository.find({
      where: { empresaId: empresaId },
      withDeleted: false,
      order: { fechaInicio: 'DESC' }, // Más recientes primero
    });
  }

  /**
   * Lógica para CREAR un nuevo período de nómina
   * Validado por Multi-Tenant (RNF20).
   */
  async createPeriodoNomina(
    empresaId: string,
    dto: CreatePeriodoNominaDto,
  ): Promise<PeriodoNomina> {
    // 1. Lógica "Ultra Completa": Validar que las fechas no se superpongan
    // (Que no exista un período donde [inicio <= nuevo_fin] Y [fin >= nuevo_inicio])
    const overlap = await this.periodoNominaRepository.findOne({
      where: {
        empresaId: empresaId,
        fechaInicio: LessThanOrEqual(dto.fechaFin),
        fechaFin: MoreThanOrEqual(dto.fechaInicio),
      },
    });

    if (overlap) {
      throw new ConflictException(
        'Las fechas de este período se superponen con un período existente.',
      );
    }

    // 2. Crear el período (ya no se pasa 'nombre')
    const nuevoPeriodo = this.periodoNominaRepository.create({
      ...dto,
      empresaId: empresaId,
      estado: dto.estado || EstadoPeriodo.ABIERTO,
    });

    return this.periodoNominaRepository.save(nuevoPeriodo);
  }

  /**
    * Lógica para ACTUALIZAR un período de nómina
    * (Método CORREGIDO)
    */
  async updatePeriodoNomina(
    empresaId: string,
    periodoId: string,
    dto: UpdatePeriodoNominaDto,
  ): Promise<PeriodoNomina> {
    const periodo = await this.periodoNominaRepository.findOneBy({
      id: periodoId,
      empresaId: empresaId,
    });
    if (!periodo) {
      throw new NotFoundException(
        'Período no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se cambian las fechas, validar superposición
    if (dto.fechaInicio || dto.fechaFin) {
      const fechaInicioValidar = dto.fechaInicio || periodo.fechaInicio;
      const fechaFinValidar = dto.fechaFin || periodo.fechaFin;

      const overlap = await this.periodoNominaRepository.findOne({
        where: {
          empresaId: empresaId,
          fechaInicio: LessThanOrEqual(fechaFinValidar),
          fechaFin: MoreThanOrEqual(fechaInicioValidar),
          id: Not(periodoId), // Excluir el período actual
        },
      });

      if (overlap) {
        throw new ConflictException(
          'Las nuevas fechas de este período se superponen con un período existente.',
        );
      }
    }

    // 3. Aplicar cambios y guardar (ya no hay 'nombre')
    const periodoActualizado = this.periodoNominaRepository.merge(
      periodo,
      dto,
    );
    return this.periodoNominaRepository.save(periodoActualizado);
  }

  /**
   * Lógica para "borrar" lógicamente (Soft Delete) un período.
   */
  async deletePeriodoNomina(
    empresaId: string,
    periodoId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el período pertenece a la empresa
    const periodo = await this.periodoNominaRepository.findOneBy({
      id: periodoId,
      empresaId: empresaId,
    });
    if (!periodo) {
      throw new NotFoundException(
        'Período no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica "Ultra Completa": No borrar si ya está procesado o cerrado
    if (periodo.estado === EstadoPeriodo.PROCESADO) {
      throw new ConflictException(
        'No se puede eliminar un período que ya ha sido procesado.',
      );
    }

    // 3. Lógica "Ultra Completa": No borrar si tiene nóminas de empleados asociadas
    const nominasGeneradas = await this.nominaEmpleadoRepository.count({
      where: { periodoId: periodoId },
    });

    if (nominasGeneradas > 0) {
      throw new ConflictException(
        `No se puede eliminar. Este período tiene ${nominasGeneradas} nóminas de empleados asociadas.`,
      );
    }

    // 4. Ejecutar Soft Delete
    await this.periodoNominaRepository.softRemove(periodo);

    return { message: 'Período de nómina eliminado correctamente.' };
  }
  // --- INICIO DE CRUD PARA CONCEPTO NOMINA (Semana 9) ---

  /**
   * OBTENER todos los conceptos (plantillas) de nómina
   * de una empresa (Multi-Tenant RNF20).
   */
  async getConceptosNomina(empresaId: string): Promise<ConceptoNomina[]> {
    return this.conceptoNominaRepository.find({
      where: { empresaId: empresaId },
      withDeleted: false,
      order: { tipo: 'ASC', nombre: 'ASC' }, // Ordenar por Ingreso/Egreso y Nombre
    });
  }

  /**
   * CREAR un nuevo concepto (plantilla) de nómina
   * Validado por Multi-Tenant (RNF20).
   */
  async createConceptoNomina(
    empresaId: string,
    dto: CreateConceptoNominaDto,
  ): Promise<ConceptoNomina> {
    // 1. Validar duplicados por nombre
    const existente = await this.conceptoNominaRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });
    if (existente) {
      throw new ConflictException(
        'Ya existe un concepto de nómina con ese nombre en esta empresa.',
      );
    }

    // 2. Crear el concepto (¡Ahora sí con empresaId!)
    const nuevoConcepto = this.conceptoNominaRepository.create({
      ...dto,
      empresaId: empresaId, // ¡Forzamos el Multi-tenancy!
      esFijo: dto.esFijo || false,
    });

    return this.conceptoNominaRepository.save(nuevoConcepto);
  }

  /**
   * ACTUALIZAR un concepto (plantilla) de nómina
   * Validado por Multi-Tenant (RNF20).
   */
  async updateConceptoNomina(
    empresaId: string,
    conceptoId: string,
    dto: UpdateConceptoNominaDto,
  ): Promise<ConceptoNomina> {
    // 1. Validar que el concepto pertenece a la empresa
    const concepto = await this.conceptoNominaRepository.findOneBy({
      id: conceptoId,
      empresaId: empresaId,
    });
    if (!concepto) {
      throw new NotFoundException(
        'Concepto no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se cambia el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== concepto.nombre) {
      const existente = await this.conceptoNominaRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
        id: Not(conceptoId),
      });
      if (existente) {
        throw new ConflictException(
          'Ya existe un concepto de nómina con ese nombre en esta empresa.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const conceptoActualizado = this.conceptoNominaRepository.merge(
      concepto,
      dto,
    );
    return this.conceptoNominaRepository.save(conceptoActualizado);
  }

  /**
   * "Borrar" lógicamente (Soft Delete) un concepto (plantilla).
   */
  async deleteConceptoNomina(
    empresaId: string,
    conceptoId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el concepto pertenece a la empresa
    const concepto = await this.conceptoNominaRepository.findOneBy({
      id: conceptoId,
      empresaId: empresaId,
    });
    if (!concepto) {
      throw new NotFoundException(
        'Concepto no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica "Ultra Completa":
    // No borrar si la plantilla ya ha sido usada en un cálculo de nómina.
    // (Buscamos en la tabla de *detalles* RubroNomina)
    const query = this.rubroNominaRepository
      .createQueryBuilder('rubro')
      .innerJoin('rubro.nominaEmpleado', 'nominaEmpleado')
      .innerJoin('nominaEmpleado.empleado', 'empleado')
      .where('empleado.empresaId = :empresaId', { empresaId })
      .andWhere('rubro.concepto = :concepto', { concepto: concepto.nombre });

    const usos = await query.getCount();

    if (usos > 0) {
      throw new ConflictException(
        `No se puede eliminar. Este concepto ya ha sido utilizado en ${usos} nóminas procesadas.`,
      );
    }

    // 3. Ejecutar Soft Delete
    await this.conceptoNominaRepository.softRemove(concepto);

    return { message: 'Concepto de nómina eliminado correctamente.' };
  }
  // --- INICIO DE LÓGICA DE PROCESAMIENTO (Semana 9) ---

  /**
   * Lógica de negocio para "Procesar Nómina" (POST /nomina/procesar)
   *
   * Esta es la lógica "ultra completa" que usa transacciones.
   */
  async procesarNomina(
    empresaId: string,
    periodoId: string,
  ): Promise<{ message: string; empleadosProcesados: number }> {

    // 2. ¡Iniciamos la transacción! O todo funciona, o nada se guarda.
    return this.entityManager.transaction(
      'SERIALIZABLE', // Nivel de aislamiento alto para nóminas
      async (manager) => {
        // 3. Validar el Período
        const periodo = await manager.findOneBy(PeriodoNomina, {
          id: periodoId,
          empresaId: empresaId,
        });
        if (!periodo) {
          throw new NotFoundException('Período de nómina no encontrado.');
        }
        if (periodo.estado !== EstadoPeriodo.ABIERTO) {
          throw new ConflictException(
            'El período de nómina no está "Abierto". No se puede procesar.',
          );
        }

        // 4. Obtener las plantillas de rubros (Conceptos)
        const conceptos = await manager.findBy(ConceptoNomina, {
          empresaId: empresaId,
        });
        if (conceptos.length === 0) {
          throw new BadRequestException(
            'No hay "Conceptos de Nómina" configurados para esta empresa.',
          );
        }

        // 5. Obtener todos los Contratos Vigentes de la empresa
        const contratosVigentes = await manager.find(Contrato, {
          where: {
            estado: 'Vigente',
            empleado: { empresaId: empresaId },
          },
          relations: ['empleado'], // Incluimos al empleado
        });

        if (contratosVigentes.length === 0) {
          throw new NotFoundException(
            'No se encontraron empleados con contratos vigentes para procesar.',
          );
        }

        // --- 6. El Motor: Loop por cada empleado ---
        for (const contrato of contratosVigentes) {
          const empleado = contrato.empleado;
          let totalIngresos = 0;
          let totalEgresos = 0;

          // 7. Crear la "Cabecera" (NominaEmpleado)
          const nuevaNominaEmpleado = manager.create(NominaEmpleado, {
            empleadoId: empleado.id,
            periodoId: periodo.id,
            // Los totales se actualizarán al final
          });
          await manager.save(nuevaNominaEmpleado); // Guardamos para obtener el ID

          // --- 8. Loop anidado: por cada concepto (plantilla) ---
          for (const concepto of conceptos) {
            let valorCalculado = 0;

            // --- 9. Lógica de Cálculo (Simplificada por ahora) ---
            // (Aquí iría tu motor de fórmulas)
            if (concepto.nombre === 'Salario Base') {
              valorCalculado = contrato.salario; // Asumimos salario completo
            } else if (concepto.nombre === 'Aporte IESS (9.45%)') {
              // Los egresos DEBEN ser números positivos en el cálculo
              valorCalculado = contrato.salario * 0.0945;
            }
            // ... (Aquí añadirías "Bonos", "Anticipos", etc.)

            // 10. Crear el "Detalle" (RubroNomina)
            const nuevoRubro = manager.create(RubroNomina, {
              nominaEmpleadoId: nuevaNominaEmpleado.id,
              tipo: concepto.tipo,
              concepto: concepto.nombre,
              valor: valorCalculado,
            });
            await manager.save(nuevoRubro);

            // 11. Actualizar totales
            if (concepto.tipo === TipoRubro.INGRESO) {
              totalIngresos += valorCalculado;
            } else if (concepto.tipo === TipoRubro.EGRESO) {
              totalEgresos += valorCalculado;
            }
          } // --- Fin loop de conceptos

          // 12. Actualizar la cabecera (NominaEmpleado) con los totales
          nuevaNominaEmpleado.totalIngresos = totalIngresos;
          nuevaNominaEmpleado.totalEgresos = totalEgresos;
          nuevaNominaEmpleado.netoAPagar = totalIngresos - totalEgresos;
          await manager.save(nuevaNominaEmpleado);
        } // --- Fin loop de empleados

        // 13. Cerrar el período
        periodo.estado = EstadoPeriodo.PROCESADO;
        await manager.save(periodo);

        console.log(
          `Microservicio NOMINA: Nómina procesada para ${contratosVigentes.length} empleados.`,
        );

        return {
          message: 'Nómina procesada exitosamente.',
          empleadosProcesados: contratosVigentes.length,
        };
      }, // --- Fin de la transacción
    );
  }
}