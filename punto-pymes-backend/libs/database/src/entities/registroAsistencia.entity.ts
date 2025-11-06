// libs/database/src/entities/registroAsistencia.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa una marcación de asistencia (Check-in/Check-out).
 * Es un registro transaccional para el módulo de Control de Asistencia (RF-23).
 * Mapea la tabla 'registros_asistencia'
 */
@Entity({ name: 'registros_asistencia' })
// Indexamos para reportes rápidos de asistencia por empleado y fecha
@Index(['empleadoId', 'timestamp'])
export class RegistroAsistencia extends BaseEntity {
  /**
   * Fecha y hora exactas de la marcación (con zona horaria)
   * Mapea: datetime timestamp "Fecha hora marcacion"
   */
  @Column({
    type: 'timestamptz', // 'timestamptz' es crucial para asistencias
    comment: 'Fecha y hora exactas de la marcación',
  })
  timestamp: Date;

  /**
   * Tipo de marcación (Entrada, Salida, Inicio Pausa, Fin Pausa)
   * Mapea: string tipo "Tipo marcacion entrada salida"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Tipo de marcación (Entrada, Salida)',
  })
  tipo: string;

  /**
   * Método de registro (Web, Móvil, Biométrico)
   * Mapea: string metodo "Metodo registro usado"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Método de registro (Web, Móvil)',
  })
  metodo: string;

  /**
   * Datos de ubicación (GPS) para marcaciones móviles (RF-23-02)
   * Mapea: string ubicacion "Datos ubicacion GPS"
   */
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true, // Nulo si la marcación es 'Web'
    comment: 'Datos de ubicación (GPS) si es móvil (RF-23-02)',
  })
  ubicacion: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Registro PERTENECE A...)
  // ---

  /**
   * Relación: El registro de asistencia pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, todos sus
   * registros de asistencia (su historial) se borran con él.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.registrosAsistencia, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado registra asistencia"
   */
  @Column({ comment: 'ID del Empleado que registra la asistencia' })
  empleadoId: string;
}