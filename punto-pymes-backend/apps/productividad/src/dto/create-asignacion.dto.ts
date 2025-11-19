import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsignacionDto {
    @IsString()
    @IsNotEmpty()
    empleadoId: string; // El ID del empleado a quien asignas la tarea

    @IsString()
    @IsOptional()
    observaciones?: string; // Ej: "Encargado del diseño frontend"
}