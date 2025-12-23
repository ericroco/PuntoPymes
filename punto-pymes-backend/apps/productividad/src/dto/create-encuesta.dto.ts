import { IsString, IsNotEmpty, IsArray, IsDateString, IsBoolean, IsOptional, IsUUID, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class OpcionDto {
    @IsString() @IsNotEmpty()
    texto: string;
}

export class CreateEncuestaDto {
    @IsString() @IsNotEmpty()
    titulo: string;

    @IsString() @IsOptional()
    descripcion?: string;

    @IsDateString()
    fechaFin: string;

    @IsBoolean() @IsOptional()
    esAnonima?: boolean;

    @IsUUID() @IsOptional()
    sucursalId?: string;

    @IsArray()
    @ArrayMinSize(2, { message: 'La encuesta debe tener al menos 2 opciones' })
    @ValidateNested({ each: true })
    @Type(() => OpcionDto)
    opciones: OpcionDto[];
}