import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { Beneficio } from './beneficio.entity';

/**
 * Entidad que representa la asignación de un Beneficio a un Empleado.
 * Vincula el "qué" (Beneficio) con el "quién" (Empleado).
 */
@Entity({ name: 'beneficios_asignados' })
@Index(['empleadoId'])
@Index(['beneficioId'])
// Un empleado solo puede tener un beneficio específico asignado una vez.
@Unique(['empleadoId', 'beneficioId'])
export class BeneficioAsignado extends BaseEntity {

  /**
   * Fecha de asignación del beneficio al empleado
   */
  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE', // Opcional: pone la fecha de hoy por defecto
    comment: 'Fecha de asignación del beneficio al empleado',
  })
  fechaAsignacion: Date;

  // 👇 COLUMNA NUEVA 1: PRECIO ESPECÍFICO
  /**
   * Permite sobreescribir el valor base del beneficio.
   * Ej: El seguro cuesta $20 base, pero este empleado paga $50 por plan familiar.
   * Si es NULL, se usa el valor del Beneficio padre.
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'Valor específico para este empleado (sobrescribe al general)'
  })
  montoPersonalizado: number;

  // 👇 COLUMNA NUEVA 2: SWITCH ON/OFF
  /**
   * Define si el beneficio se debe descontar/pagar este mes.
   * Útil para pausar beneficios (ej: suspensión de gimnasio) sin borrarlos.
   */
  @Column({
    type: 'boolean',
    default: true,
    comment: 'Si es false, el motor de nómina ignora esta asignación'
  })
  activo: boolean;

  // ---
  // RELACIONES
  // ---

  @ManyToOne(() => Empleado, (empleado) => empleado.beneficiosAsignados, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column({ comment: 'ID del Empleado que recibe el beneficio' })
  empleadoId: string;

  @ManyToOne(() => Beneficio, (beneficio) => beneficio.asignaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'beneficioId' })
  beneficio: Beneficio;

  @Column({ comment: 'ID del Beneficio otorgado' })
  beneficioId: string;
}