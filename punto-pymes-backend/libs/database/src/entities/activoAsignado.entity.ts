// libs/database/src/entities/activoAsignado.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Activo } from './activo.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa la asignación de un Activo a un Empleado.
 * Es la tabla que vincula el "qué" (Activo) con el "quién" (Empleado)
 * y registra el historial de la asignación (RF-36-01).
 * Mapea la tabla 'activos_asignados'
 */
@Entity({ name: 'activos_asignados' })
// Indexamos ambas FKs para búsquedas rápidas
@Index(['activoId'])
@Index(['empleadoId'])
export class ActivoAsignado extends BaseEntity {
  /**
   * Fecha de entrega del activo al empleado
   * Mapea: date fechaAsignacion "Fecha entrega activo"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de entrega del activo al empleado',
  })
  fechaAsignacion: Date;

  /**
   * Fecha de devolución del activo (opcional)
   * Mapea: date fechaDevolucion "Fecha devolucion nullable"
   */
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de devolución del activo (si aplica)',
  })
  fechaDevolucion: Date;

  /**
   * Estado de la asignación
   * Mapea: string estado "Estado asignacion activo"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado de la asignación (Activo, Devuelto)',
  })
  estado: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Asignación PERTENECE A...)
  // ---

  /**
   * Relación: La asignación se refiere a UN Activo del inventario.
   * onDelete: 'CASCADE' = Si el Activo es borrado del inventario,
   * su historial de asignaciones también se borra.
   */
  @ManyToOne(() => Activo, (activo) => activo.asignaciones, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'activoId' }) // Define el nombre de la columna FK
  activo: Activo;

  /**
   * Mapea: string activoId FK "Activo asignado empleado"
   */
  @Column({ comment: 'ID del Activo asignado' })
  activoId: string;

  /**
   * Relación: La asignación pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, su historial
   * de activos asignados también se borra.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.activosAsignados, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado recibe activo"
   */
  @Column({ comment: 'ID del Empleado que recibe el activo' })
  empleadoId: string;
}