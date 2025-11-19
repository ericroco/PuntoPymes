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
import { Empleado } from './empleado.entity';

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

  @Column({
    type: 'varchar',
    length: 50, // O la longitud que necesites para tus estados
    default: 'ACTIVO', // Replicamos la lógica del servicio
    comment: 'Estado actual del proyecto',
  })
  estado: string;

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

  // --- 2. AÑADIR LA RELACIÓN CON EL LÍDER (EMPLEADO) ---
  /**
   * Relación: Un Proyecto tiene UN líder (que es un Empleado).
   * Es opcional (nullable: true).
   * onDelete: 'SET NULL' = Si el empleado se borra, el proyecto se queda sin líder.
   */
  @ManyToOne(() => Empleado, {
    nullable: true, // Un proyecto puede no tener líder
    onDelete: 'SET NULL', // Si se borra el empleado, el campo liderId queda null
  })
  @JoinColumn({ name: 'liderId' }) // La columna FK se llamará 'liderId'
  lider: Empleado; // Esta es la propiedad que usas en 'relations: ['lider']'

  // --- 3. AÑADIR LA COLUMNA 'liderId' ---
  /**
   * Mapea: string liderId FK "Empleado líder del proyecto"
   */
  @Column({
    nullable: true, // Debe coincidir con la relación
    comment: 'ID del Empleado (opcional) que lidera el proyecto',
  })
  liderId: string; // <-- Esta es la propiedad que te faltaba

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