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
   * Fecha en que se realizó la asignación.
   * Tipo: 'timestamp' para guardar fecha y hora.
   * Default: Se llena sola con la hora actual si no se envía.
   */
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de asignación',
  })
  fechaAsignacion: Date;

  /**
   * Observaciones o instrucciones específicas (Ej: "Solo backend").
   * CORRECCIÓN: Faltaba esta columna y causaba error en el servicio.
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Observaciones o instrucciones para la asignación',
  })
  observaciones: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Asignación PERTENECE A...)
  // ---

  /**
   * Relación: La asignación pertenece a UNA Tarea.
   * onDelete: 'CASCADE' = Si la Tarea se borra, sus asignaciones se borran.
   */
  @ManyToOne(() => Tarea, (tarea) => tarea.asignaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tareaId' })
  tarea: Tarea;

  /**
   * ID de la Tarea (FK explícita)
   */
  @Column({ comment: 'ID de la Tarea asignada' })
  tareaId: string;

  /**
   * Relación: La asignación pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus asignaciones se borran.
   * NOTA: Asegúrate que en tu entidad Empleado tengas la propiedad 'asignaciones' o 'tareasAsignadas'.
   * Aquí asumo que se llama 'asignaciones' para mantener consistencia.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.asignaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  /**
   * ID del Empleado (FK explícita)
   */
  @Column({ comment: 'ID del Empleado responsable' })
  empleadoId: string;
}