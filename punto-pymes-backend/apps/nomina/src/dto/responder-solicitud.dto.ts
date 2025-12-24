import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum EstadoSolicitud {
    PENDIENTE = 'PENDIENTE',
    APROBADA = 'APROBADA',
    RECHAZADA = 'RECHAZADA',
}

export class ResponderSolicitudDto {
    @IsEnum(EstadoSolicitud)
    estado: EstadoSolicitud; // APROBADA o RECHAZADA

    @IsString()
    @IsOptional()
    comentarios?: string; // Ej: "Aprobado, diviértete" o "Rechazado por falta de personal"
}