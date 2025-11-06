// libs/database/src/entities/timesheet.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { Tarea } from './tarea.entity';

/**
 * Entidad que representa un registro de horas (Timesheet).
 * Es la tabla que vincula "quién" (Empleado) con "qué" (Tarea)
 * y "cuánto" (Horas) en una fecha específica.
 * Cumple con el módulo de Hojas de Horas (RF-34).
 * Mapea la tabla 'timesheets'
 */
@Entity({ name: 'timesheets' })
// Indexamos ambas FKs para búsquedas rápidas de reportes de horas
@Index(['empleadoId'])
@Index(['tareaId'])
// Podríamos añadir un @Unique(['empleadoId', 'tareaId', 'fecha'])
// si solo permitimos un registro por día/tarea/empleado,
// pero lo omitiremos por ahora para permitir múltiples registros diarios.
export class Timesheet extends BaseEntity {
  /**
   * Fecha del registro de horas
   * Mapea: date fecha "Fecha registro horas"
   */
  @Column({
    type: 'date',
    comment: 'Fecha del registro de horas',
  })
  fecha: Date;

  /**
   * Cantidad de horas trabajadas en esa fecha y tarea
   * Mapea: float horas "Cantidad horas trabajadas"
   */
  @Column({
    type: 'float',
    comment: 'Cantidad de horas trabajadas',
  })
  horas: number;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un registro de Timesheet PERTENECE A...)
  // ---

  /**
   * Relación: El registro de horas pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus registros
   * de horas también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.timesheets, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado reporta tiempo"
   */
  @Column({ comment: 'ID del Empleado que reporta el tiempo' })
  empleadoId: string;

  /**
   * Relación: El registro de horas pertenece a UNA Tarea.
   * onDelete: 'CASCADE' = Si la Tarea es borrada, sus registros
   * de horas asociados también se borran.
   */
  @ManyToOne(() => Tarea, (tarea) => tarea.timesheets, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tareaId' }) // Define el nombre de la columna FK
  tarea: Tarea;

  /**
   * Mapea: string tareaId FK "Tarea trabajada"
   */
  @Column({ comment: 'ID de la Tarea en la que se trabajó' })
  tareaId: string;
}