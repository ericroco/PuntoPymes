// apps/nomina/src/dto/create-periodo-nomina.dto.ts
import {
    // IsString, // <-- Ya no se necesita
    // IsNotEmpty, // <-- Ya no se necesita
    IsDateString,
    IsEnum,
    IsOptional,
} from 'class-validator';

// ... (El enum EstadoPeriodo sigue igual)
export enum EstadoPeriodo {
    ABIERTO = 'Abierto',
    CERRADO = 'Cerrado',
    PROCESADO = 'Procesado',
}

export class CreatePeriodoNominaDto {
    // Se elimina el campo 'nombre'

    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida.' })
    fechaInicio: Date;

    @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida.' })
    fechaFin: Date;

    @IsEnum(EstadoPeriodo)
    @IsOptional()
    estado?: EstadoPeriodo;
}