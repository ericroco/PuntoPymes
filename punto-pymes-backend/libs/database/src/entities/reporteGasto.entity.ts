// libs/database/src/entities/reporteGasto.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { ItemGasto } from './itemGasto.entity';

/**
 * Entidad que representa un Reporte de Gastos (RF-44).
 * Es el contenedor para múltiples items de gasto (facturas)
 * que un Empleado envía para aprobación.
 * (Ej: 'Viaje a Cliente Quito Q4 2025').
 * Mapea la tabla 'reportes_gasto'
 */
@Entity({ name: 'reportes_gasto' })
// Indexamos para buscar reportes rápidamente por empleado y estado
@Index(['empleadoId', 'estado'])
export class ReporteGasto extends BaseEntity {
  /**
   * Nombre o título del reporte
   * Mapea: string nombre "Nombre titulo reporte"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre o título del reporte (Ej: Viaje a Cliente Quito)',
  })
  nombre: string;

  /**
   * Estado de aprobación del reporte
   * Mapea: string estado "Estado aprobacion reporte"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado de aprobación (Pendiente, Aprobado, Rechazado)',
  })
  estado: string;

  /**
   * Monto total de los gastos reportados (calculado de los items)
   * Mapea: float total "Monto total gastos"
   */
  @Column({
    type: 'float',
    comment: 'Monto total de los gastos reportados (calculado de los items)',
  })
  total: number;

  /**
   * Fecha de creación del reporte
   * Mapea: date fechaReporte "Fecha creacion reporte"
   */
  @Column({
    type: 'date',
    comment: 'Fecha de creación del reporte',
  })
  fechaReporte: Date;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Reporte PERTENECE A...)
  // ---

  /**
   * Relación: El reporte de gasto es generado por UN Empleado.
   * onDelete: 'CASCADE' = Si el Empleado es borrado, sus reportes
   * de gastos (su historial) se borran con él.
   */
  @ManyToOne(() => Empleado, (empleado) => empleado.reportesGastos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' }) // Define el nombre de la columna FK
  empleado: Empleado;

  /**
   * Mapea: string empleadoId FK "Empleado genera reporte"
   */
  @Column({ comment: 'ID del Empleado que genera el reporte' })
  empleadoId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Reporte TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Reporte de Gasto contiene muchos Items (facturas).
   * 'cascade: true' = Al guardar/actualizar un ReporteGasto,
   * también se guardarán/actualizarán sus items asociados.
   */
  @OneToMany(() => ItemGasto, (item) => item.reporte, {
    cascade: true, // Importante para guardar el detalle junto con el maestro
  })
  items: ItemGasto[];
}