import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsBoolean,
    IsArray, // 👈 Importa esto
} from 'class-validator';

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    descripcion?: string;

    // 👇 CAMBIO IMPORTANTE: Ahora aceptamos Arrays de Strings
    @IsArray()
    @IsString({ each: true }) // Valida que cada item del array sea string
    @IsOptional()
    permisos?: string[];

    @IsBoolean()
    @IsOptional()
    esDefecto?: boolean;
}