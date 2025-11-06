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

/**
 * Entidad que representa la inscripción de un Empleado en un Curso.
 * Es la tabla que vincula el "qué" (Curso) con el "quién" (Empleado)
 * y registra su progreso (RF-17).
 * Mapea la tabla 'inscripciones_cursos'
 */
@Entity({ name: 'inscripciones_cursos' })
// Indexamos ambas FKs para búsquedas rápidas
@Index(['cursoId'])
@Index(['empleadoId'])
// Un empleado solo puede inscribirse UNA vez en el mismo curso.
@Unique(['cursoId', 'empleadoId'])
export class InscripcionCurso extends BaseEntity {
  /**
   * Estado del progreso del empleado en el curso
   * Mapea: string estado "Estado progreso curso"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado del progreso (Inscrito, En Progreso, Completado)',
  })
  estado: string;

  /**
   * Nota final del curso (opcional)
   * Mapea: float calificacion "Nota final nullable"
   */
  @Column({
    type: 'float',
    nullable: true,
    comment: 'Nota final del curso (si aplica)',
  })
  calificacion: number;

  /**
   * Fecha en que el empleado se inscribió al curso
   * Mapea: date fechaInscripcion "Fecha inscripcion curso"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de inscripción al curso',
  })
  fechaInscripcion: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Una Inscripción PERTENECE A...)
  // ---

  /**
   * Relación: La inscripción pertenece a UN Curso del catálogo.
   * onDelete: 'CASCADE' = Si el Curso es borrado del catálogo,
   * las inscripciones a ese curso también se borran.
   */
  @ManyToOne(() => Curso, (curso) => curso.inscripciones, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cursoId' }) // Define el nombre de la columna FK
  curso: Curso;

  /**
   * Mapea: string cursoId FK "Curso inscrito"
   */
  @Column({ comment: 'ID del Curso al que se inscribió' })
  cursoId: string;

  /**
   * Relación: La inscripción pertenece a UN Empleado (estudiante).
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus inscripciones
   * a cursos también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.inscripcionesCursos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado estudiante"
   */
  @Column({ comment: 'ID del Empleado (estudiante)' })
  empleadoId: string;
}