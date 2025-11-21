// libs/database/src/entities/cicloEvaluacion.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Objetivo } from './objetivo.entity';
import { Evaluacion } from './evaluacion.entity';

// 1. Agregamos el Enum para controlar el flujo
export enum EstadoCiclo {
  PLANIFICACION = 'PLANIFICACION',
  ACTIVO = 'ACTIVO',
  CERRADO = 'CERRADO',
}

@Entity({ name: 'ciclos_evaluacion' })
@Index(['empresaId'])
export class CicloEvaluacion extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del ciclo (Ej: Evaluación Anual 2025)',
  })
  nombre: string;

  @Column({
    type: 'date',
    comment: 'Fecha de inicio del ciclo',
  })
  fechaInicio: Date;

  @Column({
    type: 'date',
    comment: 'Fecha de fin del ciclo',
  })
  fechaFin: Date;

  // 2. Agregamos la columna de estado (FALTABA ESTO)
  @Column({
    type: 'varchar',
    length: 50,
    default: EstadoCiclo.PLANIFICACION,
    comment: 'Estado del ciclo (PLANIFICACION, ACTIVO, CERRADO)',
  })
  estado: EstadoCiclo;

  // --- RELACIONES ---

  @ManyToOne(() => Empresa, (empresa) => empresa.ciclosEvaluacion, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ comment: 'ID de la Empresa (Tenant) que ejecuta el ciclo' })
  empresaId: string;

  @OneToMany(() => Objetivo, (objetivo) => objetivo.ciclo, { cascade: true })
  objetivos: Objetivo[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.ciclo, {
    cascade: true,
  })
  evaluaciones: Evaluacion[];
}