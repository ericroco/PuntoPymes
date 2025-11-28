import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsEnum, IsUUID } from 'class-validator';

export enum EstadoTarea {
    PENDIENTE = 'PENDIENTE',
    EN_PROGRESO = 'EN_PROGRESO',
    COMPLETADA = 'COMPLETADA',
}

// 1. AGREGAMOS EL ENUM DE PRIORIDAD AQUÍ
export enum PrioridadTarea {
    BAJA = 'BAJA',
    MEDIA = 'MEDIA',
    ALTA = 'ALTA',
}

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    puntosHistoria?: number;

    @IsEnum(EstadoTarea)
    @IsOptional()
    estado?: EstadoTarea;

    // 2. AGREGAMOS EL CAMPO AL DTO
    @IsEnum(PrioridadTarea)
    @IsOptional() // Es opcional porque si no lo envían, pondremos MEDIA por defecto en el servicio
    prioridad?: PrioridadTarea;

    @IsOptional()
    @IsUUID()
    objetivoId?: string; // <--- AGREGAR ESTO
}