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
  EstadoNovedad, Empresa, TipoBeneficio, IndicadorNomina
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
import { CreateConceptoNominaDto, TipoRubroExtendido } from './dto/create-concepto-nomina.dto';
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

  async getBeneficiosStats(empresaId: string): Promise<any[]> {

    // 1. Buscamos beneficios recurrentes
    const beneficios = await this.beneficioRepository.find({
      where: {
        empresaId,
        esRecurrente: true
      }
    });

    // 2. Contamos empleados totales
    const totalEmpleados = await this.empleadoRepository.count({
      where: { empresaId, estado: 'Activo' }
    });

    // 3. Generamos la estadística
    const stats = await Promise.all(beneficios.map(async (beneficio) => {

      // 👇 CORRECCIÓN: Quitamos 'activo: true'
      // TypeORM contará automáticamente solo las asignaciones que NO han sido borradas (Soft Delete)
      const count = await this.beneficioAsignadoRepository.count({
        where: { beneficioId: beneficio.id }
      });

      return {
        id: beneficio.id,
        nombre: beneficio.nombre,
        tipo: beneficio.indicador,
        assignedCount: count,
        totalEmployees: totalEmpleados
      };
    }));

    return stats;
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
  /**
    * CREAR un nuevo concepto (plantilla) de nómina o beneficio
    * Validado por Multi-Tenant (RNF20).
    */
  async createConceptoNomina(empresaId: string, dto: CreateConceptoNominaDto): Promise<any> {

    // 1. ANALIZAR INTENCIÓN
    const esRecurrente = dto.esRecurrente || dto.esFijo;
    const esBeneficioAsignable = esRecurrente && !dto.esAutomatico;

    // ---------------------------------------------------------
    // A. GUARDAR EN TABLA 'BENEFICIOS'
    // ---------------------------------------------------------
    if (esBeneficioAsignable) {
      console.log('🔀 Guardando como BENEFICIO ASIGNABLE...');

      const nuevoBeneficio = this.beneficioRepository.create({
        empresaId: empresaId,
        nombre: dto.nombre,
        descripcion: 'Creado desde configuración',

        // Usamos el Enum de la Entidad Beneficio (MONETARIO)
        tipo: TipoBeneficio.MONETARIO,

        // Mapeo seguro de Indicador
        indicador: (dto.indicador as any) || IndicadorNomina.INGRESO,

        esRecurrente: true,
        montoEstimado: dto.montoEstimado ?? 0
      });

      return this.beneficioRepository.save(nuevoBeneficio);
    }

    // ---------------------------------------------------------
    // B. GUARDAR EN TABLA 'CONCEPTOS_NOMINA'
    // ---------------------------------------------------------
    console.log('🔀 Guardando como CONCEPTO GLOBAL...');

    // Lógica de traducción de Tipo (Usando el Enum Extendido que importamos)
    let tipoRubro = TipoRubro.INGRESO;

    if (
      dto.indicador === IndicadorNomina.DESCUENTO ||
      dto.tipo === TipoRubroExtendido.EGRESO || // 👈 Ahora sí reconoce esto
      dto.tipo?.toString() === 'Egreso'
    ) {
      tipoRubro = TipoRubro.EGRESO;
    }

    const nuevoConcepto = this.conceptoNominaRepository.create({
      empresaId: empresaId,
      nombre: dto.nombre,
      tipo: tipoRubro,

      esFijo: dto.esRecurrente || dto.esFijo || false,
      esAutomatico: dto.esAutomatico || false,
      montoEstimado: dto.montoEstimado ?? undefined,
      formula: dto.formula ?? undefined
    });

    return this.conceptoNominaRepository.save(nuevoConcepto);
  }

  /**
   * ACTUALIZAR un concepto (plantilla) de nómina
   * Validado por Multi-Tenant (RNF20).
   */
  async updateConceptoNomina(
    empresaId: string,
    id: string, // El ID que viene del frontend
    dto: any,   // Usamos 'any' o 'UpdateConceptoNominaDto' para flexibilidad
  ): Promise<any> {

    // -----------------------------------------------------------
    // ESCENARIO 1: ¿Es un CONCEPTO / REGLA GLOBAL? (Tabla Conceptos)
    // -----------------------------------------------------------
    const concepto = await this.conceptoNominaRepository.findOneBy({ id, empresaId });

    if (concepto) {
      console.log('🔄 Actualizando CONCEPTO NOMINA...');

      // 1. Validar nombre duplicado (si cambió)
      if (dto.nombre && dto.nombre !== concepto.nombre) {
        const existe = await this.conceptoNominaRepository.findOneBy({
          nombre: dto.nombre, empresaId, id: Not(id)
        });
        if (existe) throw new ConflictException('Ya existe un concepto con ese nombre.');
        concepto.nombre = dto.nombre;
      }

      // 2. Mapeo Inteligente (DTO -> Entidad Concepto)

      // A. Tipo (Ingreso/Egreso)
      if (dto.indicador || dto.tipo) {
        const esEgreso = dto.indicador === IndicadorNomina.DESCUENTO ||
          dto.tipo === 'Egreso' ||
          dto.tipo === TipoRubro.EGRESO;
        concepto.tipo = esEgreso ? TipoRubro.EGRESO : TipoRubro.INGRESO;
      }

      // B. Flags
      if (dto.esRecurrente !== undefined) concepto.esFijo = dto.esRecurrente;
      if (dto.esAutomatico !== undefined) concepto.esAutomatico = dto.esAutomatico;

      // C. Valores
      if (dto.montoEstimado !== undefined) concepto.montoEstimado = dto.montoEstimado;
      if (dto.formula !== undefined) concepto.formula = dto.formula;

      return this.conceptoNominaRepository.save(concepto);
    }

    // -----------------------------------------------------------
    // ESCENARIO 2: ¿Es un BENEFICIO ASIGNABLE? (Tabla Beneficios)
    // -----------------------------------------------------------
    const beneficio = await this.beneficioRepository.findOneBy({ id, empresaId });

    if (beneficio) {
      console.log('🔄 Actualizando BENEFICIO...');

      // 1. Validar nombre duplicado
      if (dto.nombre && dto.nombre !== beneficio.nombre) {
        const existe = await this.beneficioRepository.findOneBy({
          nombre: dto.nombre, empresaId, id: Not(id)
        });
        if (existe) throw new ConflictException('Ya existe un beneficio con ese nombre.');
        beneficio.nombre = dto.nombre;
      }

      // 2. Mapeo Inteligente (DTO -> Entidad Beneficio)

      // A. Indicador (Ingreso/Descuento)
      if (dto.indicador) {
        beneficio.indicador = dto.indicador;
      } else if (dto.tipo) {
        // Compatibilidad si manda tipo antiguo
        beneficio.indicador = (dto.tipo === 'Egreso' || dto.tipo === TipoRubro.EGRESO)
          ? IndicadorNomina.DESCUENTO
          : IndicadorNomina.INGRESO;
      }

      // B. Descripción
      if (dto.descripcion !== undefined) beneficio.descripcion = dto.descripcion;

      // C. Recurrencia (Por defecto true en beneficios, pero permitimos editar)
      if (dto.esRecurrente !== undefined) beneficio.esRecurrente = dto.esRecurrente;

      // D. Monto
      if (dto.montoEstimado !== undefined) beneficio.montoEstimado = dto.montoEstimado;

      return this.beneficioRepository.save(beneficio);
    }

    // -----------------------------------------------------------
    // ESCENARIO 3: NO EXISTE
    // -----------------------------------------------------------
    throw new NotFoundException('El concepto o beneficio no fue encontrado.');
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

      // 2. Obtener Rubros Automáticos de Ley (Aporte Patronal, IESS Personal)
      // Buscamos beneficios marcados como 'esAutomatico'
      const rubrosAutomaticos = await manager.find(Beneficio, {
        where: { empresaId, esAutomatico: true }
      });

      // 3. Obtener Contratos Activos
      const contratos = await manager.find(Contrato, {
        where: { estado: 'Vigente', empleado: { empresaId } },
        relations: ['empleado']
      });

      // --- MOTOR DE CÁLCULO ---
      for (const contrato of contratos) {
        const emp = contrato.empleado;
        const salarioBase = Number(contrato.salario) || 0;

        console.log(`\n👤 Procesando: ${emp.nombre} ${emp.apellido} | Base: $${salarioBase}`);

        let totalIngresos = 0;
        let totalEgresos = 0;

        // A. Crear Cabecera del Rol
        const rolPago = manager.create(NominaEmpleado, {
          empleadoId: emp.id,
          periodoId: periodo.id,
          fechaGeneracion: new Date()
        });
        await manager.save(rolPago);

        // ==========================================
        // B. INGREDIENTE 1: SALARIO BASE
        // ==========================================
        const rubroSalario = manager.create(RubroNomina, {
          nominaEmpleadoId: rolPago.id,
          tipo: 'Ingreso',
          concepto: 'Salario Base',
          valor: salarioBase
        });
        await manager.save(rubroSalario);
        totalIngresos += salarioBase;

        // ==========================================
        // C. INGREDIENTE 2: RUBROS AUTOMÁTICOS (IESS)
        // ==========================================
        for (const auto of rubrosAutomaticos) {
          // Si tiene fórmula (porcentaje), calculamos
          if (auto.montoEstimado && auto.montoEstimado > 0) { // Usamos montoEstimado como % si es decimal pequeño (0.0945)
            const valorCalculado = salarioBase * Number(auto.montoEstimado); // Ej: 1000 * 0.0945 = 94.5

            // Guardamos el rubro
            const rubroAuto = manager.create(RubroNomina, {
              nominaEmpleadoId: rolPago.id,
              tipo: auto.indicador === 'Ingreso' ? 'Ingreso' : 'Egreso', // Mapeamos tu enum nuevo
              concepto: auto.nombre,
              valor: Number(valorCalculado.toFixed(2))
            });
            await manager.save(rubroAuto);

            if (rubroAuto.tipo === 'Ingreso') totalIngresos += rubroAuto.valor;
            else totalEgresos += rubroAuto.valor;
          }
        }

        // ==========================================
        // D. INGREDIENTE 3: BENEFICIOS RECURRENTES (Asignados)
        // ==========================================
        // Buscamos qué beneficios tiene asignados ESTE empleado
        const asignaciones = await manager.find(BeneficioAsignado, {
          where: { empleadoId: emp.id, activo: true },
          relations: ['beneficio']
        });

        for (const asignacion of asignaciones) {
          const ben = asignacion.beneficio;
          // Usamos el monto de la asignación si existe, sino el del beneficio base
          const valor = Number(asignacion.montoPersonalizado || ben.montoEstimado || 0);

          if (valor > 0) {
            const rubroRecurrente = manager.create(RubroNomina, {
              nominaEmpleadoId: rolPago.id,
              tipo: ben.indicador === 'Ingreso' ? 'Ingreso' : 'Egreso',
              concepto: ben.nombre,
              valor: Number(valor.toFixed(2))
            });
            await manager.save(rubroRecurrente);

            if (rubroRecurrente.tipo === 'Ingreso') totalIngresos += rubroRecurrente.valor;
            else totalEgresos += rubroRecurrente.valor;
          }
        }

        // ==========================================
        // E. INGREDIENTE 4: NOVEDADES DEL MES
        // ==========================================
        // Buscamos novedades registradas para este empleado en este periodo
        // (Asumimos que tienes una entidad NovedadNomina)
        /* const novedades = await manager.find(NovedadNomina, {
           where: { empleadoId: emp.id, periodoId: periodo.id }
        });
        for (const nov of novedades) {
           // ... lógica similar para sumar/restar novedades ...
        }
        */

        // F. Guardar Totales Finales
        rolPago.totalIngresos = Number(totalIngresos.toFixed(2));
        rolPago.totalEgresos = Number(totalEgresos.toFixed(2));
        rolPago.netoAPagar = Number((totalIngresos - totalEgresos).toFixed(2));
        await manager.save(rolPago);
      }

      // 4. Cerrar Periodo
      periodo.estado = EstadoPeriodo.PROCESADO;
      await manager.save(periodo);

      return { message: 'Nómina procesada correctamente', count: contratos.length };
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

  async getUnifiedCatalog(empresaId: string) {
    // 1. Traer Conceptos (Novedades y Reglas)
    const conceptos = await this.conceptoNominaRepository.find({ where: { empresaId } });

    // 2. Traer Beneficios Recurrentes (Gimnasio, etc.)
    const beneficios = await this.beneficioRepository.find({ where: { empresaId } });

    // 3. Unificar formato para el Frontend
    const unificados = [
      ...conceptos.map(c => ({
        id: c.id,
        nombre: c.nombre,
        tipo: c.tipo, // 'Ingreso' o 'Egreso'
        esFijo: c.esAutomatico, // Si es automático, es fijo global
        origen: 'concepto',
        formula: c.montoEstimado ? `${c.montoEstimado * 100}%` : null
      })),
      ...beneficios.map(b => ({
        id: b.id,
        nombre: b.nombre,
        tipo: b.indicador === 'Descuento' ? 'Egreso' : 'Ingreso',
        esFijo: true, // Por definición, los beneficios aquí son fijos
        origen: 'beneficio',
        formula: b.montoEstimado ? `$${b.montoEstimado}` : null
      }))
    ];

    return unificados;
  }
}