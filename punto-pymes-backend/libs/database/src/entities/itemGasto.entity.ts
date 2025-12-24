// libs/database/src/entities/itemGasto.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ReporteGasto } from './reporteGasto.entity';

/**
 * Entidad que representa un ítem de gasto individual (una factura).
 * (Ej: 'Factura Hotel Hilton', 'Recibo Taxi Aeropuerto').
 * Pertenece a un ReporteGasto (RF-44-01).
 * Mapea la tabla 'items_gasto'
 */
@Entity({ name: 'items_gasto' })
// Indexamos la FK para buscar rápidamente todos los items de un reporte
@Index(['reporteId'])
export class ItemGasto extends BaseEntity {
  /**
   * Concepto o descripción del gasto
   * Mapea: string concepto "Concepto descripcion gasto"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Concepto o descripción del gasto (Factura Hotel, Taxi)',
  })
  concepto: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Categoría del gasto (Alimentación, Transporte, Hospedaje)',
  })
  categoria: string;

  /**
   * Monto individual del gasto
   * Mapea: float monto "Monto individual gasto"
   */
  @Column({
    type: 'float',
    comment: 'Monto individual del gasto',
  })
  monto: number;

  /**
   * Fecha en que se realizó el gasto
   * Mapea: date fecha "Fecha gasto realizado"
   */
  @Column({
    type: 'date',
    comment: 'Fecha en que se realizó el gasto',
  })
  fecha: Date;

  /**
   * URL del comprobante o factura (alojado en S3/Mongo)
   * Mapea: string facturaUrl "URL comprobante factura"
   *
   * @fulfills RNF13 (Almacenamiento Seguro de Archivos)
   * @logic Esta columna no guarda el archivo, solo el enlace a él.
   */
  @Column({
    type: 'varchar',
    length: 1024, // URL puede ser larga
    nullable: true,
    comment: 'URL del comprobante (Mongo/S3) (RNF13)',
  })
  facturaUrl: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Item PERTENECE A...)
  // ---

  /**
   * Relación: El ítem de gasto pertenece a UN Reporte de Gasto.
   * onDelete: 'CASCADE' = Si el Reporte de Gasto se borra,
   * todas sus líneas de detalle (items) se borran con él.
   */
  @ManyToOne(() => ReporteGasto, (reporte) => reporte.items, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reporteId' }) // Define el nombre de la columna FK
  reporte: ReporteGasto;

  /**
   * Mapea: string reporteId FK "Reporte padre contiene"
   */
  @Column({ comment: 'ID del Reporte padre al que pertenece' })
  reporteId: string;
}