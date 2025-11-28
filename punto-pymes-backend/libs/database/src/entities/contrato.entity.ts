// libs/database/src/entities/contrato.entity.ts
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
 * Entidad que representa un Contrato laboral o de servicios.
 * Almacena los términos económicos (salario) y temporales (vigencia)
 * de la relación entre un Empleado y la Empresa.
 * Mapea la tabla 'contratos'
 */
@Entity({ name: 'contratos' })
// Indexamos el empleadoId para búsquedas rápidas de contratos por empleado
@Index(['empleadoId'])
export class Contrato extends BaseEntity {
  /**
   * Tipo de contrato laboral (Indefinido, Temporal, Servicios, etc.)
   * Mapea: string tipo "Tipo contrato laboral"
   */
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Tipo de contrato laboral',
  })
  tipo: string;

  /**
   * Salario mensual nominal
   * Mapea: float salario "Salario mensual nominal"
   */
  @Column({
    type: 'float',
    comment: 'Salario mensual nominal',
  })
  salario: number;

  /**
   * Código de moneda de pago (USD, EUR, etc.)
   * Mapea: string moneda "Codigo moneda pago"
   */
  @Column({
    type: 'varchar',
    length: 10,
    comment: 'Código de moneda de pago (USD, EUR)',
  })
  moneda: string;

  /**
   * Fecha de inicio de vigencia del contrato
   * Mapea: date fechaInicio "Inicio vigencia contrato"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de inicio de vigencia del contrato',
  })
  fechaInicio: Date;

  /**
   * Fecha de fin de vigencia del contrato (opcional)
   * Mapea: date fechaFin "Fin vigencia nullable"
   */
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de fin de vigencia (si aplica)',
  })
  fechaFin: Date;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'Vigente',
    comment: 'Estado del vínculo laboral (Vigente, Finalizado)',
  })
  estado: string;

  /**
 * Mapea: string empleadoId FK "Empleado contratado"
 */
  @Column({ comment: 'ID del Empleado al que pertenece el contrato' })
  empleadoId: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Contrato PERTENECE A...)
  // ---

  /**
   * Relación: Un Contrato pertenece a UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus contratos
   * (que no tienen sentido sin él) también se borran.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.contratos, {
    nullable: false, // Un contrato debe estar ligado a un empleado
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;


}