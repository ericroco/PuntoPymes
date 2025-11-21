import { IsUUID, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CheckInDto {
    @IsUUID()
    @IsNotEmpty()
    empleadoId: string; // El ID del empleado que ficha

    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Entrando tarde por cita médica"
}