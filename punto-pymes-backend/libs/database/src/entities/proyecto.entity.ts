// libs/database/src/entities/proyecto.entity.ts
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
import { Sprint } from './sprint.entity';
import { Tarea } from './tarea.entity';

/**
 * Entidad que representa un Proyecto dentro de una Empresa.
 * Es el contenedor principal para Sprints y Tareas.
 * Mapea la tabla 'proyectos'
 */
@Entity({ name: 'proyectos' })
// Indexamos para buscar proyectos rápidamente por empresa
@Index(['empresaId'])
export class Proyecto extends BaseEntity {
  /**
   * Nombre del proyecto
   * Mapea: string nombre "Nombre proyecto"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del proyecto',
  })
  nombre: string;

  /**
   * Descripción detallada del proyecto
   * Mapea: string descripcion "Descripcion proyecto"
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción detallada del proyecto',
  })
  descripcion: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Proyecto PERTENECE A...)
  // ---

  /**
   * Relación: Un Proyecto es gestionado por UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, sus proyectos se borran.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa propietaria proyecto"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) propietaria del proyecto' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Proyecto TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Proyecto contiene muchos Sprints.
   * 'cascade: true' = Si se borra el Proyecto, sus Sprints se borran.
   */
  @OneToMany(() => Sprint, (sprint) => sprint.proyecto, { cascade: true })
  sprints: Sprint[];

  /**
   * Relación: Un Proyecto contiene muchas Tareas.
   * 'cascade: true' = Si se borra el Proyecto, sus Tareas se borran.
   */
  @OneToMany(() => Tarea, (tarea) => tarea.proyecto, { cascade: true })
  tareas: Tarea[];
}