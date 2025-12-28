import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

@Entity({ name: 'saldos_vacaciones' })
@Index(['empleadoId', 'anio'], { unique: true }) // Un saldo por empleado por año
export class SaldoVacaciones extends BaseEntity {

    @ManyToOne(() => Empleado)
    @JoinColumn({ name: 'empleadoId' })
    empleado: Empleado;

    @Column()
    empleadoId: string;

    @Column({ type: 'int' })
    anio: number; // Ej: 2025

    @Column({ type: 'int', default: 15 }) // Según política de empresa
    diasTotales: number;

    @Column({ type: 'int', default: 0 })
    diasUsados: number;

    // Getter virtual para usar en el frontend fácilmente
    get diasDisponibles(): number {
        return this.diasTotales - this.diasUsados;
    }
}