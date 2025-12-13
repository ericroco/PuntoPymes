import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { BeneficioAsignado } from './beneficioAsignado.entity';

// Mantenemos tu Enum original si lo usas para reportes de RRHH
export enum TipoBeneficio {
  MONETARIO = 'Monetario',
  NO_MONETARIO = 'No Monetario',
}

// NUEVO: Necesario para cálculos de nómina
export enum IndicadorNomina {
  INGRESO = 'Ingreso',       // Suma (Bonos)
  DESCUENTO = 'Descuento',   // Resta (Seguros, Préstamos)
  INFORMATIVO = 'Informativo' // No afecta el neto (Ej: Gym pagado por empresa)
}

@Entity({ name: 'beneficios' })
@Index(['empresaId'])
export class Beneficio extends BaseEntity {

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  // Tu campo original (lo mantenemos)
  @Column({
    type: 'enum',
    enum: TipoBeneficio,
    default: TipoBeneficio.MONETARIO
  })
  tipo: TipoBeneficio;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Si es true, se aplica a TODOS automáticamente (Ej: IESS)'
  })
  esAutomatico: boolean; // 👈 NUEVO FLAG

  @Column({
    type: 'decimal',
    nullable: true,
    comment: 'Porcentaje a calcular sobre el sueldo (Ej: 0.0945 para 9.45%)'
  })
  porcentajeCalculo: number; // 👈 Para guardar el 11.15% o 9.45%

  // 👇 NUEVO: Vital para saber si la barra es Verde o Naranja
  @Column({
    type: 'enum',
    enum: IndicadorNomina,
    default: IndicadorNomina.INGRESO
  })
  indicador: IndicadorNomina;

  // 👇 NUEVO: Vital para el Dashboard de recurrentes
  @Column({ type: 'boolean', default: false })
  esRecurrente: boolean;

  // Tu campo de monto (lo mapeamos a la entidad)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  montoEstimado: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.beneficios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column()
  empresaId: string;

  @OneToMany(() => BeneficioAsignado, (ba) => ba.beneficio)
  asignaciones: BeneficioAsignado[];
}