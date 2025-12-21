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
import { Empleado } from './empleado.entity';
import { Sucursal } from './sucursal.entity'; // 👈 1. IMPORTAR SUCURSAL

/**
 * Entidad que representa un Proyecto dentro de una Empresa.
 * Es el contenedor principal para Sprints y Tareas.
 * Mapea la tabla 'proyectos'
 */
@Entity({ name: 'proyectos' })
// Indexamos para buscar proyectos rápidamente por empresa y ahora por sucursal
@Index(['empresaId'])
export class Proyecto extends BaseEntity {
  /**
   * Nombre del proyecto
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del proyecto',
  })
  nombre: string;

  /**
   * Descripción detallada del proyecto
   */
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción detallada del proyecto',
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'ACTIVO',
    comment: 'Estado actual del proyecto',
  })
  estado: string;

  // ---
  // RELACIONES "MUCHOS A UNO"
  // ---

  /**
   * Relación: Un Proyecto es gestionado por UNA Empresa (Tenant).
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ comment: 'ID de la Empresa (Tenant) propietaria del proyecto' })
  empresaId: string;

  /**
   * Relación: Un Proyecto tiene UN líder (Empleado).
   */
  @ManyToOne(() => Empleado, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'liderId' })
  lider: Empleado;

  @Column({
    nullable: true,
    comment: 'ID del Empleado (opcional) que lidera el proyecto',
  })
  liderId: string;

  // =========================================================
  // 👇 2. NUEVA RELACIÓN: EL PROYECTO PERTENECE A UNA SUCURSAL
  // =========================================================

  /**
   * Relación: Un Proyecto puede pertenecer a una Sucursal específica.
   * nullable: true -> Para proyectos "Globales" o creados antes de tener sucursales.
   * onDelete: 'SET NULL' -> Si se borra la sucursal, el proyecto no se borra, solo queda sin sede.
   */
  @ManyToOne(() => Sucursal, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursal;

  @Column({ nullable: true, comment: 'ID de la Sucursal a la que pertenece este proyecto' })
  sucursalId: string;

  // ---
  // RELACIONES "UNO A MUCHOS"
  // ---

  @OneToMany(() => Sprint, (sprint) => sprint.proyecto, { cascade: true })
  sprints: Sprint[];

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto, { cascade: true })
  tareas: Tarea[];
}