// libs/database/src/entities/registroAsistencia.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad para el control de asistencia diario (RF-23).
 * Modelo: UNA fila por día de trabajo.
 */
@Entity({ name: 'registros_asistencia' })
@Index(['empleadoId'])
@Index(['fecha'])
// Regla de Oro: Un empleado solo puede tener UN registro de asistencia por día
@Unique(['empleadoId', 'fecha'])
export class RegistroAsistencia extends BaseEntity {

  /**
   * Fecha de la jornada (YYYY-MM-DD).
   * Sirve para agrupar y buscar.
   */
  @Column({ type: 'date', comment: 'Fecha de la jornada laboral' })
  fecha: Date;

  /**
   * Hora exacta de entrada (Check-In).
   */
  @Column({ type: 'timestamp', comment: 'Hora de entrada' })
  horaEntrada: Date;

  /**
   * Hora exacta de salida (Check-Out).
   * Es nullable porque al entrar, aún no ha salido.
   */
  @Column({ type: 'timestamp', nullable: true, comment: 'Hora de salida' })
  horaSalida: Date;

  /**
   * Horas trabajadas calculadas (se llena al hacer Check-Out).
   */
  @Column({
    type: 'float',
    nullable: true,
    comment: 'Total de horas trabajadas en el día'
  })
  totalHoras: number;

  /**
   * Estado de la asistencia.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: 'ABIERTO', // ABIERTO (trabajando) o CERRADO (salió)
    comment: 'Estado (ABIERTO, CERRADO)'
  })
  estado: string;

  /**
   * Observaciones (ej: "Salí temprano por cita médica").
   */
  @Column({ type: 'text', nullable: true })
  observaciones: string;

  // --- RELACIONES ---

  @ManyToOne(() => Empleado, (empleado) => empleado.registrosAsistencia, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column()
  empleadoId: string;
}