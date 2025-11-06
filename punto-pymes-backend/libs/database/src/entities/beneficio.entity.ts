// libs/database/src/entities/beneficio.entity.ts
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
import { BeneficioAsignado } from './beneficioAsignado.entity';

/**
 * Entidad que representa un Beneficio (Ej: Seguro Médico, Vales de comida).
 * Es un "catálogo" de beneficios que una Empresa (Tenant) ofrece.
 * Mapea la tabla 'beneficios'
 */
@Entity({ name: 'beneficios' })
// Indexamos para buscar beneficios rápidamente por empresa
@Index(['empresaId'])
export class Beneficio extends BaseEntity {
  /**
   * Nombre del beneficio
   * Mapea: string nombre "Nombre beneficio"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre del beneficio (Ej: Seguro Médico)',
  })
  nombre: string;

  /**
   * Descripción detallada del beneficio
   * Mapea: string descripcion "Descripcion detallada"
   */
  @Column({
    type: 'text',
    comment: 'Descripción detallada del beneficio',
  })
  descripcion: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Beneficio PERTENECE A...)
  // ---

  /**
   * Relación: Un Beneficio es provisto por UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, su catálogo
   * de beneficios también se borra.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.beneficios, {
    nullable: false, // Un beneficio debe pertenecer a una empresa
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa ofrece beneficio"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) que ofrece este beneficio' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Beneficio TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Beneficio puede tener muchas Asignaciones.
   * (Múltiples empleados pueden tener este beneficio).
   */
  @OneToMany(
    () => BeneficioAsignado,
    (beneficioAsignado) => beneficioAsignado.beneficio,
  )
  asignaciones: BeneficioAsignado[];
}