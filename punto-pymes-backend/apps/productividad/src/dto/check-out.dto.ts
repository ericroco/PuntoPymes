import { IsString, IsOptional } from 'class-validator';

export class CheckOutDto {
    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Salgo a almorzar" o "Fin de jornada"
}