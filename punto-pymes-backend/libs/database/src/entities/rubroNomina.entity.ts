// libs/database/src/entities/rubroNomina.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { NominaEmpleado } from './nominaEmpleado.entity';

/**
 * Entidad que representa una línea de detalle (un rubro)
 * dentro de un rol de pago (NominaEmpleado).
 * (Ej: 'Salario Base', 'Horas Extra', 'Aporte IESS', 'Préstamo')
 * Mapea la tabla 'rubros_nomina'
 */
@Entity({ name: 'rubros_nomina' })
// Indexamos la FK para buscar rápidamente todos los rubros de un rol de pago
@Index(['nominaEmpleadoId'])
export class RubroNomina extends BaseEntity {
  /**
   * Tipo de rubro (Ingreso o Egreso)
   * Mapea: string tipo "Tipo rubro ingreso egreso"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Tipo de rubro (Ingreso, Egreso)',
  })
  tipo: string;

  /**
   * Concepto o descripción del rubro
   * Mapea: string concepto "Concepto descripcion rubro"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Concepto/descripción del rubro (Salario Base, Aporte IESS)',
  })
  concepto: string;

  /**
   * Monto del rubro (positivo para ingresos, negativo para egresos)
   * Mapea: float valor "Monto rubro"
   */
  @Column({
    type: 'float',
    comment: 'Monto del rubro (positivo para Ingreso, negativo para Egreso)',
  })
  valor: number;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Rubro PERTENECE A...)
  // ---

  /**
   * Relación: El rubro pertenece a UN rol de pago (NominaEmpleado).
   * onDelete: 'CASCADE' = Si el rol de pago (NominaEmpleado) se borra,
   * todas sus líneas de detalle (rubros) se borran con él.
   */
  @ManyToOne(() => NominaEmpleado, (nomina) => nomina.rubros, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'nominaEmpleadoId' }) // Define el nombre de la columna FK
  nominaEmpleado: NominaEmpleado;

  /**
   * Mapea: string nominaEmpleadoId FK "Nomina linea detalle"
   */
  @Column({ comment: 'ID de la Nómina (rol de pago) a la que pertenece esta línea' })
  nominaEmpleadoId: string;
}