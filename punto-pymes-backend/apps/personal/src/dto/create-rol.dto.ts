// apps/personal/src/dto/create-rol.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsObject,
    MaxLength,
    IsBoolean,
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

    @IsObject()
    @IsOptional()
    permisos?: any;

    @IsBoolean()
    @IsOptional()
    esDefecto?: boolean;
}