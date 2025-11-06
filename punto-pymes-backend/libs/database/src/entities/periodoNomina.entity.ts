// libs/database/src/entities/periodoNomina.entity.ts
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
import { NominaEmpleado } from './nominaEmpleado.entity';

/**
 * Entidad que representa un periodo de procesamiento de nómina.
 * (Ej: 'Nómina Enero 2025', 'Quincena 1 - Feb 2025').
 * Agrupa los roles de pago individuales generados en ese ciclo.
 * Mapea la tabla 'periodos_nomina'
 */
@Entity({ name: 'periodos_nomina' })
// Indexamos para buscar periodos rápidamente por empresa y estado
@Index(['empresaId', 'estado'])
export class PeriodoNomina extends BaseEntity {
  /**
   * Fecha de inicio del periodo de pago
   * Mapea: date fechaInicio "Inicio periodo pago"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de inicio del periodo de pago',
  })
  fechaInicio: Date;

  /**
   * Fecha de fin del periodo de pago
   * Mapea: date fechaFin "Fin periodo pago"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de fin del periodo de pago',
  })
  fechaFin: Date;

  /**
   * Estado del procesamiento del periodo
   * Mapea: string estado "Estado procesamiento"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado del procesamiento (Abierto, Procesando, Pagado)',
  })
  estado: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Periodo PERTENECE A...)
  // ---

  /**
   * Relación: Un Periodo de Nómina es procesado por UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, todos sus
   * historiales de nómina se borran con ella.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.periodosNomina, {
    nullable: false, // Un periodo debe pertenecer a una empresa
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa periodo nomina"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) que procesa este periodo' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Periodo TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Periodo de Nómina incluye muchas nóminas individuales (roles de pago).
   * Este es el "otro lado" de la relación que definiremos en 'NominaEmpleado'.
   */
  @OneToMany(
    () => NominaEmpleado,
    (nominaEmpleado) => nominaEmpleado.periodo,
  )
  nominas: NominaEmpleado[];
}