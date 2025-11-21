// libs/database/src/entities/inscripcionCurso.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Curso } from './curso.entity';
import { Empleado } from './empleado.entity';

// 1. Definimos estados estrictos
export enum EstadoInscripcion {
  INSCRITO = 'INSCRITO',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

@Entity({ name: 'inscripciones_cursos' })
@Index(['cursoId'])
@Index(['empleadoId'])
@Unique(['cursoId', 'empleadoId'])
export class InscripcionCurso extends BaseEntity {

  /**
   * Estado del progreso. Usa el Enum para consistencia.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoInscripcion.INSCRITO, // Valor por defecto
    comment: 'Estado del progreso (INSCRITO, COMPLETADO...)',
  })
  estado: EstadoInscripcion;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Nota final del curso (si aplica)',
  })
  calificacion: number;

  /**
   * Fecha de inscripción.
   * Default: Se llena sola con la fecha actual.
   */
  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
    comment: 'Fecha de inscripción al curso',
  })
  fechaInscripcion: Date;

  /**
   * Fecha en que completó el curso.
   * Importante para reportes y certificados.
   */
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de finalización del curso',
  })
  fechaCompletado: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Curso, (curso) => curso.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @Column({ comment: 'ID del Curso al que se inscribió' })
  cursoId: string;

  @ManyToOne(() => Empleado, (empleado) => empleado.inscripcionesCursos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column({ comment: 'ID del Empleado (estudiante)' })
  empleadoId: string;
}