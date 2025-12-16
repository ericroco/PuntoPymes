import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Curso } from './curso.entity';
import { Empleado } from './empleado.entity';

// 1. Definimos estados estrictos (Esto está perfecto)
export enum EstadoInscripcion {
  INSCRITO = 'Inscrito',       // Ajusté a Capital Case para que se vea bonito en el frontend directo
  EN_PROGRESO = 'En Progreso',
  COMPLETADO = 'Completado',
  CANCELADO = 'Cancelado',
}

@Entity({ name: 'inscripciones_cursos' })
@Index(['cursoId'])
@Index(['empleadoId'])
@Unique(['cursoId', 'empleadoId']) // Evita que un empleado se inscriba 2 veces al mismo curso
export class InscripcionCurso extends BaseEntity {

  /**
   * Estado del progreso.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoInscripcion.INSCRITO,
    comment: 'Estado del progreso (Inscrito, Completado...)',
  })
  estado: EstadoInscripcion;

  /**
   * 👇 NUEVO CAMPO IMPORTANTE:
   * Porcentaje de avance (0 a 100).
   * Necesario para la barra de progreso del Frontend.
   */
  @Column({
    type: 'int',
    default: 0,
    comment: 'Porcentaje de avance del curso (0-100)',
  })
  progreso: number;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Nota final del curso (si aplica)',
  })
  calificacion: number;

  /**
   * Fecha de inscripción.
   * Usamos CreateDateColumn para que guarde FECHA Y HORA automáticamente.
   */
  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Fecha y hora de inscripción al curso',
  })
  fechaInscripcion: Date;

  /**
   * Fecha en que completó el curso.
   */
  @Column({
    type: 'timestamp', // Cambiado a timestamp para saber la hora exacta
    nullable: true,
    comment: 'Fecha y hora de finalización del curso',
  })
  fechaCompletado: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Curso, (curso) => curso.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE', // Si borran el curso, se borra la inscripción
  })
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @Column()
  cursoId: string;

  @ManyToOne(() => Empleado, {
    nullable: false,
    onDelete: 'CASCADE', // Si despiden al empleado, se borra su historial (o podrías usar SET NULL si quieres mantener historia)
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column()
  empleadoId: string;
}