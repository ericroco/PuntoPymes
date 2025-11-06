// libs/database/src/entities/curso.entity.ts
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
import { InscripcionCurso } from './inscripcionCurso.entity';

/**
 * Entidad que representa un Curso del catálogo de Capacitación (LMS) (RF-17).
 * (Ej: 'Curso de Liderazgo', 'Introducción a NestJS').
 * Es ofrecido por una Empresa (Tenant) a sus Empleados.
 * Mapea la tabla 'cursos'
 */
@Entity({ name: 'cursos' })
// Indexamos para buscar cursos rápidamente por empresa
@Index(['empresaId'])
export class Curso extends BaseEntity {
  /**
   * Título del curso de capacitación
   * Mapea: string titulo "Titulo curso capacitacion"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Título del curso de capacitación',
  })
  titulo: string;

  /**
   * Descripción del contenido del curso
   * Mapea: string descripcion "Descripcion contenido curso"
   */
  @Column({
    type: 'text',
    comment: 'Descripción del contenido del curso',
  })
  descripcion: string;

  /**
   * Duración total estimada en horas
   * Mapea: int duracionHoras "Duracion total horas"
   */
  @Column({
    type: 'int',
    nullable: true,
    comment: 'Duración total estimada en horas',
  })
  duracionHoras: number;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Curso PERTENECE A...)
  // ---

  /**
   * Relación: Un Curso es ofrecido por UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, su catálogo
   * de cursos también se borra.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.cursos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa ofrece curso"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) que ofrece el curso' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Curso TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Curso tiene muchas Inscripciones.
   * (Múltiples empleados pueden inscribirse en este curso).
   * Este es el "otro lado" de la relación que definiremos en 'InscripcionCurso'.
   */
  @OneToMany(
    () => InscripcionCurso,
    (inscripcion) => inscripcion.curso,
  )
  inscripciones: InscripcionCurso[];
}