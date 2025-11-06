// libs/database/src/entities/activo.entity.ts
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
import { ActivoAsignado } from './activoAsignado.entity';

/**
 * Entidad que representa un Activo propiedad de la Empresa (Tenant).
 * (Ej: 'Laptop Dell XPS 15', 'Silla Ergonómica', 'Monitor 4K').
 * Cumple con el módulo de Gestión de Activos (RF-36).
 * Mapea la tabla 'activos'
 */
@Entity({ name: 'activos' })
// Indexamos para buscar activos rápidamente por empresa y por serial
@Index(['empresaId'])
export class Activo extends BaseEntity {
  /**
   * Nombre o descripción del activo
   * Mapea: string nombre "Nombre descripcion activo"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre o descripción del activo (Laptop, Silla)',
  })
  nombre: string;

  /**
   * Número de serial único del activo (si aplica)
   * Mapea: string serial UK "Numero serial unico"
   */
  @Column({
    type: 'varchar',
    length: 255,
    unique: true, // El serial debe ser único en toda la BDD
    nullable: true, // Nulo si el activo no tiene serial (ej. una silla)
    comment: 'Número de serial único (si aplica)',
  })
  @Index() // Indexamos para búsquedas rápidas por serial
  serial: string;

  /**
   * Categoría o tipo de activo
   * Mapea: string tipo "Categoria tipo activo"
   */
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Categoría o tipo de activo (Laptop, Mobiliario, Teléfono)',
  })
  tipo: string;

  /**
   * Estado actual del activo
   * Mapea: string estado "Estado actual activo"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Estado actual del activo (En Bodega, Asignado, De Baja)',
  })
  estado: string;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Activo PERTENECE A...)
  // ---

  /**
   * Relación: Un Activo es propiedad de UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, todos sus
   * activos inventariados se borran con ella.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.activos, {
    nullable: false, // Requerido
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa propietaria activo"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) propietaria del activo' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Activo TIENE MUCHAS...)
  // ---

  /**
   * Relación: Un Activo puede tener muchas Asignaciones (historial).
   * (Ej. una laptop puede ser asignada a Juan, luego devuelta, y
   * luego asignada a María).
   * Este es el "otro lado" de la relación que definiremos en 'ActivoAsignado'.
   */
  @OneToMany(() => ActivoAsignado, (asignacion) => asignacion.activo)
  asignaciones: ActivoAsignado[];
}