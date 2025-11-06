// libs/database/src/entities/asignacionTarea.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tarea } from './tarea.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa la asignación de un Empleado a una Tarea.
 * Es la tabla que vincula el "qué" (Tarea) con el "quién" (Empleado).
 * Mapea la tabla 'asignaciones_tareas'
 */
@Entity({ name: 'asignaciones_tareas' })
// Indexamos ambas FKs para búsquedas rápidas
@Index(['tareaId'])
@Index(['empleadoId'])
// Un empleado solo puede ser asignado UNA vez a la misma tarea.
@Unique(['tareaId', 'empleadoId'])
export class AsignacionTarea extends BaseEntity {
  /**
   * Fecha de asignación de la tarea al empleado
   * Mapea: date fechaAsignacion "Fecha asignacion tarea"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de asignación de la tarea al empleado',
  })
  fechaAsignacion: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Asignación PERTENECE A...)
  // ---

  /**
   * Relación: La asignación pertenece a UNA Tarea.
   * onDelete: 'CASCADE' = Si la Tarea se borra, sus asignaciones
   * (que no tienen sentido sin ella) también se borran.
   */
  @ManyToOne(() => Tarea, (tarea) => tarea.asignaciones, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tareaId' }) // Define el nombre de la columna FK
  tarea: Tarea;

  /**
   * Mapea: string tareaId FK "Tarea asignada"
   */
  @Column({ comment: 'ID de la Tarea asignada' })
  tareaId: string;

  /**
   * Relación: La asignación pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus asignaciones
   * de tareas también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.tareasAsignadas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado responsable"
   */
  @Column({ comment: 'ID del Empleado responsable' })
  empleadoId: string;
}