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
// Asegúrate de que el archivo itemGasto.entity.ts exista (ver paso 2)
import { ItemGasto } from './itemGasto.entity';

export enum EstadoReporte {
  BORRADOR = 'BORRADOR',     // Aún editando
  PENDIENTE = 'PENDIENTE',   // Enviado a aprobación
  APROBADO = 'APROBADO',     // Aprobado por jefe/RRHH
  RECHAZADO = 'RECHAZADO',   // Devuelto
  PAGADO = 'PAGADO',         // Reembolsado
}

@Entity({ name: 'reportes_gasto' })
@Index(['empleadoId', 'estado'])
export class ReporteGasto extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre o título del reporte (Ej: Viaje a Quito)',
  })
  titulo: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción general del motivo del gasto',
  })
  descripcion: string;

  /**
   * Estado del reporte.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoReporte.BORRADOR,
    comment: 'Estado (BORRADOR, PENDIENTE, APROBADO...)',
  })
  estado: EstadoReporte;

  /**
   * Monto total calculado automáticamente.
   */
  @Column({
    type: 'float',
    default: 0,
    comment: 'Monto total de los gastos reportados',
  })
  total: number;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
    comment: 'Fecha de creación del reporte',
  })
  fechaReporte: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Empleado, (empleado) => empleado.reportesGastos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column({ comment: 'ID del Empleado que genera el reporte' })
  empleadoId: string;

  @OneToMany(() => ItemGasto, (item) => item.reporte, {
    cascade: true,
  })
  items: ItemGasto[];
}