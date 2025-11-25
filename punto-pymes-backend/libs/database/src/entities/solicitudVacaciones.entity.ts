import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

export enum EstadoSolicitud {
    PENDIENTE = 'PENDIENTE',
    APROBADA = 'APROBADA',
    RECHAZADA = 'RECHAZADA',
}

@Entity({ name: 'solicitudes_vacaciones' })
@Index(['empleadoId'])
export class SolicitudVacaciones extends BaseEntity {

    @Column({ type: 'date', comment: 'Fecha de inicio de las vacaciones' })
    fechaInicio: Date;

    @Column({ type: 'date', comment: 'Fecha de fin de las vacaciones' })
    fechaFin: Date;

    @Column({ type: 'int', comment: 'Cantidad de días solicitados' })
    diasSolicitados: number;

    @Column({
        type: 'varchar',
        length: 50,
        default: EstadoSolicitud.PENDIENTE
    })
    estado: EstadoSolicitud;

    @Column({ type: 'text', nullable: true, comment: 'Motivo o comentario del empleado' })
    comentario: string;

    @Column({ type: 'text', nullable: true, comment: 'Respuesta del aprobador' })
    respuestaAdmin: string;

    // --- RELACIONES ---
    @ManyToOne(() => Empleado, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empleadoId' })
    empleado: Empleado;

    @Column()
    empleadoId: string;
}