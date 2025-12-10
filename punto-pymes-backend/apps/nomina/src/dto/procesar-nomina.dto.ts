import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ProcesarNominaDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    periodoId: string; // El ID del período que vamos a calcular (Enero, Febrero, etc.)
}