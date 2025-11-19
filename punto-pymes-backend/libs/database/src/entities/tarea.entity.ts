// libs/database/src/entities/tarea.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Proyecto } from './proyecto.entity';
import { Sprint } from './sprint.entity';
import { AsignacionTarea } from './asignacionTarea.entity';
import { Timesheet } from './timesheet.entity';

// Importamos los Enums del DTO para asegurar consistencia de tipos
import { EstadoTarea, PrioridadTarea } from 'apps/productividad/src/dto/create-tarea.dto';

/**
 * Entidad que representa una Tarea o item de trabajo individual.
 * (Ej: 'Diseñar el login', 'Corregir bug #123').
 * Pertenece a un Proyecto y opcionalmente a un Sprint.
 * Mapea la tabla 'tareas'
 */
@Entity({ name: 'tareas' })
// Indexamos las FKs para búsquedas rápidas de tareas
@Index(['proyectoId'])
@Index(['sprintId'])
export class Tarea extends BaseEntity {
  /**
   * Título de la tarea
   * Mapea: string titulo "Titulo tarea"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Título de la tarea',
  })
  titulo: string;

  /**
   * Descripción detallada de la tarea
   * Mapea: string descripcion "Descripcion detallada tarea"
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción detallada de la tarea',
  })
  descripcion: string;

  /**
   * Puntos de historia (Estimación de esfuerzo)
   * Útil para metodologías ágiles.
   */
  @Column({
    type: 'int',
    nullable: true,
    default: 0,
    comment: 'Puntos de historia (Estimación)',
  })
  puntosHistoria: number;

  /**
   * Estado actual de la tarea
   * Usa el Enum: PENDIENTE, EN_PROGRESO, COMPLETADA
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoTarea.PENDIENTE,
    comment: 'Estado actual de la tarea',
  })
  estado: EstadoTarea;

  /**
   * Nivel de prioridad de la tarea
   * Usa el Enum: BAJA, MEDIA, ALTA
   * IMPORTANTE: Tipo 'varchar' porque el Enum tiene valores de texto.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: PrioridadTarea.MEDIA,
    comment: 'Nivel de prioridad (BAJA, MEDIA, ALTA)',
  })
  prioridad: PrioridadTarea;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Tarea PERTENECE A...)
  // ---

  /**
   * Relación: Una Tarea pertenece a UN Proyecto.
   * onDelete: 'CASCADE' = Si el Proyecto se borra, sus tareas se borran.
   */
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyectoId' }) // Define el nombre de la columna FK
  proyecto: Proyecto;

  /**
   * Mapea: string proyectoId FK "Proyecto padre tarea"
   */
  @Column({ comment: 'ID del Proyecto padre' })
  proyectoId: string;

  /**
   * Relación: Una Tarea PUEDE pertenecer a UN Sprint (opcional).
   * onDelete: 'SET NULL' = Si se borra el Sprint, la tarea vuelve al Backlog (sprintId = null)
   */
  @ManyToOne(() => Sprint, (sprint) => sprint.tareas, {
    nullable: true, // Una tarea puede estar en el backlog, sin sprint
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sprintId' }) // Define el nombre de la columna FK
  sprint: Sprint;

  /**
   * Mapea: string sprintId FK "Sprint pertenece nullable"
   */
  @Column({
    nullable: true,
    comment: 'ID del Sprint al que pertenece (opcional)',
  })
  sprintId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Una Tarea TIENE MUCHAS...)
  // ---

  /**
   * Relación: Una Tarea puede tener muchas Asignaciones (empleados asignados).
   * 'cascade: true' = Si se borra la Tarea, sus asignaciones se borran.
   */
  @OneToMany(
    () => AsignacionTarea,
    (asignacion) => asignacion.tarea,
    { cascade: true },
  )
  asignaciones: AsignacionTarea[];

  /**
   * Relación: En una Tarea se pueden registrar muchas entradas de horas (Timesheets).
   * 'cascade: true' = Si se borra la Tarea, sus registros de horas se borran.
   */
  @OneToMany(() => Timesheet, (timesheet) => timesheet.tarea, { cascade: true })
  timesheets: Timesheet[];
}