import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { PrioridadAnuncio } from 'default/database/entities/anuncio.entity';

export class CreateAnuncioDto {
    @IsString() @IsNotEmpty()
    titulo: string;

    @IsString() @IsNotEmpty()
    contenido: string;

    @IsEnum(PrioridadAnuncio) @IsOptional()
    prioridad?: PrioridadAnuncio;

    @IsDateString() @IsOptional()
    fechaExpiracion?: string;

    @IsUUID() @IsOptional()
    sucursalId?: string; // Si no lo mandan, asumimos que es GLOBAL
}