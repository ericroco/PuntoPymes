import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsInt()
    @Min(1)
    @IsOptional() // Puede ser opcional si es un curso de lectura rápida, etc.
    duracionHoras?: number;
}