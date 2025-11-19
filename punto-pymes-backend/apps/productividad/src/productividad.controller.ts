// apps/productividad/src/productividad.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductividadService } from './productividad.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Controller()
export class ProductividadController {
  constructor(
    private readonly productividadService: ProductividadService,
  ) { }

  // --- INICIO DE CRUD PARA PROYECTO (Semana 9) ---

  @MessagePattern({ cmd: 'get_proyectos' })
  getProyectos(@Payload() data: { empresaId: string }) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido get_proyectos para empresa: ${data.empresaId}`,
    );
    return this.productividadService.getProyectos(data.empresaId);
  }

  @MessagePattern({ cmd: 'create_proyecto' })
  @UsePipes(new ValidationPipe())
  createProyecto(
    @Payload() data: { empresaId: string; dto: CreateProyectoDto },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido create_proyecto: ${data.dto.nombre}`,
    );
    return this.productividadService.createProyecto(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'update_proyecto' })
  @UsePipes(new ValidationPipe())
  updateProyecto(
    @Payload()
    data: {
      empresaId: string;
      proyectoId: string;
      dto: UpdateProyectoDto;
    },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido update_proyecto para: ${data.proyectoId}`,
    );
    return this.productividadService.updateProyecto(
      data.empresaId,
      data.proyectoId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_proyecto' })
  deleteProyecto(
    @Payload()
    data: {
      empresaId: string;
      proyectoId: string;
    },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido delete_proyecto para: ${data.proyectoId}`,
    );
    return this.productividadService.deleteProyecto(
      data.empresaId,
      data.proyectoId,
    );
  }
  // --- CRUD DE SPRINTS ---

  @MessagePattern({ cmd: 'create_sprint' })
  @UsePipes(new ValidationPipe({ transform: true })) // Vital para transformar fechas
  createSprint(
    @Payload() data: { empresaId: string; proyectoId: string; dto: CreateSprintDto },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido create_sprint en proyecto: ${data.proyectoId}`,
    );
    return this.productividadService.createSprint(
      data.empresaId,
      data.proyectoId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'get_sprints_by_proyecto' })
  getSprintsByProyecto(
    @Payload() data: { empresaId: string; proyectoId: string },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido get_sprints para proyecto: ${data.proyectoId}`,
    );
    return this.productividadService.getSprintsByProyecto(
      data.empresaId,
      data.proyectoId,
    );
  }

  @MessagePattern({ cmd: 'update_sprint' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateSprint(
    @Payload()
    data: {
      empresaId: string;
      sprintId: string;
      dto: UpdateSprintDto;
    },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido update_sprint para sprint: ${data.sprintId}`,
    );
    return this.productividadService.updateSprint(
      data.empresaId,
      data.sprintId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_sprint' })
  deleteSprint(
    @Payload()
    data: {
      empresaId: string;
      sprintId: string;
    },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido delete_sprint para sprint: ${data.sprintId}`,
    );
    return this.productividadService.deleteSprint(
      data.empresaId,
      data.sprintId,
    );
  }
  // --- CRUD TAREAS ---

  @MessagePattern({ cmd: 'create_tarea' })
  @UsePipes(new ValidationPipe())
  createTarea(
    @Payload() data: { empresaId: string; sprintId: string; dto: CreateTareaDto },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido create_tarea en sprint: ${data.sprintId}`,
    );
    return this.productividadService.createTarea(
      data.empresaId,
      data.sprintId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'get_tareas_by_sprint' })
  getTareasBySprint(
    @Payload() data: { empresaId: string; sprintId: string },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido get_tareas para sprint: ${data.sprintId}`,
    );
    return this.productividadService.getTareasBySprint(
      data.empresaId,
      data.sprintId,
    );
  }

  @MessagePattern({ cmd: 'update_tarea' })
  @UsePipes(new ValidationPipe())
  updateTarea(
    @Payload() data: { empresaId: string; tareaId: string; dto: UpdateTareaDto },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido update_tarea para: ${data.tareaId}`,
    );
    return this.productividadService.updateTarea(
      data.empresaId,
      data.tareaId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_tarea' })
  deleteTarea(
    @Payload() data: { empresaId: string; tareaId: string },
  ) {
    console.log(
      `Microservicio PRODUCTIVIDAD: Recibido delete_tarea para: ${data.tareaId}`,
    );
    return this.productividadService.deleteTarea(data.empresaId, data.tareaId);
  }
  // --- ASIGNACIONES ---

  @MessagePattern({ cmd: 'assign_tarea' })
  @UsePipes(new ValidationPipe())
  assignTarea(
    @Payload() data: { empresaId: string; tareaId: string; dto: CreateAsignacionDto },
  ) {
    console.log(`Microservicio PRODUCTIVIDAD: Asignando tarea ${data.tareaId} al empleado ${data.dto.empleadoId}`);
    return this.productividadService.assignTarea(data.empresaId, data.tareaId, data.dto);
  }

  @MessagePattern({ cmd: 'get_asignaciones' })
  getAsignaciones(
    @Payload() data: { empresaId: string; tareaId: string },
  ) {
    return this.productividadService.getAsignacionesByTarea(data.empresaId, data.tareaId);
  }

  @MessagePattern({ cmd: 'remove_asignacion' })
  removeAsignacion(
    @Payload() data: { empresaId: string; asignacionId: string },
  ) {
    return this.productividadService.removeAsignacion(data.empresaId, data.asignacionId);
  }
  @MessagePattern({ cmd: 'update_asignacion' })
  @UsePipes(new ValidationPipe())
  updateAsignacion(
    @Payload() data: { empresaId: string; asignacionId: string; dto: UpdateAsignacionDto },
  ) {
    console.log(`Microservicio PRODUCTIVIDAD: Actualizando asignación ${data.asignacionId}`);
    return this.productividadService.updateAsignacion(
      data.empresaId,
      data.asignacionId,
      data.dto,
    );
  }
}