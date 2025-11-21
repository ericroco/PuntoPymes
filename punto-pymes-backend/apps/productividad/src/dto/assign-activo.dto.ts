import { IsUUID, IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignActivoDto {
    @IsUUID()
    @IsNotEmpty()
    empleadoId: string; // A quién se le entrega

    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Se entrega con cargador y funda"

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaAsignacion?: Date; // Por si es una carga histórica
}