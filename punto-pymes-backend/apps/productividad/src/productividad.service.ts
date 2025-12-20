// apps/productividad/src/productividad.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Proyecto, Sprint, Empleado, Tarea, AsignacionTarea, CicloEvaluacion,
  Objetivo, Evaluacion, EstadoCiclo, Curso, InscripcionCurso, EstadoInscripcion, RegistroAsistencia,
  Activo, ActivoAsignado, EstadoActivo, EstadoAsignacion, ReporteGasto,
  ItemGasto, EstadoReporte, Departamento, TipoObjetivo,
} from 'default/database';
import { Repository, Not, Between, MoreThanOrEqual, LessThanOrEqual, In } from 'typeorm';
import {
  CreateProyectoDto,
  EstadoProyecto,
} from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { CreateTareaDto, EstadoTarea, PrioridadTarea } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';
import { CreateObjetivoDto } from './dto/create-objetivo.dto';
import { UpdateObjetivoDto } from './dto/update-objetivo.dto';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { CreateActivoDto } from './dto/create-activo.dto';
import { UpdateActivoDto } from './dto/update-activo.dto';
import { AssignActivoDto } from './dto/assign-activo.dto';
import { ReturnActivoDto } from './dto/return-activo.dto';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { CreateItemGastoDto } from './dto/create-item-gasto.dto';
import { UpdateReporteEstadoDto } from './dto/update-reporte-estado.dto';
import { DashboardKpiDto } from './dto/dashboard-kpi.dto';
@Injectable()
export class ProductividadService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    // Inyectamos Sprint para validar el borrado
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
    // Inyectamos Empleado para validar el liderId
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @InjectRepository(AsignacionTarea)
    private readonly asignacionRepository: Repository<AsignacionTarea>,
    @InjectRepository(CicloEvaluacion)
    private readonly cicloRepository: Repository<CicloEvaluacion>,
    @InjectRepository(Objetivo)
    private readonly objetivoRepository: Repository<Objetivo>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(InscripcionCurso)
    private readonly inscripcionRepository: Repository<InscripcionCurso>,
    @InjectRepository(RegistroAsistencia)
    private readonly asistenciaRepository: Repository<RegistroAsistencia>,
    @InjectRepository(Activo)
    private readonly activoRepository: Repository<Activo>,
    @InjectRepository(ActivoAsignado)
    private readonly activoAsignadoRepository: Repository<ActivoAsignado>,
    @InjectRepository(ReporteGasto) private readonly reporteRepository: Repository<ReporteGasto>,
    @InjectRepository(ItemGasto) private readonly itemGastoRepository: Repository<ItemGasto>,
  ) { }

  // --- INICIO DE CRUD PARA PROYECTO (Semana 9) ---

  /**
   * OBTENER todos los proyectos de una empresa (Multi-Tenant RNF20)
   *
   */
  async getProyectos(empresaId: string): Promise<Proyecto[]> {
    return this.proyectoRepository.find({
      where: { empresaId: empresaId },
      relations: ['lider'], // Cargar la info del empleado líder
      withDeleted: false, // Usamos Soft Delete
    });
  }

  /**
   * CREAR un nuevo proyecto (Multi-Tenant RNF20)
   */
  async createProyecto(
    empresaId: string,
    dto: CreateProyectoDto,
  ): Promise<Proyecto> {
    // 1. Validar duplicados por nombre
    const existente = await this.proyectoRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });
    if (existente) {
      throw new ConflictException(
        'Ya existe un proyecto con ese nombre en esta empresa.',
      );
    }

    // 2. (Opcional) Validar que el líderId sea un empleado de la empresa
    if (dto.liderId) {
      const lider = await this.empleadoRepository.findOneBy({
        id: dto.liderId,
        empresaId: empresaId, // ¡Validación Multi-Tenant!
      });
      if (!lider) {
        throw new BadRequestException(
          'El líder seleccionado no es un empleado válido de esta empresa.',
        );
      }
    }

    // 3. Crear el proyecto
    const nuevoProyecto = this.proyectoRepository.create({
      ...dto,
      empresaId: empresaId, // ¡Forzamos el Multi-tenancy!
      estado: dto.estado || EstadoProyecto.ACTIVO, // Default
    });

    return this.proyectoRepository.save(nuevoProyecto);
  }

  /**
   * ACTUALIZAR un proyecto (Multi-Tenant RNF20)
   */
  async updateProyecto(
    empresaId: string,
    proyectoId: string,
    dto: UpdateProyectoDto,
  ): Promise<Proyecto> {
    // 1. Validar que el proyecto pertenece a la empresa
    const proyecto = await this.proyectoRepository.findOneBy({
      id: proyectoId,
      empresaId: empresaId,
    });
    if (!proyecto) {
      throw new NotFoundException(
        'Proyecto no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. (Opcional) Validar nuevo líder si cambia
    if (dto.liderId && dto.liderId !== proyecto.liderId) {
      const lider = await this.empleadoRepository.findOneBy({
        id: dto.liderId,
        empresaId: empresaId,
      });
      if (!lider) {
        throw new BadRequestException(
          'El líder seleccionado no es un empleado válido de esta empresa.',
        );
      }
    }

    // 3. Si se cambia el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== proyecto.nombre) {
      const existente = await this.proyectoRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
        id: Not(proyectoId),
      });
      if (existente) {
        throw new ConflictException(
          'Ya existe un proyecto con ese nombre en esta empresa.',
        );
      }
    }

    // 4. Aplicar cambios y guardar
    const proyectoActualizado = this.proyectoRepository.merge(proyecto, dto);
    return this.proyectoRepository.save(proyectoActualizado);
  }

  /**
   * "Borrar" lógicamente (Soft Delete) un proyecto.
   */
  async deleteProyecto(
    empresaId: string,
    proyectoId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el proyecto pertenece a la empresa
    const proyecto = await this.proyectoRepository.findOneBy({
      id: proyectoId,
      empresaId: empresaId,
    });
    if (!proyecto) {
      throw new NotFoundException(
        'Proyecto no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica "Ultra Completa": No borrar si tiene Sprints asociados
    const sprints = await this.sprintRepository.count({
      where: { proyectoId: proyectoId },
    });

    if (sprints > 0) {
      throw new ConflictException(
        `No se puede eliminar. Este proyecto tiene ${sprints} sprint(s) asociados.`,
      );
    }

    // 3. Ejecutar Soft Delete
    await this.proyectoRepository.softRemove(proyecto);

    return { message: 'Proyecto eliminado correctamente.' };
  }
  // --- FIN DE CRUD PARA PROYECTO ---
  // ==========================================
  //        CRUD DE SPRINTS (COMPLETO)
  // ==========================================

  /**
   * 1. CREAR Sprint
   */
  async createSprint(
    empresaId: string,
    proyectoId: string,
    dto: CreateSprintDto,
  ): Promise<Sprint> {
    // Validar que el proyecto pertenece a la empresa
    const proyecto = await this.proyectoRepository.findOneBy({
      id: proyectoId,
      empresaId: empresaId,
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado o no tienes acceso.');
    }

    // Validar lógica de fechas
    if (dto.fechaInicio >= dto.fechaFin) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la de fin.');
    }

    const sprint = this.sprintRepository.create({
      ...dto,
      proyectoId: proyectoId,
    });

    return this.sprintRepository.save(sprint);
  }

  /**
   * 2. LEER Sprints de un Proyecto
   */
  async getSprintsByProyecto(
    empresaId: string,
    proyectoId: string,
  ): Promise<Sprint[]> {
    // Validamos acceso al proyecto primero
    const proyecto = await this.proyectoRepository.findOneBy({
      id: proyectoId,
      empresaId: empresaId,
    });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    return this.sprintRepository.find({
      where: { proyectoId: proyectoId },
      order: { fechaInicio: 'ASC' }, // Ordenar por fecha
    });
  }

  /**
   * 3. ACTUALIZAR Sprint
   */
  async updateSprint(
    empresaId: string,
    sprintId: string,
    dto: UpdateSprintDto,
  ): Promise<Sprint> {
    // Buscamos el sprint y cargamos la relación 'proyecto' para verificar la empresaId
    const sprint = await this.sprintRepository.findOne({
      where: { id: sprintId },
      relations: ['proyecto'],
    });

    if (!sprint || sprint.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Sprint no encontrado o no tienes acceso.');
    }

    // Validar fechas si se están actualizando
    const inicio = dto.fechaInicio ? new Date(dto.fechaInicio) : sprint.fechaInicio;
    const fin = dto.fechaFin ? new Date(dto.fechaFin) : sprint.fechaFin;

    if (inicio >= fin) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin.');
    }

    this.sprintRepository.merge(sprint, dto);
    return this.sprintRepository.save(sprint);
  }

  /**
   * 4. BORRAR Sprint (Soft Delete)
   */
  async deleteSprint(
    empresaId: string,
    sprintId: string,
  ): Promise<{ message: string }> {
    // Verificamos propiedad (igual que en update)
    const sprint = await this.sprintRepository.findOne({
      where: { id: sprintId },
      relations: ['proyecto'],
    });

    if (!sprint || sprint.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Sprint no encontrado o no tienes acceso.');
    }

    // Soft Delete
    await this.sprintRepository.softRemove(sprint);
    return { message: 'Sprint eliminado correctamente.' };
  }
  // ==========================================
  //          CRUD DE TAREAS
  // ==========================================

  /**
   * 1. CREAR Tarea (Vinculada a un Sprint)
   */
  async createTarea(
    empresaId: string,
    sprintId: string,
    dto: CreateTareaDto,
  ): Promise<Tarea> {
    // Validar que el Sprint existe y obtener su Proyecto
    const sprint = await this.sprintRepository.findOne({
      where: { id: sprintId },
      relations: ['proyecto'], // Necesitamos el proyecto para saber la empresaId
    });

    if (!sprint || sprint.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Sprint no encontrado o no tienes acceso.');
    }

    // Crear la tarea vinculada al Sprint y al Proyecto
    const tarea = this.tareaRepository.create({
      ...dto,
      sprintId: sprintId,
      proyectoId: sprint.proyecto.id,
      estado: dto.estado || EstadoTarea.PENDIENTE,

      // ASEGURATE DE QUE ESTA LÍNEA ESTÉ ASÍ:
      prioridad: dto.prioridad || PrioridadTarea.MEDIA,
    });

    return this.tareaRepository.save(tarea);
  }

  /**
     * 2. LISTAR Tareas de un Sprint
     * Incluye relaciones clave para el tablero (Asignados y Objetivos).
     */
  async getTareasBySprint(
    empresaId: string,
    sprintId: string,
  ): Promise<Tarea[]> {
    // 1. Validar acceso al Sprint
    const sprint = await this.sprintRepository.findOne({
      where: { id: sprintId },
      relations: ['proyecto'],
    });

    if (!sprint || sprint.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Sprint no encontrado o no tienes acceso.');
    }

    // 2. Buscar tareas con todas sus relaciones
    return this.tareaRepository.find({
      where: { sprintId: sprintId },
      // 👇 ¡ESTO ES LO IMPORTANTE!
      relations: [
        'asignaciones',           // Para saber si está asignada
        'asignaciones.empleado',  // Para mostrar el nombre/foto del empleado
        'objetivo'                // Para saber a qué meta contribuye (y su título)
      ],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 3. ACTUALIZAR Tarea
   */
  async updateTarea(
    empresaId: string,
    tareaId: string,
    dto: UpdateTareaDto,
  ): Promise<Tarea> {
    // Validar propiedad a través del Proyecto
    const tarea = await this.tareaRepository.findOne({
      where: { id: tareaId },
      relations: ['proyecto'],
    });

    if (!tarea || tarea.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Tarea no encontrada o no tienes acceso.');
    }

    this.tareaRepository.merge(tarea, dto);
    return this.tareaRepository.save(tarea);
  }

  /**
   * 4. BORRAR Tarea
   */
  async deleteTarea(
    empresaId: string,
    tareaId: string,
  ): Promise<{ message: string }> {
    const tarea = await this.tareaRepository.findOne({
      where: { id: tareaId },
      relations: ['proyecto'],
    });

    if (!tarea || tarea.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Tarea no encontrada o no tienes acceso.');
    }

    await this.tareaRepository.softRemove(tarea);
    return { message: 'Tarea eliminada correctamente.' };
  }
  // ==========================================
  //        ASIGNACIÓN DE TAREAS
  // ==========================================

  /**
   * 1. ASIGNAR un Empleado a una Tarea
   */
  async assignTarea(
    empresaId: string,
    tareaId: string,
    dto: CreateAsignacionDto,
  ): Promise<AsignacionTarea> {
    console.log('🔍 DEBUG 1: Iniciando assignTarea');

    try {
      // VERIFICACIÓN DE REPOSITORIOS
      if (!this.tareaRepository) throw new Error('CRÍTICO: tareaRepository es undefined');
      if (!this.empleadoRepository) throw new Error('CRÍTICO: empleadoRepository es undefined');
      if (!this.asignacionRepository) throw new Error('CRÍTICO: asignacionRepository es undefined'); // <--- AQUÍ CREO QUE VA A FALLAR

      // 1. Validar Tarea
      console.log('🔍 DEBUG 2: Buscando tarea', tareaId);
      const tarea = await this.tareaRepository.findOne({
        where: { id: tareaId },
        relations: ['proyecto'],
      });

      if (!tarea) throw new NotFoundException('Tarea no encontrada');
      if (tarea.proyecto.empresaId !== empresaId) throw new NotFoundException('No tienes acceso a esta tarea');

      // 2. Validar Empleado
      console.log('🔍 DEBUG 3: Buscando empleado', dto.empleadoId);
      const empleado = await this.empleadoRepository.findOneBy({
        id: dto.empleadoId,
        empresaId: empresaId,
      });

      if (!empleado) throw new BadRequestException('Empleado no encontrado o es de otra empresa');

      // 3. Crear
      console.log('🔍 DEBUG 4: Creando asignación');
      const asignacion = this.asignacionRepository.create({
        tareaId: tareaId,
        empleadoId: dto.empleadoId,
        observaciones: dto.observaciones,
      });

      // 4. Guardar
      console.log('🔍 DEBUG 5: Guardando...');
      const guardado = await this.asignacionRepository.save(asignacion);
      console.log('✅ ÉXITO: Guardado correcto');

      return guardado;

    } catch (error) {
      console.error('💥💥 ERROR EXPLÍCITO EN MICROSERVICIO 💥💥');
      console.error(error); // <--- ESTO ES LO QUE NECESITAMOS LEER
      throw error;
    }
  }
  /**
   * 2. LISTAR Asignaciones de una Tarea
   */
  async getAsignacionesByTarea(
    empresaId: string,
    tareaId: string,
  ): Promise<AsignacionTarea[]> {
    const tarea = await this.tareaRepository.findOne({
      where: { id: tareaId },
      relations: ['proyecto'],
    });

    if (!tarea || tarea.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Tarea no encontrada.');
    }

    return this.asignacionRepository.find({
      where: { tareaId: tareaId },
      relations: ['empleado'], // Para mostrar el nombre del empleado
    });
  }

  /**
   * 3. DESASIGNAR (Eliminar asignación)
   */
  async removeAsignacion(
    empresaId: string,
    asignacionId: string,
  ): Promise<{ message: string }> {
    // Buscamos la asignación y su tarea->proyecto para validar empresa
    const asignacion = await this.asignacionRepository.findOne({
      where: { id: asignacionId },
      relations: ['tarea', 'tarea.proyecto'],
    });

    if (!asignacion || asignacion.tarea.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Asignación no encontrada o no tienes acceso.');
    }

    await this.asignacionRepository.remove(asignacion); // Hard delete está bien aquí, o soft si prefieres
    return { message: 'Empleado desasignado correctamente.' };
  }
  /**
   * 4. ACTUALIZAR Asignación (Ej: cambiar observaciones o cambiar de empleado)
   */
  async updateAsignacion(
    empresaId: string,
    asignacionId: string,
    dto: UpdateAsignacionDto,
  ): Promise<AsignacionTarea> {
    // 1. Buscar la asignación existente y su contexto (tarea -> proyecto)
    const asignacion = await this.asignacionRepository.findOne({
      where: { id: asignacionId },
      relations: ['tarea', 'tarea.proyecto'],
    });

    // 2. Validar acceso (Empresa)
    if (!asignacion || asignacion.tarea.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Asignación no encontrada o no tienes acceso.');
    }

    // 3. Validación extra: Si están intentando cambiar el empleado...
    if (dto.empleadoId && dto.empleadoId !== asignacion.empleadoId) {
      const nuevoEmpleado = await this.empleadoRepository.findOneBy({
        id: dto.empleadoId,
        empresaId: empresaId,
      });
      if (!nuevoEmpleado) {
        throw new BadRequestException('El nuevo empleado no es válido o no pertenece a tu empresa.');
      }
    }

    // 4. Actualizar y Guardar
    this.asignacionRepository.merge(asignacion, dto);
    return this.asignacionRepository.save(asignacion);
  }
  // ==========================================
  //          MÓDULO DESEMPEÑO: CICLOS
  // ==========================================

  async createCiclo(empresaId: string, dto: CreateCicloDto): Promise<CicloEvaluacion> {
    if (dto.fechaInicio >= dto.fechaFin) {
      throw new BadRequestException('La fecha de inicio debe ser anterior al fin.');
    }

    const ciclo = this.cicloRepository.create({
      ...dto,
      empresaId, // Vinculamos al tenant
      estado: dto.estado || EstadoCiclo.PLANIFICACION,
    });

    return this.cicloRepository.save(ciclo);
  }

  async getCiclos(empresaId: string): Promise<CicloEvaluacion[]> {
    return this.cicloRepository.find({
      where: { empresaId },
      order: { fechaInicio: 'DESC' },
    });
  }

  async updateCiclo(empresaId: string, cicloId: string, dto: UpdateCicloDto): Promise<CicloEvaluacion> {
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });

    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    this.cicloRepository.merge(ciclo, dto);
    return this.cicloRepository.save(ciclo);
  }

  async deleteCiclo(empresaId: string, cicloId: string): Promise<any> {
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });

    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    await this.cicloRepository.remove(ciclo); // O softRemove si prefieres
    return { message: 'Ciclo eliminado.' };
  }
  // ==========================================
  //          MÓDULO DESEMPEÑO: OBJETIVOS
  // ==========================================

  /**
   * Crear un objetivo para un empleado en un ciclo específico
   */
  async createObjetivo(
    empresaId: string,
    cicloId: string,
    dto: CreateObjetivoDto,
  ): Promise<Objetivo> {
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    // Validaciones...
    if (dto.tipo === TipoObjetivo.DEPARTAMENTO && !dto.departamentoId) { // Usa el Enum
      throw new BadRequestException('Las metas departamentales requieren un departamentoId');
    }

    // 👇 USO CORRECTO DEL ENUM
    const nuevoObjetivo = this.objetivoRepository.create({
      descripcion: dto.descripcion,
      progreso: dto.progreso || 0,
      tipo: dto.tipo || TipoObjetivo.PERSONAL, // <--- AQUÍ ESTABA EL ERROR (Antes decía 'PERSONAL')
      cicloId: ciclo.id,
      empleadoId: dto.empleadoId,
      departamentoId: dto.departamentoId,
      parentObjetivoId: dto.parentObjetivoId
    });

    return this.objetivoRepository.save(nuevoObjetivo);
  }
  // 2. NUEVO: Obtener objetivos por Departamento
  async getObjetivosDepartamento(
    empresaId: string,
    cicloId: string,
    departamentoId: string
  ): Promise<Objetivo[]> {
    return this.objetivoRepository.find({
      where: {
        cicloId,
        departamentoId,
        // 👇 CORRECCIÓN AQUÍ: Usar el Enum, no el string
        tipo: TipoObjetivo.DEPARTAMENTO
      }
    });
  }

  async getAllObjetivos(empresaId: string, cicloId: string) {
    // Validar ciclo
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado');

    return this.objetivoRepository.find({
      where: { cicloId },
      relations: ['empleado', 'departamento'], // Traemos info de dueños
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Obtener objetivos de un ciclo (opcional: filtrar por empleado)
   */
  async getObjetivos(
    empresaId: string,
    cicloId: string,
    empleadoId?: string,
  ): Promise<Objetivo[]> {
    // Validar ciclo
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    const whereCondition: any = { cicloId };
    if (empleadoId) {
      whereCondition.empleadoId = empleadoId;
    }

    return this.objetivoRepository.find({
      where: whereCondition,
      relations: ['empleado'], // Para ver el nombre del responsable
    });
  }


  /**
   * Actualizar Objetivo (Descripción o Progreso)
   */
  async updateObjetivo(
    empresaId: string,
    objetivoId: string,
    dto: UpdateObjetivoDto,
  ): Promise<Objetivo> {
    // Buscamos por ID y cargamos relación ciclo para validar empresa
    const objetivo = await this.objetivoRepository.findOne({
      where: { id: objetivoId },
      relations: ['ciclo'],
    });

    if (!objetivo || objetivo.ciclo.empresaId !== empresaId) {
      throw new NotFoundException('Objetivo no encontrado.');
    }

    this.objetivoRepository.merge(objetivo, dto);
    return this.objetivoRepository.save(objetivo);
  }

  /**
   * Borrar Objetivo
   */
  async deleteObjetivo(empresaId: string, objetivoId: string) {
    const objetivo = await this.objetivoRepository.findOne({
      where: { id: objetivoId },
      relations: ['ciclo'] // Para validar empresa a través del ciclo
    });

    if (!objetivo || objetivo.ciclo.empresaId !== empresaId) {
      throw new NotFoundException('Objetivo no encontrado o no tienes permisos.');
    }

    await this.objetivoRepository.remove(objetivo);
    return { message: 'Objetivo eliminado correctamente.' };
  }
  // ==========================================
  //          MÓDULO DESEMPEÑO: EVALUACIONES
  // ==========================================

  /**
   * Registrar una nueva evaluación (9-Box)
   */
  async createEvaluacion(
    empresaId: string,
    cicloId: string,
    dto: CreateEvaluacionDto,
  ): Promise<Evaluacion> {
    // 1. Validar Ciclo
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    // 2. Validar Empleados (Evaluado y Evaluador)
    const evaluado = await this.empleadoRepository.findOneBy({ id: dto.evaluadoId, empresaId });
    if (!evaluado) throw new BadRequestException('Empleado a evaluar no válido.');

    const evaluador = await this.empleadoRepository.findOneBy({ id: dto.evaluadorId, empresaId });
    if (!evaluador) throw new BadRequestException('Evaluador no válido.');

    // 3. Evitar duplicados (Un empleado solo una vez por ciclo)
    const existente = await this.evaluacionRepository.findOne({
      where: { cicloId, evaluadoId: dto.evaluadoId }
    });
    if (existente) throw new ConflictException('Este empleado ya fue evaluado en este ciclo.');

    // 4. Crear
    const evaluacion = this.evaluacionRepository.create({
      ...dto,
      cicloId,
    });

    return this.evaluacionRepository.save(evaluacion);
  }

  /**
   * Obtener evaluaciones de un ciclo
   */
  async getEvaluaciones(
    empresaId: string,
    cicloId: string,
  ): Promise<Evaluacion[]> {
    const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado.');

    return this.evaluacionRepository.find({
      where: { cicloId },
      relations: ['evaluado', 'evaluador'], // Cargar nombres
    });
  }

  /**
   * Actualizar Evaluación
   */
  async updateEvaluacion(
    empresaId: string,
    evaluacionId: string,
    dto: UpdateEvaluacionDto,
  ): Promise<Evaluacion> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id: evaluacionId },
      relations: ['ciclo'],
    });

    if (!evaluacion || evaluacion.ciclo.empresaId !== empresaId) {
      throw new NotFoundException('Evaluación no encontrada.');
    }

    this.evaluacionRepository.merge(evaluacion, dto);
    return this.evaluacionRepository.save(evaluacion);
  }

  /**
   * Eliminar Evaluación
   */
  async deleteEvaluacion(
    empresaId: string,
    evaluacionId: string,
  ): Promise<{ message: string }> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id: evaluacionId },
      relations: ['ciclo'],
    });

    if (!evaluacion || evaluacion.ciclo.empresaId !== empresaId) {
      throw new NotFoundException('Evaluación no encontrada.');
    }

    await this.evaluacionRepository.remove(evaluacion);
    return { message: 'Evaluación eliminada.' };
  }
  // ==========================================
  //          MÓDULO LMS: CURSOS
  // ==========================================

  /**
   * Crear un nuevo curso en el catálogo de la empresa
   */
  async createCurso(empresaId: string, dto: CreateCursoDto): Promise<Curso> {
    // 1. Validar duplicados (Correcto, mantenemos tu lógica)
    const existente = await this.cursoRepository.findOneBy({
      titulo: dto.titulo,
      empresaId
    });

    if (existente) {
      throw new ConflictException('Ya existe un curso con este título en tu catálogo.');
    }

    // 2. Crear instancia con valores por defecto
    // Usamos ...dto para los campos que coinciden (titulo, descripcion, instructor, category, duration)
    const curso = this.cursoRepository.create({
      ...dto,
      empresaId,

      // 👇 LÓGICA DE NEGOCIO EXTRA:
      // Si no mandan 'isActive', asumimos que el curso nace activo
      isActive: dto.isActive ?? true,

      // Si no mandan imagen, guardamos una URL por defecto para que no se rompa el frontend
      imageUrl: dto.imageUrl || 'assets/images/default-course.jpg'
    });

    return this.cursoRepository.save(curso);
  }

  /**
   * Obtener todos los cursos de la empresa
   */
  async getCursos(empresaId: string): Promise<Curso[]> {
    return this.cursoRepository.find({
      where: { empresaId },
      order: { createdAt: 'DESC' }, // Los más nuevos primero
    });
  }

  /**
   * Actualizar un curso
   */
  async updateCurso(
    empresaId: string,
    cursoId: string,
    dto: UpdateCursoDto,
  ): Promise<Curso> {
    const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado.');
    }

    this.cursoRepository.merge(curso, dto);
    return this.cursoRepository.save(curso);
  }

  /**
   * Eliminar un curso
   */
  async deleteCurso(
    empresaId: string,
    cursoId: string,
  ): Promise<{ message: string }> {
    const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado.');
    }

    await this.cursoRepository.remove(curso); // Hard delete (se borran inscripciones en cascada)
    return { message: 'Curso eliminado del catálogo.' };
  }
  // ==========================================
  //        LMS: INSCRIPCIONES Y PROGRESO
  // ==========================================

  /**
   * Inscribir a un empleado en un curso
   */
  async createInscripcion(
    empresaId: string,
    cursoId: string,
    dto: CreateInscripcionDto,
  ): Promise<InscripcionCurso> {
    // 1. Validar Curso y Empresa
    const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
    if (!curso) throw new NotFoundException('Curso no encontrado.');

    // 2. Validar Empleado
    const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
    if (!empleado) throw new BadRequestException('Empleado no válido.');

    // 3. Validar Duplicados (El unique constraint de la BD lo hace, pero esto es más amigable)
    const existente = await this.inscripcionRepository.findOne({
      where: { cursoId, empleadoId: dto.empleadoId }
    });
    if (existente) throw new ConflictException('El empleado ya está inscrito en este curso.');

    // 4. Crear
    const inscripcion = this.inscripcionRepository.create({
      cursoId,
      empleadoId: dto.empleadoId,
      estado: dto.estado || EstadoInscripcion.INSCRITO,
    });

    return this.inscripcionRepository.save(inscripcion);
  }

  /**
   * Ver inscripciones de un curso (quiénes lo están tomando)
   */
  async getInscripcionesByCurso(
    empresaId: string,
    cursoId: string,
  ): Promise<InscripcionCurso[]> {
    const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
    if (!curso) throw new NotFoundException('Curso no encontrado.');

    return this.inscripcionRepository.find({
      where: { cursoId },
      relations: ['empleado'], // Ver nombres de los estudiantes
    });
  }

  /**
   * Actualizar progreso (Poner nota, cambiar estado a COMPLETADO)
   */
  async updateInscripcion(
    empresaId: string,
    inscripcionId: string,
    dto: UpdateInscripcionDto,
  ): Promise<InscripcionCurso> {
    // Buscamos la inscripción y el curso padre para validar empresa
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id: inscripcionId },
      relations: ['curso'],
    });

    if (!inscripcion || inscripcion.curso.empresaId !== empresaId) {
      throw new NotFoundException('Inscripción no encontrada.');
    }

    // Lógica automática: Si cambian estado a COMPLETADO y no mandan fecha, ponemos HOY.
    if (dto.estado === EstadoInscripcion.COMPLETADO && !dto.fechaCompletado && !inscripcion.fechaCompletado) {
      inscripcion.fechaCompletado = new Date();
    }

    this.inscripcionRepository.merge(inscripcion, dto);
    return this.inscripcionRepository.save(inscripcion);
  }

  /**
   * Cancelar/Borrar inscripción
   */
  async deleteInscripcion(
    empresaId: string,
    inscripcionId: string,
  ): Promise<{ message: string }> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id: inscripcionId },
      relations: ['curso'],
    });

    if (!inscripcion || inscripcion.curso.empresaId !== empresaId) {
      throw new NotFoundException('Inscripción no encontrada.');
    }

    await this.inscripcionRepository.remove(inscripcion);
    return { message: 'Inscripción eliminada.' };
  }
  // ==========================================
  //        CONTROL DE ASISTENCIA (RELOJ)
  // ==========================================

  /**
   * Marcar Entrada (Check-In)
   * Regla: Solo una entrada por día por empleado.
   */
  async checkIn(
    empresaId: string,
    dto: CheckInDto,
  ): Promise<RegistroAsistencia> {
    // 1. Validar Empleado y Empresa
    const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
    if (!empleado) throw new BadRequestException('Empleado no válido o de otra empresa.');

    // 2. Definir el rango de tiempo de "HOY" (00:00 a 23:59)
    const hoy = new Date();
    const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
    const finDia = new Date(hoy.setHours(23, 59, 59, 999));

    // 3. Verificar si YA marcó entrada HOY
    const registroExistente = await this.asistenciaRepository.findOne({
      where: {
        empleadoId: dto.empleadoId,
        fecha: Between(inicioDia, finDia),
      },
    });

    if (registroExistente) {
      throw new ConflictException('Ya registraste tu entrada el día de hoy.');
    }

    // 4. Crear Registro
    const nuevoRegistro = this.asistenciaRepository.create({
      empleadoId: dto.empleadoId,
      fecha: new Date(),       // Fecha para agrupar
      horaEntrada: new Date(), // Hora exacta
      estado: 'ABIERTO',       // Aún no sale
      observaciones: dto.observaciones,
    });

    return this.asistenciaRepository.save(nuevoRegistro);
  }

  /**
   * Marcar Salida (Check-Out)
   * Regla: Debe tener una entrada ABIERTA hoy.
   */
  async checkOut(
    empresaId: string,
    empleadoId: string,
    dto: CheckOutDto,
  ): Promise<RegistroAsistencia> {
    const hoy = new Date();
    const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
    const finDia = new Date(hoy.setHours(23, 59, 59, 999));

    // 1. Buscar el registro de HOY de ese empleado
    const registro = await this.asistenciaRepository.findOne({
      where: {
        empleadoId,
        fecha: Between(inicioDia, finDia),
      },
      relations: ['empleado'],
    });

    if (!registro) {
      throw new NotFoundException('No has marcado entrada hoy. No puedes marcar salida.');
    }

    if (registro.empleado.empresaId !== empresaId) {
      throw new NotFoundException('No tienes acceso.');
    }

    if (registro.horaSalida) {
      throw new ConflictException('Ya marcaste tu salida hoy.');
    }

    // 2. Calcular Horas Trabajadas (Diferencia en milisegundos)
    const horaSalida = new Date();
    const diferenciaMs = horaSalida.getTime() - registro.horaEntrada.getTime();
    const horasTrabajadas = diferenciaMs / (1000 * 60 * 60); // Convertir a horas decimales

    // 3. Actualizar Registro
    registro.horaSalida = horaSalida;
    registro.totalHoras = parseFloat(horasTrabajadas.toFixed(2)); // Ej: 8.5 horas
    registro.estado = 'CERRADO';

    // Concatenar observaciones si existen
    if (dto.observaciones) {
      registro.observaciones = registro.observaciones
        ? `${registro.observaciones} | Salida: ${dto.observaciones}`
        : dto.observaciones;
    }

    return this.asistenciaRepository.save(registro);
  }

  /**
   * Ver historial de un empleado
   */
  async getHistorialAsistencia(
    empresaId: string,
    empleadoId: string,
  ): Promise<RegistroAsistencia[]> {
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
    if (!empleado) throw new NotFoundException('Empleado no encontrado.');

    return this.asistenciaRepository.find({
      where: { empleadoId },
      order: { fecha: 'DESC' } // Lo más reciente primero
    });
  }
  // ==========================================
  //        GESTIÓN DE ACTIVOS (INVENTARIO)
  // ==========================================

  async createActivo(empresaId: string, dto: CreateActivoDto): Promise<Activo> {
    // 1. Validar serial duplicado (Solo si envía serial)
    if (dto.serial) {
      const existente = await this.activoRepository.findOneBy({
        empresaId,
        serial: dto.serial,
      });
      if (existente) {
        throw new ConflictException('Ya existe un activo con este serial en tu inventario.');
      }
    }

    // 2. Crear
    const activo = this.activoRepository.create({
      ...dto,
      empresaId,
      estado: dto.estado || EstadoActivo.DISPONIBLE,
    });

    return this.activoRepository.save(activo);
  }

  async getActivos(empresaId: string): Promise<Activo[]> {
    const activos = await this.activoRepository.find({
      where: { empresaId },
      order: { nombre: 'ASC' },
      // 👇 1. Traemos el historial de asignaciones y los datos del empleado
      relations: ['asignaciones', 'asignaciones.empleado'],
    });

    // 👇 2. Procesamos cada activo para "facilitarle la vida" al Frontend
    return activos.map((activo) => {
      // Buscamos si tiene una asignación activa (VIGENTE)
      const asignacionVigente = activo.asignaciones?.find(
        (a) => a.estado === EstadoAsignacion.VIGENTE,
      );

      // Creamos una copia del objeto para agregarle datos extra
      const activoProcesado: any = { ...activo };

      if (asignacionVigente && asignacionVigente.empleado) {
        // 👇 ESTO ES LO QUE NECESITA TU FRONTEND
        activoProcesado.asignadoA = {
          id: asignacionVigente.id, // <--- CRÍTICO: El ID de la asignación
          empleadoId: asignacionVigente.empleado.id,
          nombreEmpleado: `${asignacionVigente.empleado.nombre} ${asignacionVigente.empleado.apellido}`,
        };
      } else {
        activoProcesado.asignadoA = null;
      }

      // Opcional: Borramos la lista gigante de asignaciones para no enviar basura
      delete activoProcesado.asignaciones;

      return activoProcesado;
    });
  }

  async updateActivo(
    empresaId: string,
    activoId: string,
    dto: UpdateActivoDto,
  ): Promise<Activo> {
    const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
    if (!activo) throw new NotFoundException('Activo no encontrado.');

    // Validar serial si lo están cambiando
    if (dto.serial && dto.serial !== activo.serial) {
      const duplicado = await this.activoRepository.findOneBy({ empresaId, serial: dto.serial });
      if (duplicado) throw new ConflictException('El serial ya está en uso por otro activo.');
    }

    this.activoRepository.merge(activo, dto);
    return this.activoRepository.save(activo);
  }

  async deleteActivo(
    empresaId: string,
    activoId: string,
  ): Promise<{ message: string }> {
    const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
    if (!activo) throw new NotFoundException('Activo no encontrado.');

    await this.activoRepository.remove(activo);
    return { message: 'Activo eliminado del inventario.' };
  }
  // ==========================================
  //        GESTIÓN DE ACTIVOS: ASIGNACIONES
  // ==========================================

  /**
   * Asignar un activo a un empleado
   */
  async assignActivo(
    empresaId: string,
    activoId: string,
    dto: AssignActivoDto,
  ): Promise<ActivoAsignado> {
    // 1. Validar Activo y Disponibilidad
    const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
    if (!activo) throw new NotFoundException('Activo no encontrado.');

    if (activo.estado !== EstadoActivo.DISPONIBLE) {
      throw new ConflictException(`El activo no está disponible (Estado: ${activo.estado}).`);
    }

    // 2. Validar Empleado
    const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
    if (!empleado) throw new BadRequestException('Empleado no válido.');

    // 3. Crear Asignación
    const asignacion = this.activoAsignadoRepository.create({
      activoId,
      empleadoId: dto.empleadoId,
      observaciones: dto.observaciones,
      fechaAsignacion: dto.fechaAsignacion || new Date(),
      estado: EstadoAsignacion.VIGENTE,
    });

    // 4. Actualizar estado del Activo a ASIGNADO
    activo.estado = EstadoActivo.ASIGNADO;
    await this.activoRepository.save(activo);

    return this.activoAsignadoRepository.save(asignacion);
  }
  /**
     * Registrar devolución de un activo
     */
  async returnActivo(
    empresaId: string,
    asignacionId: string,
    dto: ReturnActivoDto,
  ): Promise<ActivoAsignado> {
    // 1. Buscar la asignación con la relación del activo
    const asignacion = await this.activoAsignadoRepository.findOne({
      where: { id: asignacionId },
      relations: ['activo'],
    });

    // Validaciones de seguridad
    if (!asignacion || asignacion.activo.empresaId !== empresaId) {
      throw new NotFoundException('Asignación no encontrada o no pertenece a tu empresa.');
    }

    if (asignacion.estado === EstadoAsignacion.DEVUELTO) {
      throw new ConflictException('Este activo ya fue devuelto anteriormente.');
    }

    // 2. Cerrar la Asignación
    asignacion.fechaDevolucion = dto.fechaDevolucion || new Date();
    asignacion.estado = EstadoAsignacion.DEVUELTO;

    // Concatenar observaciones nuevas con las viejas (opcional, o reemplazar)
    if (dto.observaciones) {
      asignacion.observaciones = asignacion.observaciones
        ? `${asignacion.observaciones} | Devolución: ${dto.observaciones}`
        : dto.observaciones;
    }

    // 3. Actualizar estado del Activo (LA PARTE CLAVE)
    // Usamos el estado que viene del Frontend. Si no viene nada, por defecto DISPONIBLE.
    asignacion.activo.estado = dto.estado || EstadoActivo.DISPONIBLE;

    // Guardamos ambos cambios
    await this.activoRepository.save(asignacion.activo);
    return this.activoAsignadoRepository.save(asignacion);
  }

  /**
   * Ver activos que tiene un empleado actualmente
   */
  async getActivosByEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<ActivoAsignado[]> {
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
    if (!empleado) throw new NotFoundException('Empleado no encontrado.');

    return this.activoAsignadoRepository.find({
      where: {
        empleadoId,
        estado: EstadoAsignacion.VIGENTE // Solo los que tiene ahora
      },
      relations: ['activo'],
    });
  }

  /**
   * Ver historial de un activo
   */
  async getHistorialActivo(
    empresaId: string,
    activoId: string
  ): Promise<ActivoAsignado[]> {
    const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
    if (!activo) throw new NotFoundException('Activo no encontrado');

    return this.activoAsignadoRepository.find({
      where: { activoId },
      relations: ['empleado'],
      order: { fechaAsignacion: 'DESC' }
    });
  }
  // ==========================================
  //        GESTIÓN DE GASTOS (VIÁTICOS)
  // ==========================================

  /**
   * 1. Crear Cabecera de Reporte
   */
  async createReporte(empresaId: string, empleadoId: string, dto: CreateReporteDto): Promise<ReporteGasto> {
    // Validar empleado (que sea de la empresa)
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
    if (!empleado) throw new BadRequestException('Empleado no válido.');

    const reporte = this.reporteRepository.create({
      ...dto,
      empleadoId,
      estado: EstadoReporte.BORRADOR,
      total: 0,
    });
    return this.reporteRepository.save(reporte);
  }

  /**
   * 2. Agregar Ítem (Factura) al Reporte
   * Lógica: Guarda el ítem y actualiza el total del reporte.
   */
  async addItemToReporte(
    empresaId: string,
    reporteId: string,
    dto: CreateItemGastoDto,
  ): Promise<ItemGasto> {
    // Verificar reporte y permisos
    const reporte = await this.reporteRepository.findOne({
      where: { id: reporteId },
      relations: ['empleado'] // Para verificar empresa del empleado dueño del reporte
    });

    if (!reporte || reporte.empleado.empresaId !== empresaId) {
      throw new NotFoundException('Reporte no encontrado o sin acceso.');
    }

    if (reporte.estado !== EstadoReporte.BORRADOR && reporte.estado !== EstadoReporte.RECHAZADO) {
      throw new ConflictException('No puedes agregar items a un reporte que ya fue enviado o aprobado.');
    }

    // Crear el ítem
    const item = this.itemGastoRepository.create({
      ...dto,
      reporteId,
    });
    await this.itemGastoRepository.save(item);

    // Actualizar el Total del Reporte (Suma)
    // Opción A: Sumar en memoria (rápido si tienes el total actual).
    // Opción B: Recalcular desde cero (más seguro). Usaremos la B.
    const suma = await this.itemGastoRepository.sum('monto', { reporteId });
    reporte.total = suma || 0;
    await this.reporteRepository.save(reporte);

    return item;
  }

  /**
   * 3. Eliminar Ítem
   */
  async removeItemFromReporte(
    empresaId: string,
    itemId: string,
  ): Promise<{ message: string }> {
    const item = await this.itemGastoRepository.findOne({
      where: { id: itemId },
      relations: ['reporte', 'reporte.empleado'],
    });

    if (!item || item.reporte.empleado.empresaId !== empresaId) {
      throw new NotFoundException('Ítem no encontrado.');
    }

    if (item.reporte.estado !== EstadoReporte.BORRADOR) {
      throw new ConflictException('Reporte bloqueado. No se pueden borrar items.');
    }

    const reporteId = item.reporteId;
    await this.itemGastoRepository.remove(item);

    // Recalcular Total
    const suma = await this.itemGastoRepository.sum('monto', { reporteId });
    await this.reporteRepository.update(reporteId, { total: suma || 0 });

    return { message: 'Ítem eliminado y total actualizado.' };
  }

  /**
   * 4. Obtener Reportes de un Empleado (o todos si es Admin)
   */
  async getReportes(empresaId: string, empleadoId?: string): Promise<ReporteGasto[]> {
    const where: any = { empleado: { empresaId } };
    if (empleadoId) where.empleadoId = empleadoId;

    return this.reporteRepository.find({
      where,
      relations: ['items', 'empleado'],
      order: { fechaReporte: 'DESC' },
    });
  }

  /**
   * 5. Aprobar/Rechazar Reporte (Admin)
   */
  async updateEstadoReporte(
    empresaId: string,
    reporteId: string,
    dto: UpdateReporteEstadoDto,
  ): Promise<ReporteGasto> {
    const reporte = await this.reporteRepository.findOne({
      where: { id: reporteId },
      relations: ['empleado'],
    });

    if (!reporte || reporte.empleado.empresaId !== empresaId) {
      throw new NotFoundException('Reporte no encontrado.');
    }

    // Aquí podrías añadir lógica: Si pasa a PAGADO, generar asiento contable, etc.

    reporte.estado = dto.estado;
    // No tenemos campo comentarios en tu entidad actual, 
    // pero si lo agregaras, iría aquí: reporte.comentarios = dto.comentarios;

    return this.reporteRepository.save(reporte);
  }
  // ==========================================
  //        ANALÍTICAS Y DASHBOARD (KPIs)
  // ==========================================

  async getDashboardKPIs(empresaId: string): Promise<DashboardKpiDto> {
    // 1. Total Empleados (Headcount)
    const totalEmpleados = await this.empleadoRepository.count({
      where: { empresaId, estado: 'Activo' } // Asumiendo que 'estado' es string 'Activo'
    });

    // 2. Proyectos Activos
    const totalProyectosActivos = await this.proyectoRepository.count({
      where: {
        empresaId,
        estado: EstadoProyecto.ACTIVO // O usa el Enum EstadoProyecto.ACTIVO si lo tienes importado
      }
    });

    // 3. Total Gastos Aprobados (Suma de dinero)
    const gastos = await this.reporteRepository
      .createQueryBuilder('reporte')
      .leftJoin('reporte.empleado', 'empleado')
      .where('empleado.empresaId = :empresaId', { empresaId })
      .andWhere('reporte.estado = :estado', { estado: EstadoReporte.APROBADO })
      .select('SUM(reporte.total)', 'sum')
      .getRawOne();

    const totalGastosAprobados = parseFloat(gastos.sum || '0');

    // 4. Asistencia de HOY (% de asistencia)
    const hoy = new Date();
    const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
    const finDia = new Date(hoy.setHours(23, 59, 59, 999));

    const asistenciasHoy = await this.asistenciaRepository.count({
      where: {
        empleado: { empresaId }, // Join implícito
        fecha: Between(inicioDia, finDia)
      }
    });

    const tasaAsistenciaHoy = totalEmpleados > 0
      ? Math.round((asistenciasHoy / totalEmpleados) * 100)
      : 0;

    // 5. Talento (9-Box Resumen)
    // Contamos cuántos "Estrellas" (Alto Desempeño + Alto Potencial)
    // Asumimos escala 1-9. Alto es >= 7.
    const estrellas = await this.evaluacionRepository.count({
      where: {
        evaluado: { empresaId },
        calificacionDesempeno: MoreThanOrEqual(7),
        calificacionPotencial: MoreThanOrEqual(7)
      }
    });

    const enRiesgo = await this.evaluacionRepository.count({
      where: {
        evaluado: { empresaId },
        calificacionDesempeno: LessThanOrEqual(3),
        calificacionPotencial: LessThanOrEqual(3)
      }
    });

    return {
      totalEmpleados,
      totalProyectosActivos,
      totalGastosAprobados,
      tasaAsistenciaHoy,
      distribucion9Box: {
        altoDesempenoAltoPotencial: estrellas,
        bajoDesempenoBajoPotencial: enRiesgo,
        bajoDesempenoAltoPotencial: 0,
        altoDesempenoBajoPotencial: 0,
        bajoDesempenoMedioPotencial: 0,
        altoDesempenoMedioPotencial: 0,
        medioDesempenoBajoPotencial: 0,
        medioDesempenoMedioPotencial: 0,
      }
    };
  }
  async getCicloActivo(empresaId: string) {
    return this.cicloRepository.findOne({
      where: {
        empresaId,
        estado: EstadoCiclo.ACTIVO
      }
    });
  }
  /**
   * Calcular resumen de asistencia del mes actual
   */
  async getAsistenciaSummary(empresaId: string, empleadoId: string) {
    // 1. Definir rango de fechas (Desde el 1ro del mes hasta HOY)
    const hoy = new Date();
    // Ajustamos 'hoy' al final del día para incluirlo en el conteo si ya pasó
    const finDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    // 2. Obtener registros de asistencia de este mes
    const registros = await this.asistenciaRepository.find({
      where: {
        empleadoId,
        fecha: MoreThanOrEqual(inicioMes),
      },
    });

    const diasTrabajados = registros.length;

    // 3. Calcular Días Hábiles Transcurridos (Lunes a Viernes)
    let diasHabiles = 0;
    const cursor = new Date(inicioMes); // Clonamos fecha inicio para iterar

    // Iteramos día a día hasta llegar a hoy
    while (cursor <= hoy) {
      const diaSemana = cursor.getDay(); // 0 = Domingo, 6 = Sábado

      // Si no es Sábado (6) ni Domingo (0), es día hábil
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasHabiles++;
      }

      // Avanzamos un día
      cursor.setDate(cursor.getDate() + 1);
    }

    // 4. Calcular Porcentaje
    // Evitamos división por cero (si es el 1ro del mes y es domingo)
    let porcentaje = 0;
    if (diasHabiles > 0) {
      porcentaje = Math.round((diasTrabajados / diasHabiles) * 100);
    }

    // Lógica visual: Si trabajó extra (fines de semana), no mostramos más de 100%
    if (porcentaje > 100) porcentaje = 100;

    return {
      asistenciaPercentage: porcentaje,
      diasTrabajados: diasTrabajados,
      diasHabilesEsperados: diasHabiles
    };
  }
  async seedData(empresaIdParam: string) {
    console.log('🌱 Iniciando Seed de Productividad...');
    const empresaId = empresaIdParam || 'd845d7a9-9dcf-4db3-95f3-131b93e40673';

    try {
      // 🧹 LIMPIEZA: Eliminar datos existentes del seed
      console.log('🧹 Limpiando datos anteriores del seed...');

      const nombresProyectosSeed = ['App Móvil v2', 'Rediseño Web Corporativa', 'Migración a Nube'];

      // Buscar los proyectos existentes primero
      const proyectosExistentes = await this.proyectoRepository.find({
        where: {
          nombre: In(nombresProyectosSeed),
          empresaId
        }
      });

      // Si hay proyectos, eliminar sus tareas y sprints
      if (proyectosExistentes.length > 0) {
        const proyectoIds = proyectosExistentes.map(p => p.id);

        // Eliminar tareas
        await this.tareaRepository.delete({
          proyectoId: In(proyectoIds)
        });

        // Eliminar sprints
        await this.sprintRepository.delete({
          proyectoId: In(proyectoIds)
        });

        // Eliminar proyectos
        await this.proyectoRepository.delete({
          id: In(proyectoIds)
        });
      }

      console.log('✅ Datos anteriores eliminados');

      // 1. Crear Proyectos
      console.log('📁 Creando proyectos...');
      const proyectosData = [
        { nombre: 'App Móvil v2', descripcion: 'Desarrollo de nueva versión mobile' },
        { nombre: 'Rediseño Web Corporativa', descripcion: 'Actualización del sitio web principal' },
        { nombre: 'Migración a Nube', descripcion: 'Migración de infraestructura a AWS' }
      ];

      const proyectos: Proyecto[] = [];

      for (const { nombre, descripcion } of proyectosData) {
        const p = this.proyectoRepository.create({
          nombre,
          descripcion,
          empresaId,
          estado: 'Activo'
        });
        const saved = await this.proyectoRepository.save(p);
        proyectos.push(saved);
      }
      console.log(`✅ ${proyectos.length} proyectos creados`);

      // 2. Crear Sprints y Tareas para el primer proyecto
      const proyectoPrincipal = proyectos[0];
      console.log(`🏃 Creando sprints para: ${proyectoPrincipal.nombre}`);

      // Sprint 1 (Pasado/Completado)
      const fechaInicioSprint1 = new Date();
      fechaInicioSprint1.setDate(fechaInicioSprint1.getDate() - 28);

      const fechaFinSprint1 = new Date();
      fechaFinSprint1.setDate(fechaFinSprint1.getDate() - 14);

      const sprint1 = await this.sprintRepository.save(
        this.sprintRepository.create({
          nombre: 'Sprint 1: Fundamentos',
          fechaInicio: fechaInicioSprint1,
          fechaFin: fechaFinSprint1,
          proyectoId: proyectoPrincipal.id
        })
      );
      console.log('✅ Sprint 1 creado (Completado)');

      // Tareas Sprint 1
      const tareasSprint1 = this.tareaRepository.create([
        {
          titulo: 'Configurar Repositorio Git',
          descripcion: 'Inicializar repo y configurar ramas',
          estado: EstadoTarea.COMPLETADA,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint1.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 3
        },
        {
          titulo: 'Diseñar Esquema DB',
          descripcion: 'Crear diagrama ER y tablas principales',
          estado: EstadoTarea.COMPLETADA,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint1.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 5
        },
        {
          titulo: 'Setup CI/CD',
          descripcion: 'Configurar pipeline de despliegue',
          estado: EstadoTarea.COMPLETADA,
          prioridad: PrioridadTarea.MEDIA,
          sprintId: sprint1.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 3
        }
      ]);
      await this.tareaRepository.save(tareasSprint1);
      console.log('✅ 3 tareas creadas para Sprint 1');

      // Sprint 2 (Actual/Activo)
      const fechaInicioSprint2 = new Date();
      fechaInicioSprint2.setDate(fechaInicioSprint2.getDate() - 7);

      const fechaFinSprint2 = new Date();
      fechaFinSprint2.setDate(fechaFinSprint2.getDate() + 7);

      const sprint2 = await this.sprintRepository.save(
        this.sprintRepository.create({
          nombre: 'Sprint 2: Autenticación',
          fechaInicio: fechaInicioSprint2,
          fechaFin: fechaFinSprint2,
          proyectoId: proyectoPrincipal.id
        })
      );
      console.log('✅ Sprint 2 creado (En Progreso)');

      // Tareas Sprint 2
      const tareasSprint2 = this.tareaRepository.create([
        {
          titulo: 'API Endpoint Login',
          descripcion: 'Crear endpoint POST /auth/login con validación',
          estado: EstadoTarea.COMPLETADA,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint2.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 8
        },
        {
          titulo: 'Pantalla Login Mobile',
          descripcion: 'Diseñar e implementar UI de login',
          estado: EstadoTarea.EN_PROGRESO,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint2.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 5
        },
        {
          titulo: 'Validación JWT',
          descripcion: 'Implementar middleware de validación de tokens',
          estado: EstadoTarea.EN_PROGRESO,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint2.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 3
        },
        {
          titulo: 'Registro de Usuarios',
          descripcion: 'Crear flujo completo de registro',
          estado: EstadoTarea.PENDIENTE,
          prioridad: PrioridadTarea.MEDIA,
          sprintId: sprint2.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 5
        },
        {
          titulo: 'Reset de Password',
          descripcion: 'Implementar recuperación de contraseña',
          estado: EstadoTarea.PENDIENTE,
          prioridad: PrioridadTarea.BAJA,
          sprintId: sprint2.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 3
        }
      ]);
      await this.tareaRepository.save(tareasSprint2);
      console.log('✅ 5 tareas creadas para Sprint 2');

      // Sprint 3 (Futuro/Planificado)
      const fechaInicioSprint3 = new Date();
      fechaInicioSprint3.setDate(fechaInicioSprint3.getDate() + 8);

      const fechaFinSprint3 = new Date();
      fechaFinSprint3.setDate(fechaFinSprint3.getDate() + 22);

      const sprint3 = await this.sprintRepository.save(
        this.sprintRepository.create({
          nombre: 'Sprint 3: Dashboard Principal',
          fechaInicio: fechaInicioSprint3,
          fechaFin: fechaFinSprint3,
          proyectoId: proyectoPrincipal.id
        })
      );
      console.log('✅ Sprint 3 creado (Planificado)');

      // Tareas Sprint 3
      const tareasSprint3 = this.tareaRepository.create([
        {
          titulo: 'Diseño UI Dashboard',
          descripcion: 'Crear mockups y flujo de navegación',
          estado: EstadoTarea.PENDIENTE,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint3.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 5
        },
        {
          titulo: 'API de Métricas',
          descripcion: 'Endpoint para estadísticas del usuario',
          estado: EstadoTarea.PENDIENTE,
          prioridad: PrioridadTarea.ALTA,
          sprintId: sprint3.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 8
        },
        {
          titulo: 'Gráficos Interactivos',
          descripcion: 'Implementar charts con animaciones',
          estado: EstadoTarea.PENDIENTE,
          prioridad: PrioridadTarea.MEDIA,
          sprintId: sprint3.id,
          proyectoId: proyectoPrincipal.id,
          puntosHistoria: 13
        }
      ]);
      await this.tareaRepository.save(tareasSprint3);
      console.log('✅ 3 tareas creadas para Sprint 3');

      console.log('🎉 Seed de Productividad completado exitosamente!');

      return {
        message: 'Datos de productividad inyectados exitosamente',
        resumen: {
          proyectos: proyectos.length,
          sprints: 3,
          tareas: 11,
          proyectoPrincipal: {
            id: proyectoPrincipal.id,
            nombre: proyectoPrincipal.nombre
          }
        }
      };

    } catch (error) {
      console.error('❌ Error en seed de productividad:', error);
      throw error;
    }
  }

  async getMisCursos(empresaId: string, empleadoId: string) {
    // Buscamos en la tabla de Inscripciones
    const inscripciones = await this.inscripcionRepository.find({
      where: {
        empleadoId: empleadoId
        // Si tu tabla inscripciones tiene empresaId, agrégalo también: empresaId
      },
      relations: ['curso'], // 👈 CRÍTICO: Esto trae los datos del curso (título, imagen)
      order: {
        fechaInscripcion: 'DESC' // Los más recientes primero
      }
    });

    // Opcional: Si quieres limpiar la respuesta para que se vea más plana
    // o puedes devolver la inscripción tal cual y mapearla en el frontend.
    return inscripciones;
  }
}