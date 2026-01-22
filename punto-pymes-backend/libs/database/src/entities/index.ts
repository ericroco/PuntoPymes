// libs/database/src/entities/index.ts

// Núcleo SaaS y Auth
export * from './base.entity';
export * from './empresa.entity';
export * from './usuario.entity';

// Personal y Estructura
export * from './empleado.entity';
export * from './rol.entity';
export * from './departamento.entity';
export * from './cargo.entity';
export * from './contrato.entity';

// Nómina y Compensación
export * from './periodoNomina.entity';
export * from './nominaEmpleado.entity';
export * from './rubroNomina.entity';
export * from './beneficio.entity';
export * from './beneficioAsignado.entity';

// Productividad y Tareas
export * from './proyecto.entity';
export * from './sprint.entity';
export * from './tarea.entity';
export * from './asignacionTarea.entity';
export * from './timesheet.entity';

// Desempeño y Capacitación
export * from './cicloEvaluacion.entity';
export * from './objetivo.entity';
export * from './evaluacion.entity';
export * from './curso.entity';
export * from './inscripcionCurso.entity';

// Control, Activos y Gastos
export * from './registroAsistencia.entity';
export * from './activo.entity';
export * from './activoAsignado.entity';
export * from './reporteGasto.entity';
export * from './itemGasto.entity';
export * from './conceptoNomina.entity';
export * from './candidato.entity';
export * from './vacante.entity';
export * from './documentoEmpleado.entity';
export * from './solicitudVacaciones.entity';
export * from './sucursal.entity';
export * from './novedadNomina.entity';
export * from './plantilla-onboarding.entity';
export * from './tarea-plantilla.entity';
export * from './tarea-empleado.entity';
export * from './documento-empresa.entity';
export * from './anuncio.entity';
export * from './encuesta.entity';
export * from './voto.entity';
export * from './saldo-vacaciones.entity';
export * from './documento-embedding.entity';
