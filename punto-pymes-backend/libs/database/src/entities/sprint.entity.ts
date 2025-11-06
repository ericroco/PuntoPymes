// libs/database/src/entities/sprint.entity.ts
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
import { Tarea } from './tarea.entity';

/**
 * Entidad que representa un Sprint (un ciclo de trabajo corto)
 * dentro de un Proyecto.
 * (Ej: 'Sprint 1 - Q1', 'Sprint Cierre de Mes').
 * Agrupa las Tareas a realizar en un periodo de tiempo.
 * Mapea la tabla 'sprints'
 */
@Entity({ name: 'sprints' })
// Indexamos para buscar sprints rápidamente por proyecto
@Index(['proyectoId'])
export class Sprint extends BaseEntity {
  /**
   * Nombre o identificador del sprint
   * Mapea: string nombre "Nombre identificador sprint"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre o identificador del sprint',
  })
  nombre: string;

  /**
   * Fecha de inicio del sprint
   * Mapea: date fechaInicio "Inicio sprint"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de inicio del sprint',
  })
  fechaInicio: Date;

  /**
   * Fecha de fin del sprint
   * Mapea: date fechaFin "Fin sprint"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de fin del sprint',
  })
  fechaFin: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Sprint PERTENECE A...)
  // ---

  /**
   * Relación: Un Sprint pertenece a UN Proyecto.
   * onDelete: 'CASCADE' = Si el Proyecto se borra, sus sprints se borran.
   */
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.sprints, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyectoId' }) // Define el nombre de la columna FK
  proyecto: Proyecto;

  /**
   * Mapea: string proyectoId FK "Proyecto padre sprint"
   */
  @Column({ comment: 'ID del Proyecto padre' })
  proyectoId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Sprint TIENE MUCHAS...)
  // ---

  /**
   * Relación: Un Sprint agrupa muchas Tareas.
   * Este es el "otro lado" de la relación que definiremos en 'Tarea'.
   * 'onDelete: SET NULL' = Si se borra un Sprint, las tareas que
   * contenía NO se borran, simplemente su 'sprintId' se vuelve nulo
   * (pasan al "backlog" del proyecto). Esta es la mejor práctica.
   */
  @OneToMany(() => Tarea, (tarea) => tarea.sprint, { onDelete: 'SET NULL' })
  tareas: Tarea[];
}