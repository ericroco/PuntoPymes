// apps/personal/src/entities/cargo.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Departamento } from './departamento.entity';
import { Empleado } from './empleado.entity';
// Asegúrate de importar la entidad Empresa si la tienes, o al menos déjala preparada
// import { Empresa } from './empresa.entity'; 

@Entity({ name: 'cargos' })
@Index(['departamentoId'])
@Index(['empresaId']) // Índice para búsquedas rápidas
export class Cargo extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del puesto de trabajo',
  })
  nombre: string;

  // 👇 CORRECCIÓN 1: Agregamos la descripción para que no de error el código
  @Column({
    type: 'text',
    nullable: true,
    comment: 'Descripción de las funciones del cargo',
  })
  descripcion: string;

  @Column({
    type: 'float',
    nullable: true,
    default: 0,
    comment: 'Salario mínimo de la banda salarial',
  })
  salarioMin: number;

  @Column({
    type: 'float',
    nullable: true,
    default: 0,
    comment: 'Salario máximo de la banda salarial',
  })
  salarioMax: number;

  // 👇 CORRECCIÓN 2: Agregamos empresaId pero NULLABLE para no romper datos viejos
  @Column({
    type: 'uuid',
    nullable: true, // 👈 IMPORTANTE: Esto evita que explote con los datos viejos
    comment: 'ID de la empresa (desnormalizado para optimizar)'
  })
  empresaId: string;

  // --------------------------------

  @ManyToOne(() => Departamento, (departamento) => departamento.cargos, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @Column({ comment: 'ID del Departamento padre' })
  departamentoId: string;

  @OneToMany(() => Empleado, (empleado) => empleado.cargo)
  empleados: Empleado[];
}