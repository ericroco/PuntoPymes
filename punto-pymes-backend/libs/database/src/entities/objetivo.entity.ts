// libs/database/src/entities/objetivo.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CicloEvaluacion } from './cicloEvaluacion.entity';
import { Empleado } from './empleado.entity';
import { Departamento } from './departamento.entity'; // <--- 1. IMPORTAR DEPARTAMENTO

export enum TipoObjetivo {
  PERSONAL = 'PERSONAL',
  DEPARTAMENTO = 'DEPARTAMENTO',
  EMPRESA = 'EMPRESA'
}

@Entity({ name: 'objetivos' })
@Index(['cicloId'])
@Index(['empleadoId'])
@Index(['departamentoId']) // <--- INDEXAR NUEVO CAMPO
export class Objetivo extends BaseEntity {

  @Column({
    type: 'text',
    comment: 'Descripción del objetivo a medir',
  })
  descripcion: string;

  @Column({
    type: 'float',
    default: 0,
    comment: 'Porcentaje de progreso (0-100)',
  })
  progreso: number;

  // 👇 NUEVO: Tipo de Objetivo (Jerarquía)
  @Column({
    type: 'varchar',
    length: 50,
    default: TipoObjetivo.PERSONAL,
    comment: 'Tipo de objetivo (PERSONAL, DEPARTAMENTO, EMPRESA)'
  })
  tipo: TipoObjetivo;

  // --- RELACIONES ---

  @ManyToOne(() => CicloEvaluacion, (ciclo) => ciclo.objetivos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cicloId' })
  ciclo: CicloEvaluacion;

  @Column({ comment: 'ID del Ciclo de Evaluación' })
  cicloId: string;

  // --- DUEÑO DEL OBJETIVO (Puede ser Empleado O Departamento) ---

  // 👇 CAMBIO: Ahora es NULLABLE (Si es meta de depto, no tiene empleado directo)
  @ManyToOne(() => Empleado, (empleado) => empleado.objetivos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleadoId' })
  empleado: Empleado;

  @Column({ nullable: true, comment: 'ID del Empleado (si es personal)' })
  empleadoId: string;

  // 👇 NUEVO: Relación con Departamento
  @ManyToOne(() => Departamento, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @Column({ nullable: true, comment: 'ID del Departamento (si es grupal)' })
  departamentoId: string;

  // --- ALINEACIÓN (Padre - Hijo) ---

  // 👇 NUEVO: Meta Padre ("Esta meta contribuye a...")
  @ManyToOne(() => Objetivo, (obj) => obj.subObjetivos, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'parentObjetivoId' })
  parentObjetivo: Objetivo;

  @Column({ nullable: true, comment: 'ID de la Meta superior a la que contribuye' })
  parentObjetivoId: string;

  // 👇 NUEVO: Sub-Metas ("Metas que contribuyen a esta")
  @OneToMany(() => Objetivo, (obj) => obj.parentObjetivo)
  subObjetivos: Objetivo[];
}