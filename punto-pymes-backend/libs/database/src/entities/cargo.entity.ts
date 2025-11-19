// libs/database/src/entities/cargo.entity.ts
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
import { Departamento } from './departamento.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa un Cargo o Puesto de trabajo.
 * (Ej: 'Desarrollador Backend Sr.', 'Representante de Ventas').
 * Es el eslabón entre un Departamento y un Empleado.
 * Mapea la tabla 'cargos'
 */
@Entity({ name: 'cargos' })
// Indexamos esta columna para búsquedas rápidas de cargos por departamento
@Index(['departamentoId'])
export class Cargo extends BaseEntity {
  /**
   * Nombre del puesto de trabajo
   * Mapea: string nombre "Nombre puesto trabajo"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del puesto de trabajo',
  })
  nombre: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Cargo PERTENECE A...)
  // ---

  /**
   * Relación: Un Cargo pertenece a UN Departamento.
   * onDelete: 'RESTRICT' = Buena práctica. No se puede borrar un
   * Departamento si todavía tiene Cargos asignados.
   * Esto fuerza a reasignar/borrar cargos antes de borrar un depto.
   */
  @ManyToOne(() => Departamento, (departamento) => departamento.cargos, {
    nullable: false, // Un cargo debe tener un departamento
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'departamentoId' }) // Define el nombre de la columna FK
  departamento: Departamento;

  /**
   * Mapea: string departamentoId FK "Departamento padre"
   */
  @Column({ comment: 'ID del Departamento padre' })
  departamentoId: string;

  /**
   * Columna para Soft Delete (Borrado Lógico)
   * Si es NULL, el cargo está activo.
   * Si tiene fecha, está "borrado" y se ocultará.
   */
  // ---
  // RELACIONES "UNO A MUCHOS" (Un Cargo TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Cargo puede ser ocupado por muchos Empleados.
   * Este es el "otro lado" de la relación definida en 'empleado.entity.ts'.
   */
  @OneToMany(() => Empleado, (empleado) => empleado.cargo)
  empleados: Empleado[];
}