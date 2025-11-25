import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSolicitudDto {
    @IsUUID()
    empleadoId: string; // Quién solicita

    @IsDateString()
    fechaInicio: string;

    @IsDateString()
    fechaFin: string;

    @IsString()
    @IsOptional()
    comentario?: string;
}