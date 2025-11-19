// apps/productividad/src/productividad.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto, Sprint, Empleado, Tarea, AsignacionTarea } from 'default/database';
import { Repository, Not } from 'typeorm';
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
   */
  async getTareasBySprint(
    empresaId: string,
    sprintId: string,
  ): Promise<Tarea[]> {
    // Validar acceso (reutilizamos lógica o validamos sprint)
    const sprint = await this.sprintRepository.findOne({
      where: { id: sprintId },
      relations: ['proyecto'],
    });

    if (!sprint || sprint.proyecto.empresaId !== empresaId) {
      throw new NotFoundException('Sprint no encontrado.');
    }

    return this.tareaRepository.find({
      where: { sprintId: sprintId },
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
}