// libs/database/src/entities/beneficioAsignado.entity.ts
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
 * Es la tabla que vincula el "qué" (Beneficio) con el "quién" (Empleado).
 * Mapea la tabla 'beneficios_asignados'
 */
@Entity({ name: 'beneficios_asignados' })
// Indexamos ambas FKs para búsquedas rápidas
@Index(['empleadoId'])
@Index(['beneficioId'])
// Un empleado solo puede tener un beneficio específico asignado una vez.
@Unique(['empleadoId', 'beneficioId']) 
export class BeneficioAsignado extends BaseEntity {
  /**
   * Fecha de asignación del beneficio al empleado
   * Mapea: date fechaAsignacion "Fecha asignacion beneficio"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de asignación del beneficio al empleado',
  })
  fechaAsignacion: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Asignación PERTENECE A...)
  // ---

  /**
   * Relación: La asignación pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus asignaciones
   * de beneficios también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.beneficiosAsignados, {
    nullable: false, // No puede existir una asignación sin empleado
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado recibe beneficio"
   */
  @Column({ comment: 'ID del Empleado que recibe el beneficio' })
  empleadoId: string;

  /**
   * Relación: La asignación se refiere a UN Beneficio del catálogo.
   * onDelete: 'CASCADE' = Si el Beneficio es borrado del catálogo
   * de la empresa, también se borran las asignaciones existentes.
   */
  @ManyToOne(() => Beneficio, (beneficio) => beneficio.asignaciones, {
    nullable: false, // No puede existir una asignación sin beneficio
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'beneficioId' }) // Define el nombre de la columna FK
  beneficio: Beneficio;

  /**
   * Mapea: string beneficioId FK "Beneficio otorgado"
   */
  @Column({ comment: 'ID del Beneficio otorgado' })
  beneficioId: string;
}