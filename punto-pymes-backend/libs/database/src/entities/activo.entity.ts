import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Unique, // Importante para la restricción compuesta
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
// Nota: Asegúrate de que activoAsignado.entity.ts exista, si no, coméntalo temporalmente
import { ActivoAsignado } from './activoAsignado.entity';

export enum EstadoActivo {
  DISPONIBLE = 'DISPONIBLE',       // En bodega, listo para usar
  ASIGNADO = 'ASIGNADO',           // Lo tiene un empleado
  EN_REPARACION = 'EN_REPARACION', // Mantenimiento
  DE_BAJA = 'DE_BAJA',             // Perdido, robado o vendido
}

@Entity({ name: 'activos' })
@Index(['empresaId'])
// REGLA DE ORO SAAS: El serial es único SOLO dentro de la misma empresa
@Unique(['empresaId', 'serial'])
export class Activo extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre o descripción del activo (Laptop Dell XPS, Silla)',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true, // Algunos activos (sillas) no tienen serial
    comment: 'Número de serial único (si aplica)',
  })
  serial: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Categoría o tipo (Computación, Mobiliario, Vehículo)',
  })
  tipo: string;

  /**
   * Estado actual. Controlado por Enum.
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoActivo.DISPONIBLE,
    comment: 'Estado actual (DISPONIBLE, ASIGNADO...)',
  })
  estado: EstadoActivo;

  /**
   * Valor estimado o costo de compra (Opcional pero útil para inventario)
   */
  @Column({
    type: 'float',
    nullable: true,
    comment: 'Valor monetario del activo',
  })
  valor: number;

  /**
   * Fecha de adquisición
   */
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de compra o adquisición',
  })
  fechaAdquisicion: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Empresa, (empresa) => empresa.activos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ comment: 'ID de la Empresa propietaria' })
  empresaId: string;

  /**
   * Historial de asignaciones.
   */
  @OneToMany(() => ActivoAsignado, (asignacion) => asignacion.activo)
  asignaciones: ActivoAsignado[];
}