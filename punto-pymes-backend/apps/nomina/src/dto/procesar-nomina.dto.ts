// apps/nomina/src/dto/procesar-nomina.dto.ts
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProcesarNominaDto {
    @IsUUID()
    @IsNotEmpty({ message: 'El ID del período es requerido.' })
    periodoId: string;
}