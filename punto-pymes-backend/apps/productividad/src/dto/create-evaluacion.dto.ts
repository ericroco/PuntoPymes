
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateEvaluacionDto {
    @IsUUID()
    @IsNotEmpty()
    evaluadoId: string; // A quién estamos evaluando

    @IsUUID()
    @IsNotEmpty()
    evaluadorId: string; // Quién realiza la evaluación (Jefe)

    @IsInt()
    @Min(1)
    @Max(9)
    calificacionPotencial: number; // Eje Y de la 9-Box

    @IsInt()
    @Min(1)
    @Max(9)
    calificacionDesempeno: number; // Eje X de la 9-Box

    @IsString()
    @IsOptional()
    feedback?: string;
}