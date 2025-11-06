// libs/database/src/entities/base.entity.ts
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entidad base abstracta que provee las columnas comunes:
 * - id (UUID)
 * - createdAt (Fecha de creación)
 * - updatedAt (Fecha de última actualización)
 */
export abstract class BaseEntity {
  /**
   * Identificador único (UUID)
   * Mapea: string id PK "UUID"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Fecha de creación del registro
   * Mapea: datetime createdAt "..."
   */
  @CreateDateColumn({
    type: 'timestamptz', // 'timestamptz' guarda la zona horaria (mejor práctica)
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createdAt: Date;

  /**
   * Fecha de última actualización del registro
   * (Mejora "ultra-completa", no está en el diagrama pero es vital)
   */
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del registro',
  })
  updatedAt: Date;
}