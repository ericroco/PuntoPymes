// libs/database/src/entities/departamento.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Cargo } from './cargo.entity';

/**
 * Entidad que representa un Departamento o Área dentro de una Empresa.
 * (Ej: 'Ventas', 'Tecnología', 'Marketing').
 * Agrupa los Cargos/Puestos de trabajo (RF-02).
 * Mapea la tabla 'departamentos'
 */
@Entity({ name: 'departamentos' })
// Indexamos esta columna para búsquedas rápidas de departamentos por empresa
@Index(['empresaId'])
export class Departamento extends BaseEntity {
  /**
   * Nombre del área o departamento
   * Mapea: string nombre "Nombre area departamento"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del área o departamento',
  })
  nombre: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Departamento PERTENECE A...)
  // ---

  /**
   * Relación: Un Departamento pertenece a UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, sus departamentos se borran.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.departamentos, {
    nullable: false, // Un departamento no puede existir sin una empresa
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa propietaria"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) propietaria' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Departamento TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Departamento contiene muchos Cargos.
   * Este es el "otro lado" de la relación que ya definimos en 'cargo.entity.ts'.
   */
  @OneToMany(() => Cargo, (cargo) => cargo.departamento)
  cargos: Cargo[];
  /**
   * Columna para Soft Delete (Borrado Lógico)
   * Esta es la "bandera" que propusiste.
   * Si es NULL, el registro está activo.
   * Si tiene una fecha, el registro está "borrado" y
   * TypeORM lo ocultará automáticamente de todas las
   * consultas 'find()'.
   */
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de borrado lógico (soft delete)',
  })
  deletedAt: Date;
}