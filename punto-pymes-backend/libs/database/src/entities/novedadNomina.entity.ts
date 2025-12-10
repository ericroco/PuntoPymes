import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { ConceptoNomina } from './conceptoNomina.entity';
import { Empresa } from './empresa.entity';

export enum EstadoNovedad {
    PENDIENTE = 'Pendiente', // Registered but not yet processed in a payroll run
    PROCESADA = 'Procesada', // Included in a payroll run
    CANCELADA = 'Cancelada',
}

@Entity({ name: 'novedades_nomina' })
@Index(['empresaId', 'estado']) // Optimized for finding pending items
export class NovedadNomina extends BaseEntity {

    @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'Monetary value' })
    valor: number;

    @Column({ type: 'date', comment: 'Date of occurrence' })
    fecha: Date;

    @Column({ type: 'text', nullable: true })
    observacion: string;

    @Column({
        type: 'enum',
        enum: EstadoNovedad,
        default: EstadoNovedad.PENDIENTE
    })
    estado: EstadoNovedad;

    // --- RELATIONS ---

    @ManyToOne(() => Empleado, { nullable: false })
    @JoinColumn({ name: 'empleadoId' })
    empleado: Empleado;

    @Column()
    empleadoId: string;

    @ManyToOne(() => ConceptoNomina, { nullable: false })
    @JoinColumn({ name: 'conceptoId' })
    concepto: ConceptoNomina;

    @Column()
    conceptoId: string;

    @ManyToOne(() => Empresa)
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa;

    @Column()
    empresaId: string;
}