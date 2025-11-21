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

export enum EstadoAsignacion {
  VIGENTE = 'VIGENTE',   // El empleado tiene el activo actualmente
  DEVUELTO = 'DEVUELTO', // Ya lo regresó (registro histórico)
}

@Entity({ name: 'activos_asignados' })
@Index(['activoId'])
@Index(['empleadoId'])
export class ActivoAsignado extends BaseEntity {

  /**
   * Fecha de entrega.
   * Default: La fecha actual al momento de crear el registro.
   */
  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
    comment: 'Fecha de entrega del activo al empleado',
  })
  fechaAsignacion: Date;

  /**
   * Fecha de devolución (null mientras esté VIGENTE).
   */
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de devolución del activo',
  })
  fechaDevolucion: Date;

  /**
   * Estado de la asignación (VIGENTE vs DEVUELTO).
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoAsignacion.VIGENTE,
    comment: 'Estado de la asignación (VIGENTE, DEVUELTO)',
  })
  estado: EstadoAsignacion;

  /**
   * Notas sobre el estado físico o accesorios (Ej: "Incluye cargador").
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Observaciones de entrega o devolución',
  })
  observaciones: string;

  // --- RELACIONES ---

  @ManyToOne(() => Activo, (activo) => activo.asignaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'activoId' })
  activo: Activo;

  @Column({ comment: 'ID del Activo asignado' })
  activoId: string;

  @ManyToOne(() => Empleado, (empleado) => empleado.activosAsignados, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column({ comment: 'ID del Empleado que recibe el activo' })
  empleadoId: string;
}