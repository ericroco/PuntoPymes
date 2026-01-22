import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { TipoSolicitud } from 'apps/nomina/src/dto/create-solicitud.dto';

export enum EstadoSolicitud {
    PENDIENTE = 'PENDIENTE',
    APROBADA = 'APROBADA',
    RECHAZADA = 'RECHAZADA',
}

@Entity({ name: 'solicitudes_vacaciones' }) // El nombre se queda igual, no pasa nada
@Index(['empleadoId'])
export class SolicitudVacaciones extends BaseEntity {

    // 👇 AQUÍ ESTÁ EL CAMBIO CLAVE
    @Column({
        type: 'varchar',
        length: 50,
        default: 'VACACIONES' // ¡Importante! Para compatibilidad con datos viejos
    })
    tipo: TipoSolicitud;
    // 👆 FIN DEL CAMBIO

    @Column({ type: 'date', comment: 'Fecha de inicio' })
    fechaInicio: Date;

    @Column({ type: 'date', comment: 'Fecha de fin' })
    fechaFin: Date;

    @Column({ type: 'int', comment: 'Cantidad de días solicitados' })
    diasSolicitados: number;

    @Column({
        type: 'varchar',
        length: 50,
        default: EstadoSolicitud.PENDIENTE
    })
    estado: EstadoSolicitud;

    // Reciclamos este campo:
    // Vacaciones = Comentario opcional
    // Ausencias = Justificación obligatoria
    @Column({ type: 'text', nullable: true, comment: 'Motivo o justificación' })
    comentario: string;

    @Column({ type: 'text', nullable: true, comment: 'Respuesta del aprobador' })
    respuestaAdmin: string;

    // --- RELACIONES ---
    @ManyToOne(() => Empleado, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empleadoId' })
    empleado: Empleado;

    @Column()
    empleadoId: string;

    @Column({ type: 'text', nullable: true })
    comentariosRespuesta: string | null;

    @Column({ type: 'timestamp', nullable: true })
    fechaRespuesta: Date | null;
}