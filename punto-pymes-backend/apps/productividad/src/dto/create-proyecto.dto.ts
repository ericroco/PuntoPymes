// apps/productividad/src/dto/create-proyecto.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsUUID,
    IsDateString,
    IsEnum,
} from 'class-validator';

// Basado en proyecto.entity.ts
export enum EstadoProyecto {
    ACTIVO = 'Activo',
    PAUSADO = 'Pausado',
    COMPLETADO = 'Completado',
}

export class CreateProyectoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsUUID()
    @IsOptional()
    liderId?: string; // ID de un Empleado

    @IsDateString()
    @IsOptional()
    fechaInicio?: Date;

    @IsDateString()
    @IsOptional()
    fechaFin?: Date;

    @IsEnum(EstadoProyecto)
    @IsOptional()
    estado?: EstadoProyecto;
}