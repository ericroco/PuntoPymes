// apps/personal/src/dto/create-rol.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsObject,
    MaxLength,
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

    /**
     * Objeto JSON para almacenar permisos.
     * (RF-29: Asignar Permisos)
     * Ejemplo: { "empleados": { "read": true, "create": false } }
     */
    @IsObject()
    @IsOptional()
    permisos?: any;
}