// apps/nomina/src/nomina.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Contrato, Empleado, Beneficio, BeneficioAsignado, PeriodoNomina, NominaEmpleado,
  RubroNomina, ConceptoNomina, SolicitudVacaciones, EstadoSolicitud, NovedadNomina,
  EstadoNovedad, Empresa
} from 'default/database';
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
import { CreateSolicitudDto } from './dto/create-solicitud.dto';



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
    @InjectRepository(SolicitudVacaciones)
    private solicitudRepo: Repository<SolicitudVacaciones>,
    @InjectRepository(NovedadNomina)
    private novedadNominaRepo: Repository<NovedadNomina>,
    @InjectRepository(Empresa) private readonly empresaRepository: Repository<Empresa>,
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
   * Validado por Multi-Tenant (RNF20).|
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

  async obtenerNovedadesPorEmpleado(empleadoId: string) {
    return this.novedadNominaRepo.find({
      where: { empleadoId },
      relations: ['concepto'], // Para ver el nombre "Bono Productividad"
      order: { fecha: 'DESC' }
    });
  }

  /**
   * Lógica de negocio para "Procesar Nómina" (POST /nomina/procesar)
   *
   * Esta es la lógica "ultra completa" que usa transacciones.
   */
  async procesarNomina(empresaId: string, periodoId: string): Promise<any> {
    return this.entityManager.transaction('SERIALIZABLE', async (manager) => {

      console.log('🔄 INICIANDO PROCESO DE NÓMINA - PERIODO:', periodoId);

      // 1. Validar Período
      const periodo = await manager.findOneBy(PeriodoNomina, { id: periodoId, empresaId });
      if (!periodo || periodo.estado !== EstadoPeriodo.ABIERTO) {
        throw new ConflictException('Período cerrado o no válido.');
      }

      // 2. Obtener Conceptos Fijos
      const conceptosFijos = await manager.findBy(ConceptoNomina, { empresaId, esFijo: true });
      console.log(`📋 Conceptos Fijos encontrados: ${conceptosFijos.length}`);

      // 3. Obtener Contratos
      const contratos = await manager.find(Contrato, {
        where: { estado: 'Vigente', empleado: { empresaId } },
        relations: ['empleado']
      });
      console.log(`👥 Empleados a procesar: ${contratos.length}`);

      // --- MOTOR ---
      for (const contrato of contratos) {
        const emp = contrato.empleado;
        console.log(`\n👤 Procesando: ${emp.nombre} ${emp.apellido}`);

        // VALIDACIÓN DE SALARIO
        const salarioBase = Number(contrato.salario);
        console.log(`   💰 Salario Contrato: $${salarioBase}`); // <--- MIRA ESTE LOG EN CONSOLA

        if (!salarioBase || salarioBase === 0) {
          console.warn(`   ⚠️ ALERTA: El empleado tiene salario 0 o inválido.`);
        }

        let totalIngresos = 0;
        let totalEgresos = 0;

        // A. Crear Cabecera
        const rolPago = manager.create(NominaEmpleado, {
          empleadoId: emp.id,
          periodoId: periodo.id,
          fechaGeneracion: new Date()
        });
        await manager.save(rolPago);

        // B. SALARIO BASE AUTOMÁTICO
        const rubroSalario = manager.create(RubroNomina, {
          nominaEmpleadoId: rolPago.id,
          tipo: 'Ingreso', // Hardcoded para evitar errores de Enum
          concepto: 'Salario Base',
          valor: salarioBase
        });
        await manager.save(rubroSalario);
        totalIngresos += salarioBase;
        console.log(`   ➕ Sumado Salario Base: $${totalIngresos}`);

        // C. CONCEPTOS FIJOS
        for (const c of conceptosFijos) {
          const nombre = c.nombre.toLowerCase();

          // FILTRO DE SEGURIDAD
          if (nombre.includes('salario') || nombre.includes('sueldo')) {
            console.log(`   🚫 Ignorando concepto manual duplicado: "${c.nombre}"`);
            continue;
          }

          let valor = 0;
          if (c.formula) {
            const pct = parseFloat(c.formula);
            if (!isNaN(pct)) {
              valor = salarioBase * (pct / 100);
              console.log(`   ⚙️ Calculando ${c.nombre} (${pct}%): $${valor}`);
            }
          }

          if (valor > 0) {
            const rubro = manager.create(RubroNomina, {
              nominaEmpleadoId: rolPago.id,
              tipo: c.tipo,
              concepto: c.nombre,
              valor: Number(valor.toFixed(2))
            });
            await manager.save(rubro);

            if (c.tipo === 'Ingreso') totalIngresos += rubro.valor;
            else totalEgresos += rubro.valor;
          }
        }

        // D. Guardar Totales
        rolPago.totalIngresos = Number(totalIngresos.toFixed(2));
        rolPago.totalEgresos = Number(totalEgresos.toFixed(2));
        rolPago.netoAPagar = Number((totalIngresos - totalEgresos).toFixed(2));
        await manager.save(rolPago);

        console.log(`   ✅ FIN EMPLEADO: Ing: ${rolPago.totalIngresos} | Egr: ${rolPago.totalEgresos} | Neto: ${rolPago.netoAPagar}`);
      }

      // 4. Cerrar
      periodo.estado = EstadoPeriodo.PROCESADO;
      await manager.save(periodo);

      return { message: 'Proceso completado', count: contratos.length };
    });
  }
  async solicitarVacaciones(empresaId: string, dto: CreateSolicitudDto): Promise<SolicitudVacaciones> {
    // 1. Validar Empleado
    const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
    if (!empleado) throw new NotFoundException('Empleado no válido.');

    // 2. Calcular días (Simplificado: Diferencia de fechas)
    const inicio = new Date(dto.fechaInicio);
    const fin = new Date(dto.fechaFin);

    if (fin < inicio) throw new BadRequestException('La fecha fin debe ser posterior al inicio.');

    const diffTime = Math.abs(fin.getTime() - inicio.getTime());
    const diasSolicitados = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día final

    // 3. Crear Solicitud
    const solicitud = this.solicitudRepo.create({
      empleadoId: dto.empleadoId,
      fechaInicio: inicio,
      fechaFin: fin,
      diasSolicitados,
      comentario: dto.comentario,
      estado: EstadoSolicitud.PENDIENTE
    });

    return this.solicitudRepo.save(solicitud);
  }

  async getSolicitudes(empresaId: string): Promise<SolicitudVacaciones[]> {
    // Retorna todas las solicitudes de la empresa (para el admin)
    return this.solicitudRepo.find({
      where: { empleado: { empresaId } },
      relations: ['empleado'],
      order: { createdAt: 'DESC' }
    });
  }
  async registrarNovedad(data: any) {
    console.log('💰 Registering novelty:', data);

    // 1. (Optional) Find Concept ID by name if the frontend sends a string
    let conceptoId = data.conceptoId;

    // If you receive "Bonus" string instead of UUID, find it (or create it dynamically if allowed)
    if (!conceptoId && data.concepto) {
      const concepto = await this.conceptoNominaRepository.findOne({
        where: { nombre: data.concepto, empresaId: data.empresaId }
      });
      if (concepto) conceptoId = concepto.id;
    }

    // 2. Create the record
    const nuevaNovedad = this.novedadNominaRepo.create({
      empleadoId: data.empleadoId,
      conceptoId: conceptoId,
      valor: data.monto,
      fecha: new Date(data.fecha),
      observacion: data.observacion,
      estado: EstadoNovedad.PENDIENTE,
      empresaId: data.empresaId
    });

    return this.novedadNominaRepo.save(nuevaNovedad);
  }
  // 1. OBTENER CONFIGURACIÓN
  async obtenerConfiguracion(empresaId: string) {
    const empresa = await this.empresaRepository.findOne({
      where: { id: empresaId },
      select: ['configuracion'] // Solo traemos lo necesario
    });
    // Retornamos solo la parte de nómina o un objeto vacío
    return empresa?.configuracion?.nomina || { frecuenciaPago: 'mensual', multiplicadorHorasExtra: 1.5 };
  }

  // 2. ACTUALIZAR CONFIGURACIÓN
  async actualizarConfiguracion(empresaId: string, datosNomina: any) {
    const empresa = await this.empresaRepository.findOneBy({ id: empresaId });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    // Inicializamos si está vacío
    if (!empresa.configuracion) empresa.configuracion = {};

    // Actualizamos solo la parte de nómina, conservando lo demás
    empresa.configuracion.nomina = {
      ...empresa.configuracion.nomina,
      ...datosNomina
    };

    await this.empresaRepository.save(empresa);
    return empresa.configuracion.nomina;
  }
  async obtenerReporteNomina(empresaId: string, periodoId: string) {
    // 1. Buscamos las cabeceras (NominaEmpleado)
    const nominas = await this.entityManager.find(NominaEmpleado, {
      where: {
        periodoId: periodoId,
        empleado: { empresaId: empresaId } // Seguridad: solo empleados de la empresa
      },
      relations: ['empleado', 'empleado.cargo', 'rubros'], // ¡Importante: traer rubros!
      order: { empleado: { apellido: 'ASC' } }
    });

    // 2. Transformamos la data para que sea fácil de usar en el frontend
    return nominas.map(n => {
      // Separamos rubros para facilitar el PDF
      const ingresos = n.rubros.filter(r => r.tipo === 'Ingreso');
      const egresos = n.rubros.filter(r => r.tipo === 'Egreso');

      return {
        id: n.id,
        empleado: {
          nombre: n.empleado.nombre,
          apellido: n.empleado.apellido,
          cedula: n.empleado.nroIdentificacion || 'S/N',
          cargo: n.empleado.cargo?.nombre || 'General'
        },
        totales: {
          ingresos: n.totalIngresos,
          egresos: n.totalEgresos,
          neto: n.netoAPagar
        },
        detalles: {
          ingresos: ingresos.map(i => ({ concepto: i.concepto, valor: i.valor })),
          egresos: egresos.map(e => ({ concepto: e.concepto, valor: e.valor }))
        }
      };
    });
  }
}