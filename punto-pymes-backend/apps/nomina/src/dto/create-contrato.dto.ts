// apps/nomina/src/dto/create-contrato.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    IsNumber,
    IsPositive,
    IsDateString,
    IsEnum,
} from 'class-validator';

// Asumimos estos 'enums' basados en tu entidad Contrato 
export enum TipoContrato {
    INDEFINIDO = 'Indefinido',
    PLAZO_FIJO = 'Plazo Fijo',
    SERVICIOS = 'Servicios',
    OBRA_LABOR = 'Obra Labor',
}

export enum EstadoContrato {
    VIGENTE = 'Vigente',
    FINALIZADO = 'Finalizado',
    PENDIENTE = 'Pendiente',
}

export class CreateContratoDto {
    @IsNotEmpty({ message: 'El ID del empleado es requerido.' })
    @IsUUID()
    empleadoId: string;

    @IsNotEmpty({ message: 'El tipo de contrato es requerido.' })
    @IsEnum(TipoContrato)
    tipo: TipoContrato;

    @IsNumber({}, { message: 'El salario debe ser un número.' })
    @IsPositive({ message: 'El salario debe ser un número positivo.' })
    salario: number;

    @IsString()
    @IsNotEmpty()
    moneda: string; // Ej. 'USD', 'EUR'

    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida.' })
    fechaInicio: Date;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida.' })
    fechaFin?: Date;

    @IsOptional()
    @IsEnum(EstadoContrato)
    estado?: EstadoContrato; // Por defecto lo pondremos 'Vigente' en el servicio
}