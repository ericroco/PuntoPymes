// libs/database/src/entities/cicloEvaluacion.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Objetivo } from './objetivo.entity';
import { Evaluacion } from './evaluacion.entity';

/**
 * Entidad que representa un Ciclo de Evaluación de Desempeño (RF-12).
 * (Ej: 'Evaluación Anual 2025', 'Revisión Q3 2024').
 * Agrupa los Objetivos y Evaluaciones de un periodo.
 * Mapea la tabla 'ciclos_evaluacion'
 */
@Entity({ name: 'ciclos_evaluacion' })
// Indexamos para buscar ciclos rápidamente por empresa
@Index(['empresaId'])
export class CicloEvaluacion extends BaseEntity {
  /**
   * Nombre del ciclo de evaluación
   * Mapea: string nombre "Nombre ciclo evaluacion"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del ciclo (Ej: Evaluación Anual 2025)',
  })
  nombre: string;

  /**
   * Fecha de inicio del ciclo
   * Mapea: date fechaInicio "Inicio ciclo"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de inicio del ciclo',
  })
  fechaInicio: Date;

  /**
   * Fecha de fin del ciclo
   * Mapea: date fechaFin "Fin ciclo"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de fin del ciclo',
  })
  fechaFin: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Ciclo PERTENECE A...)
  // ---

  /**
   * Relación: Un Ciclo de Evaluación es ejecutado por UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, todos sus
   * historiales de evaluación se borran con ella.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.ciclosEvaluacion, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa ejecuta ciclo"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) que ejecuta el ciclo' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Ciclo TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Ciclo de Evaluación agrupa muchos Objetivos.
   * Este es el "otro lado" de la relación que definiremos en 'Objetivo'.
   * 'cascade: true' = Si se borra el Ciclo, sus Objetivos se borran.
   */
  @OneToMany(() => Objetivo, (objetivo) => objetivo.ciclo, { cascade: true })
  objetivos: Objetivo[];

  /**
   * Relación: Un Ciclo de Evaluación agrupa muchas Evaluaciones.
   * Este es el "otro lado" de la relación que definiremos en 'Evaluacion'.
   * 'cascade: true' = Si se borra el Ciclo, sus Evaluaciones se borran.
   */
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.ciclo, {
    cascade: true,
  })
  evaluaciones: Evaluacion[];
}