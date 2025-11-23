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

@Entity({ name: 'cargos' })
@Index(['departamentoId'])
export class Cargo extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del puesto de trabajo',
  })
  nombre: string;

  // 👇 AGREGAR ESTAS DOS COLUMNAS 👇

  @Column({
    type: 'float', // Usamos float para permitir centavos si fuera necesario
    nullable: true, // Opcional, por si no se define rango
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