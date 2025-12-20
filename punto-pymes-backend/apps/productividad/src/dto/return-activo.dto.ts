import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoActivo } from 'default/database';

export class ReturnActivoDto {
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaDevolucion?: Date; // Default: Ahora

    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Pantalla rayada"

    @IsString()
    @IsOptional()
    estado?: EstadoActivo; // Ej: "DANADO"
}