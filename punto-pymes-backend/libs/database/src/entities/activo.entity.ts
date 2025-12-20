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
import { ActivoAsignado } from './activoAsignado.entity'; // Descomenta cuando exista

export enum EstadoActivo {
  DISPONIBLE = 'DISPONIBLE',
  ASIGNADO = 'ASIGNADO',
  EN_REPARACION = 'EN_REPARACION',
  DE_BAJA = 'DE_BAJA',
}

@Entity({ name: 'activos' })
@Index(['empresaId'])
@Unique(['empresaId', 'serial']) // Ojo: Postgres permite múltiples NULLs, así que está bien para activos sin serial
export class Activo extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del activo (Laptop Dell XPS)',
  })
  nombre: string;

  // 👇 Agregado para que puedas poner notas largas en el frontend
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

  // 👇 Agregado para que se vea bonito en el catálogo
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


  @OneToMany(() => ActivoAsignado, (asignacion) => asignacion.activo)
  asignaciones: ActivoAsignado[];

}