// libs/database/src/entities/base.entity.ts
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // --- INICIO DE CAMBIOS ---
  DeleteDateColumn, // 1. Importar DeleteDateColumn
  Index, // 2. Importar Index (buena práctica para columnas de borrado)
  // --- FIN DE CAMBIOS ---
} from 'typeorm';

/**
 * Entidad base abstracta que provee las columnas comunes:
 * ... (las demás)
 * - deletedAt (Fecha de borrado lógico)
 */
export abstract class BaseEntity {
  // ... (id, createdAt, updatedAt - sin cambios)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del registro',
  })
  updatedAt: Date;

  // --- INICIO DE CAMBIOS ---
  /**
   * Fecha de borrado lógico (soft delete)
   * (Ahora sí cumplimos la regla de "ultra completo" de no borrar nada)
   */
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de borrado lógico (soft delete)',
  })
  @Index() // 4. Añadir índice para optimizar consultas que filtran borrados
  deletedAt: Date;
  // --- FIN DE CAMBIOS ---
}