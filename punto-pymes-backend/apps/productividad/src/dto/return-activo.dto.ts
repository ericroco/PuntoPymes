import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ReturnActivoDto {
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaDevolucion?: Date; // Default: Ahora

    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Pantalla rayada"
}