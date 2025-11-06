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
   * Estado actual de la tarea (Pendiente, En Progreso, Hecho)
   * Mapea: string estado "Estado actual tarea"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado actual de la tarea (Pendiente, En Progreso, Hecho)',
  })
  estado: string;

  /**
   * Nivel de prioridad de la tarea
   * Mapea: int prioridad "Nivel prioridad 1-3"
   */
  @Column({
    type: 'int',
    comment: 'Nivel de prioridad (1=Baja, 2=Media, 3=Alta)',
  })
  prioridad: number;

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
   * Mapea: string sprintId FK "Sprint pertenece nullable"
   *
   * @logic onDelete: 'SET NULL' = Lógica de negocio clave.
   * Si un Sprint es borrado, sus Tareas NO se borran, sino que
   * su 'sprintId' se vuelve NULL (regresan al "backlog" del proyecto).
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