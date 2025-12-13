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

@Entity({ name: 'conceptos_nomina' })
@Index(['empresaId', 'tipo'])
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
        comment: 'Indica si es un monto fijo o recurrente (Legacy/Compatibilidad)',
    })
    esFijo: boolean;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: 'Fórmula para el cálculo (ej. "(salario / 30) * dias_trabajados")',
    })
    formula: string;

    // 👇 CAMPOS NUEVOS AGREGADOS (CRÍTICOS PARA LA NUEVA LÓGICA) 👇

    /**
     * Define si este concepto se aplica a TODOS automáticamente.
     * Ejemplo: Aporte IESS, Impuesto a la Renta.
     */
    @Column({
        type: 'boolean',
        default: false,
        comment: 'Si es true, el motor de nómina lo calcula para todos sin asignación manual'
    })
    esAutomatico: boolean;

    /**
     * Guarda el valor numérico base.
     * Si es automático, aquí va el porcentaje (ej: 0.0945).
     * Si es una novedad fija, aquí va el monto (ej: 50.00).
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 4, // Scale 4 para permitir porcentajes precisos (ej: 0.1115)
        nullable: true,
        comment: 'Valor numérico base o porcentaje'
    })
    montoEstimado: number;

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