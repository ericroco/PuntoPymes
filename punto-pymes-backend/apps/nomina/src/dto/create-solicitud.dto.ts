import { IsDateString, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

// 1. Definimos los tipos posibles para no aceptar cualquier texto
export enum TipoSolicitud {
    VACACIONES = 'VACACIONES',
    CALAMIDAD = 'CALAMIDAD_DOMESTICA',
    SALUD = 'CITA_MEDICA',
    TRAMITE = 'TRAMITE_PERSONAL',
    OTROS = 'OTROS'
}

export class CreateSolicitudDto {
    @IsUUID()
    empleadoId: string;

    // Agregamos el discriminador
    @IsEnum(TipoSolicitud)
    tipo: TipoSolicitud;

    @IsDateString()
    fechaInicio: string;

    @IsDateString()
    fechaFin: string;

    // Reciclamos este campo:
    // En Vacaciones puede ser opcional, pero en Ausencias servirá como "Justificación"
    @IsString()
    @IsOptional()
    comentario?: string;
}