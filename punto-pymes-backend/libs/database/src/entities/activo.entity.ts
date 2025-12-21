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
import { Empresa } from './empresa.entity';
import { Sucursal } from './sucursal.entity'; // 👈 1. IMPORTAR SUCURSAL
import { ActivoAsignado } from './activoAsignado.entity';

export enum EstadoActivo {
  DISPONIBLE = 'DISPONIBLE',
  ASIGNADO = 'ASIGNADO',
  EN_REPARACION = 'EN_REPARACION',
  DE_BAJA = 'DE_BAJA',
}

@Entity({ name: 'activos' })
@Index(['empresaId'])
@Index(['sucursalId']) // 👈 2. INDEXAR PARA BÚSQUEDAS RÁPIDAS
@Unique(['empresaId', 'serial'])
export class Activo extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del activo (Laptop Dell XPS)',
  })
  nombre: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción detallada o notas',
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Número de serial único (si aplica)',
  })
  serial: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Categoría (Computación, Mobiliario)',
  })
  tipo: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoActivo.DISPONIBLE,
  })
  estado: EstadoActivo;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Costo de compra',
  })
  valor: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'URL de la foto del activo',
  })
  imageUrl: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  fechaAdquisicion: Date;

  // --- RELACIONES ---

  @ManyToOne(() => Empresa, (empresa) => empresa.activos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column()
  empresaId: string;

  // 👇👇 LO NUEVO: RELACIÓN CON SUCURSAL 👇👇
  @ManyToOne(() => Sucursal, {
    nullable: true, // Puede ser null si el activo está en tránsito o es global
    onDelete: 'SET NULL' // Si borras la sede, el activo queda "huérfano" pero no se borra
  })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursal;

  @Column({ nullable: true })
  sucursalId: string;
  // ------------------------------------------

  @OneToMany(() => ActivoAsignado, (asignacion) => asignacion.activo)
  asignaciones: ActivoAsignado[];
}