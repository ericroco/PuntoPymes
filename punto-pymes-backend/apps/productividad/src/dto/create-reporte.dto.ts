import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReporteDto {
    @IsString()
    @IsNotEmpty()
    titulo: string; // Ej: "Gastos Viaje Guayaquil"

    @IsString()
    @IsOptional()
    descripcion?: string;
}