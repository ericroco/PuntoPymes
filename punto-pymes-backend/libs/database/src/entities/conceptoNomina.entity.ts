// libs/database/src/entities/conceptoNomina.entity.ts
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';

export enum TipoRubro {
    INGRESO = 'Ingreso',
    EGRESO = 'Egreso',
}

/**
 * Entidad que representa una PLANTILLA o TIPO de rubro de nómina.
 * (Ej: 'Salario Base', 'Horas Extra', 'Aporte IESS', 'Préstamo')
 * Esta es la plantilla que el admin configura (Multi-Tenant).
 *
 * NO confundir con RubroNomina, 
 * que es la línea de detalle (el valor calculado) en un pago.
 * Mapea la tabla 'conceptos_nomina'
 */
@Entity({ name: 'conceptos_nomina' })
@Index(['empresaId', 'tipo']) // Para buscar rápido los conceptos de una empresa
export class ConceptoNomina extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del concepto (Salario Base, Aporte IESS)',
    })
    nombre: string;

    @Column({
        type: 'enum',
        enum: TipoRubro,
        comment: 'Tipo de rubro (Ingreso, Egreso)',
    })
    tipo: TipoRubro;

    @Column({
        type: 'boolean',
        default: false,
        comment: 'Indica si es un monto fijo o calculado por fórmula',
    })
    esFijo: boolean;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: 'Fórmula para el cálculo (ej. "(salario / 30) * dias_trabajados")',
    })
    formula: string;

    // ---
    // RELACIONES (Multi-Tenant RNF20)
    // ---

    @ManyToOne(() => Empresa, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa;

    @Column({ comment: 'ID de la Empresa (Tenant) a la que pertenece' })
    empresaId: string;
}