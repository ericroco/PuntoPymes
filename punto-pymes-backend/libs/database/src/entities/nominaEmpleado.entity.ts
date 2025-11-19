// libs/database/src/entities/nominaEmpleado.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { PeriodoNomina } from './periodoNomina.entity';
import { Empleado } from './empleado.entity';
import { RubroNomina } from './rubroNomina.entity';

/**
 * Entidad que representa el rol de pago individual de un Empleado
 * para un Periodo de Nómina específico.
 * Mapea la tabla 'nominas_empleados'
 */
@Entity({ name: 'nominas_empleados' })
// Indexamos las FKs para búsquedas rápidas
@Index(['periodoId'])
@Index(['empleadoId'])
// Un empleado solo puede tener UN rol de pago por periodo.
@Unique(['periodoId', 'empleadoId'])
export class NominaEmpleado extends BaseEntity {
  /**
   * Suma total de todos los ingresos del empleado en este periodo.
   * Mapea: float totalIngresos "Suma total ingresos"
   */
  @Column({
    type: 'float',
    comment: 'Suma total de ingresos (calculado de los rubros)',
    default: 0,
  })
  totalIngresos: number;

  /**
   * Suma total de todas las deducciones del empleado en este periodo.
   * Mapea: float totalEgresos "Suma total deducciones"
   */
  @Column({
    type: 'float',
    comment: 'Suma total de deducciones (calculado de los rubros)',
    default: 0,
  })
  totalEgresos: number;

  /**
   * Monto neto a pagar (Ingresos - Egresos).
   * Mapea: float netoAPagar "Monto neto pagar"
   */
  @Column({
    type: 'float',
    comment: 'Monto neto a pagar (TotalIngresos - TotalEgresos)',
    default: 0,
  })
  netoAPagar: number;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un rol de pago PERTENECE A...)
  // ---

  /**
   * Relación: El rol de pago pertenece a UN Periodo de Nómina.
   * onDelete: 'CASCADE' = Si se borra el Periodo (ej. "Nómina Enero 2025"),
   * se borran todos los roles de pago asociados a él.
   */
  @ManyToOne(() => PeriodoNomina, (periodo) => periodo.nominas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'periodoId' }) // Define el nombre de la columna FK
  periodo: PeriodoNomina;

  /**
   * Mapea: string periodoId FK "Periodo nomina pertenece"
   */
  @Column({ comment: 'ID del Periodo de Nómina al que pertenece' })
  periodoId: string;

  /**
   * Relación: El rol de pago pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, todo su
   * historial de roles de pago se borra con él.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.nominas, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado recibe pago"
   */
  @Column({ comment: 'ID del Empleado que recibe este pago' })
  empleadoId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un rol de pago TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un rol de pago (NominaEmpleado) detalla muchos Rubros.
   * (Ej: 'Salario Base', 'Horas Extra', 'Aporte IESS').
   * 'cascade: true' = Al guardar/actualizar una NominaEmpleado,
   * también se guardarán/actualizarán sus rubros asociados.
   */
  @OneToMany(() => RubroNomina, (rubro) => rubro.nominaEmpleado, {
    cascade: true, // Importante para guardar el detalle junto con el maestro
  })
  rubros: RubroNomina[];
}