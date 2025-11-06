// libs/database/src/entities/evaluacion.entity.ts
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
 * Entidad que representa una Evaluación de Desempeño individual.
 * Almacena los resultados de la matriz 9-Box (RF-45-04)
 * (Desempeño vs. Potencial) y el feedback.
 * Mapea la tabla 'evaluaciones'
 */
@Entity({ name: 'evaluaciones' })
// Indexamos las FKs para búsquedas rápidas
@Index(['cicloId'])
@Index(['evaluadoId'])
@Index(['evaluadorId'])
// Un empleado solo puede ser evaluado UNA vez por ciclo.
@Unique(['cicloId', 'evaluadoId'])
export class Evaluacion extends BaseEntity {
  /**
   * Calificación de potencial (Eje Y de la 9-Box)
   * Mapea: int calificacionPotencial "Calificacion potencial 1-9"
   */
  @Column({
    type: 'int',
    comment: 'Calificación de potencial (1-9) para la Matriz 9-Box (RF-45-04)',
  })
  calificacionPotencial: number;

  /**
   * Calificación de desempeño (Eje X de la 9-Box)
   * Mapea: int calificacionDesempeno "Calificacion desempeno 1-9"
   */
  @Column({
    type: 'int',
    comment: 'Calificación de desempeño (1-9) para la Matriz 9-Box (RF-45-04)',
  })
  calificacionDesempeno: number;

  /**
   * Comentarios y feedback cualitativo de la evaluación
   * Mapea: string feedback "Comentarios evaluacion"
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Comentarios y feedback cualitativo de la evaluación',
  })
  feedback: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Evaluación PERTENECE A...)
  // ---

  /**
   * Relación: La evaluación pertenece a UN Ciclo.
   * onDelete: 'CASCADE' = Si el Ciclo (ej. "Evaluación 2025") se borra,
   * todas las evaluaciones registradas en él también se borran.
   */
  @ManyToOne(() => CicloEvaluacion, (ciclo) => ciclo.evaluaciones, {
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
   * Relación: La evaluación es de UN Empleado (el evaluado).
   * onDelete: 'CASCADE' = Si el Empleado evaluado es borrado, sus
   * evaluaciones (que no tienen sentido sin él) también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.evaluacionesRecibidas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evaluadoId' }) // Define el nombre de la columna FK
  evaluado: Empleado;

  /**
   * Mapea: string evaluadoId FK "Empleado siendo evaluado"
   */
  @Column({ comment: 'ID del Empleado que está siendo evaluado' })
  evaluadoId: string;

  /**
   * Relación: La evaluación es realizada por UN Empleado (el evaluador).
   * onDelete: 'CASCADE' = Si el Empleado evaluador es borrado,
   * sus evaluaciones realizadas se borran.
   * (Podría ser 'SET NULL' si queremos conservar el registro anónimo).
   * Vamos a usar 'CASCADE' por simplicidad, como 'evaluado'.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.evaluacionesHechas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evaluadorId' }) // Define el nombre de la columna FK
  evaluador: Empleado;

  /**
   * Mapea: string evaluadorId FK "Manager realiza evaluacion"
   */
  @Column({ comment: 'ID del Empleado (manager) que realiza la evaluación' })
  evaluadorId: string;
}