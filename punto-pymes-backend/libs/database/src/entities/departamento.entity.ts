import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  // DeleteDateColumn, // Si usas soft delete, descomenta esto
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Cargo } from './cargo.entity';
import { Sucursal } from './sucursal.entity'; // 👈 1. IMPORTA LA SUCURSAL

@Entity({ name: 'departamentos' })
@Index(['empresaId'])
@Index(['sucursalId']) // 👈 2. INDEXA SUCURSAL PARA BÚSQUEDAS RÁPIDAS
export class Departamento extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del área o departamento',
  })
  nombre: string;

  // ---
  // RELACIONES "MUCHOS A UNO"
  // ---

  @ManyToOne(() => Empresa, (empresa) => empresa.departamentos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ comment: 'ID de la Empresa (Tenant) propietaria' })
  empresaId: string;

  // 👇👇 LO NUEVO: RELACIÓN CON SUCURSAL 👇👇

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.departamentos, {
    nullable: true, // ⚠️ IMPORTANTE: Ponlo true al principio para no romper datos viejos
    onDelete: 'RESTRICT', // No borres la sucursal si tiene departamentos
  })
  @JoinColumn({ name: 'sucursalId' })
  sucursal: Sucursal;

  @Column({
    type: 'uuid',
    nullable: true, // Debe coincidir con la relación
    comment: 'ID de la Sucursal a la que pertenece'
  })
  sucursalId: string;

  // ------------------------------------------

  // ---
  // RELACIONES "UNO A MUCHOS"
  // ---

  @OneToMany(() => Cargo, (cargo) => cargo.departamento)
  cargos: Cargo[];
}