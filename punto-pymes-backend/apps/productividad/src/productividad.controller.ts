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
  // --- CICLOS DE EVALUACIÓN ---

  @MessagePattern({ cmd: 'create_ciclo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createCiclo(@Payload() data: { empresaId: string; dto: CreateCicloDto }) {
    return this.productividadService.createCiclo(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'get_ciclos' })
  getCiclos(@Payload() data: { empresaId: string }) {
    return this.productividadService.getCiclos(data.empresaId);
  }

  @MessagePattern({ cmd: 'update_ciclo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCiclo(@Payload() data: { empresaId: string; cicloId: string; dto: UpdateCicloDto }) {
    return this.productividadService.updateCiclo(data.empresaId, data.cicloId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_ciclo' })
  deleteCiclo(@Payload() data: { empresaId: string; cicloId: string }) {
    return this.productividadService.deleteCiclo(data.empresaId, data.cicloId);
  }
  // --- OBJETIVOS ---

  @MessagePattern({ cmd: 'create_objetivo' })
  @UsePipes(new ValidationPipe())
  createObjetivo(@Payload() data: { empresaId: string; cicloId: string; dto: CreateObjetivoDto }) {
    return this.productividadService.createObjetivo(data.empresaId, data.cicloId, data.dto);
  }

  @MessagePattern({ cmd: 'get_objetivos' })
  getObjetivos(@Payload() data: { empresaId: string; cicloId: string; empleadoId?: string }) {
    return this.productividadService.getObjetivos(data.empresaId, data.cicloId, data.empleadoId);
  }

  @MessagePattern({ cmd: 'update_objetivo' })
  @UsePipes(new ValidationPipe())
  updateObjetivo(@Payload() data: { empresaId: string; objetivoId: string; dto: UpdateObjetivoDto }) {
    return this.productividadService.updateObjetivo(data.empresaId, data.objetivoId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_objetivo' })
  deleteObjetivo(@Payload() data: { empresaId: string; objetivoId: string }) {
    return this.productividadService.deleteObjetivo(data.empresaId, data.objetivoId);
  }
  // --- EVALUACIONES ---

  @MessagePattern({ cmd: 'create_evaluacion' })
  @UsePipes(new ValidationPipe())
  createEvaluacion(@Payload() data: { empresaId: string; cicloId: string; dto: CreateEvaluacionDto }) {
    return this.productividadService.createEvaluacion(data.empresaId, data.cicloId, data.dto);
  }

  @MessagePattern({ cmd: 'get_evaluaciones' })
  getEvaluaciones(@Payload() data: { empresaId: string; cicloId: string }) {
    return this.productividadService.getEvaluaciones(data.empresaId, data.cicloId);
  }

  @MessagePattern({ cmd: 'update_evaluacion' })
  @UsePipes(new ValidationPipe())
  updateEvaluacion(@Payload() data: { empresaId: string; evaluacionId: string; dto: UpdateEvaluacionDto }) {
    return this.productividadService.updateEvaluacion(data.empresaId, data.evaluacionId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_evaluacion' })
  deleteEvaluacion(@Payload() data: { empresaId: string; evaluacionId: string }) {
    return this.productividadService.deleteEvaluacion(data.empresaId, data.evaluacionId);
  }
  // --- LMS: CURSOS ---

  @MessagePattern({ cmd: 'create_curso' })
  @UsePipes(new ValidationPipe())
  createCurso(@Payload() data: { empresaId: string; dto: CreateCursoDto }) {
    return this.productividadService.createCurso(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'get_cursos' })
  getCursos(@Payload() data: { empresaId: string }) {
    return this.productividadService.getCursos(data.empresaId);
  }

  @MessagePattern({ cmd: 'update_curso' })
  @UsePipes(new ValidationPipe())
  updateCurso(@Payload() data: { empresaId: string; cursoId: string; dto: UpdateCursoDto }) {
    return this.productividadService.updateCurso(data.empresaId, data.cursoId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_curso' })
  deleteCurso(@Payload() data: { empresaId: string; cursoId: string }) {
    return this.productividadService.deleteCurso(data.empresaId, data.cursoId);
  }
  // --- LMS: INSCRIPCIONES ---

  @MessagePattern({ cmd: 'create_inscripcion' })
  @UsePipes(new ValidationPipe())
  createInscripcion(@Payload() data: { empresaId: string; cursoId: string; dto: CreateInscripcionDto }) {
    return this.productividadService.createInscripcion(data.empresaId, data.cursoId, data.dto);
  }

  @MessagePattern({ cmd: 'get_inscripciones_curso' })
  getInscripcionesCurso(@Payload() data: { empresaId: string; cursoId: string }) {
    return this.productividadService.getInscripcionesByCurso(data.empresaId, data.cursoId);
  }

  @MessagePattern({ cmd: 'update_inscripcion' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateInscripcion(@Payload() data: { empresaId: string; inscripcionId: string; dto: UpdateInscripcionDto }) {
    return this.productividadService.updateInscripcion(data.empresaId, data.inscripcionId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_inscripcion' })
  deleteInscripcion(@Payload() data: { empresaId: string; inscripcionId: string }) {
    return this.productividadService.deleteInscripcion(data.empresaId, data.inscripcionId);
  }
  @MessagePattern({ cmd: 'check_in' })
  @UsePipes(new ValidationPipe())
  checkIn(@Payload() data: { empresaId: string; dto: CheckInDto }) {
    return this.productividadService.checkIn(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'check_out' })
  @UsePipes(new ValidationPipe())
  checkOut(@Payload() data: { empresaId: string; empleadoId: string; dto: CheckOutDto }) {
    return this.productividadService.checkOut(data.empresaId, data.empleadoId, data.dto);
  }

  @MessagePattern({ cmd: 'get_asistencia' })
  getAsistencia(@Payload() data: { empresaId: string; empleadoId: string }) {
    return this.productividadService.getHistorialAsistencia(data.empresaId, data.empleadoId);
  }
  // --- ACTIVOS ---

  @MessagePattern({ cmd: 'create_activo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createActivo(@Payload() data: { empresaId: string; dto: CreateActivoDto }) {
    return this.productividadService.createActivo(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'get_activos' })
  getActivos(@Payload() data: { empresaId: string }) {
    return this.productividadService.getActivos(data.empresaId);
  }

  @MessagePattern({ cmd: 'update_activo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateActivo(@Payload() data: { empresaId: string; activoId: string; dto: UpdateActivoDto }) {
    return this.productividadService.updateActivo(data.empresaId, data.activoId, data.dto);
  }

  @MessagePattern({ cmd: 'delete_activo' })
  deleteActivo(@Payload() data: { empresaId: string; activoId: string }) {
    return this.productividadService.deleteActivo(data.empresaId, data.activoId);
  }
  // --- ACTIVOS: ASIGNACIONES ---

  @MessagePattern({ cmd: 'assign_activo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  assignActivo(@Payload() data: { empresaId: string; activoId: string; dto: AssignActivoDto }) {
    return this.productividadService.assignActivo(data.empresaId, data.activoId, data.dto);
  }

  @MessagePattern({ cmd: 'return_activo' })
  @UsePipes(new ValidationPipe({ transform: true }))
  returnActivo(@Payload() data: { empresaId: string; asignacionId: string; dto: ReturnActivoDto }) {
    return this.productividadService.returnActivo(data.empresaId, data.asignacionId, data.dto);
  }

  @MessagePattern({ cmd: 'get_activos_empleado' })
  getActivosEmpleado(@Payload() data: { empresaId: string; empleadoId: string }) {
    return this.productividadService.getActivosByEmpleado(data.empresaId, data.empleadoId);
  }

  @MessagePattern({ cmd: 'get_historial_activo' })
  getHistorialActivo(@Payload() data: { empresaId: string; activoId: string }) {
    return this.productividadService.getHistorialActivo(data.empresaId, data.activoId);
  }
  // --- GASTOS ---

  @MessagePattern({ cmd: 'create_reporte' })
  @UsePipes(new ValidationPipe())
  createReporte(@Payload() data: { empresaId: string; empleadoId: string; dto: CreateReporteDto }) {
    return this.productividadService.createReporte(data.empresaId, data.empleadoId, data.dto);
  }

  @MessagePattern({ cmd: 'add_item_gasto' })
  @UsePipes(new ValidationPipe({ transform: true }))
  addItemGasto(@Payload() data: { empresaId: string; reporteId: string; dto: CreateItemGastoDto }) {
    return this.productividadService.addItemToReporte(data.empresaId, data.reporteId, data.dto);
  }

  @MessagePattern({ cmd: 'get_reportes' })
  getReportes(@Payload() data: { empresaId: string; empleadoId?: string }) {
    return this.productividadService.getReportes(data.empresaId, data.empleadoId);
  }

  @MessagePattern({ cmd: 'update_reporte_estado' })
  updateReporteEstado(@Payload() data: { empresaId: string; reporteId: string; dto: UpdateReporteEstadoDto }) {
    return this.productividadService.updateEstadoReporte(data.empresaId, data.reporteId, data.dto);
  }
  @MessagePattern({ cmd: 'get_dashboard_kpis' })
  getDashboardKpis(@Payload() data: { empresaId: string }) {
    return this.productividadService.getDashboardKPIs(data.empresaId);
  }
  @MessagePattern({ cmd: 'get_ciclo_activo' })
  getCicloActivo(@Payload() data: { empresaId: string }) {
    return this.productividadService.getCicloActivo(data.empresaId);
  }
  @MessagePattern({ cmd: 'get_asistencia_summary' })
  getAsistenciaSummary(@Payload() data: { empresaId: string, empleadoId: string }) {
    return this.productividadService.getAsistenciaSummary(data.empresaId, data.empleadoId);
  }
}