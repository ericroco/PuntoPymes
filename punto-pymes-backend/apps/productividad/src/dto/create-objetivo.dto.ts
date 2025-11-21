import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateObjetivoDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string; // Ej: "Alcanzar 100k en ventas"

    @IsUUID()
    @IsNotEmpty()
    empleadoId: string; // A quién se le asigna este objetivo

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsOptional()
    progreso?: number; // Opcional al crear (default 0)
}