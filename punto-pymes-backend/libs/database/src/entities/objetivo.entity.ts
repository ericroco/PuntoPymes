// libs/database/src/entities/objetivo.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CicloEvaluacion } from './cicloEvaluacion.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa un Objetivo de desempeño individual
 * asignado a un Empleado dentro de un Ciclo de Evaluación.
 * (Ej: 'Completar curso de NestJS', 'Cerrar 10 ventas').
 * Mapea la tabla 'objetivos'
 */
@Entity({ name: 'objetivos' })
// Indexamos las FKs para búsquedas rápidas
@Index(['cicloId'])
@Index(['empleadoId'])
// Un empleado no debería tener el mismo objetivo dos veces en el mismo ciclo,
// aunque la descripción lo haría único. Indexar es suficiente.
export class Objetivo extends BaseEntity {
  /**
   * Descripción del objetivo a medir
   * Mapea: string descripcion "Descripcion objetivo medir"
   */
  @Column({
    type: 'text',
    comment: 'Descripción del objetivo a medir',
  })
  descripcion: string;

  /**
   * Porcentaje de progreso del objetivo (0-100)
   * Mapea: float progreso "Porcentaje progreso 0-100"
   */
  @Column({
    type: 'float',
    default: 0,
    comment: 'Porcentaje de progreso (0-100)',
  })
  progreso: number;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Objetivo PERTENECE A...)
  // ---

  /**
   * Relación: El objetivo pertenece a UN Ciclo de Evaluación.
   * onDelete: 'CASCADE' = Si el Ciclo (ej. "Evaluación 2025") se borra,
   * todos los objetivos definidos en él también se borran.
   */
  @ManyToOne(() => CicloEvaluacion, (ciclo) => ciclo.objetivos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cicloId' }) // Define el nombre de la columna FK
  ciclo: CicloEvaluacion;

  /**
   * Mapea: string cicloId FK "Ciclo evaluacion pertenece"
   */
  @Column({ comment: 'ID del Ciclo de Evaluación al que pertenece' })
  cicloId: string;

  /**
   * Relación: El objetivo está asignado a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus objetivos
   * (que no tienen sentido sin él) también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.objetivos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado objetivo asignado"
   */
  @Column({ comment: 'ID del Empleado al que se asignó el objetivo' })
  empleadoId: string;
}