import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { InscripcionCurso } from './inscripcionCurso.entity';

@Entity({ name: 'cursos' })
@Index(['empresaId'])
export class Curso extends BaseEntity {

  @Column({ type: 'varchar', length: 255, comment: 'Título del curso' })
  titulo: string;

  @Column({ type: 'text', comment: 'Descripción del contenido' })
  descripcion: string;

  // 👇 CAMBIO: De 'duracionHoras' (int) a 'duration' (string) para aceptar "2h 30m"
  @Column({ type: 'varchar', length: 50, comment: 'Ej: 10 horas, 30 min' })
  duration: string;

  // 👇 NUEVO: Instructor
  @Column({ type: 'varchar', length: 150, comment: 'Nombre del instructor' })
  instructor: string;

  // 👇 NUEVO: Categoría (Para filtros)
  @Column({ type: 'varchar', length: 100, comment: 'Tecnología, Ventas, etc.' })
  category: string;

  // 👇 NUEVO: Imagen de portada
  @Column({ type: 'text', nullable: true, comment: 'URL de la imagen' })
  imageUrl: string;

  // 👇 NUEVO: Estado (Activo/Inactivo)
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // --- RELACIONES (Sin cambios) ---
  @ManyToOne(() => Empresa, (empresa) => empresa.cursos, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column()
  empresaId: string;

  @OneToMany(() => InscripcionCurso, (inscripcion) => inscripcion.curso)
  inscripciones: InscripcionCurso[];
}