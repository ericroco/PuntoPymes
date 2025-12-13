import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsNumber,
    IsPositive,
    IsEnum,
    IsBoolean,
} from 'class-validator';

import { TipoBeneficio, IndicadorNomina } from 'default/database';

export class CreateBeneficioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    descripcion?: string;

    // Tipo original (Monetario/No Monetario)
    @IsEnum(TipoBeneficio)
    @IsOptional()
    tipo: TipoBeneficio;

    // Indicador (Ingreso/Descuento)
    @IsEnum(IndicadorNomina)
    @IsOptional()
    indicador?: IndicadorNomina;

    // Flag de Recurrencia (Para el Dashboard de Beneficios)
    @IsBoolean()
    @IsOptional()
    esRecurrente?: boolean;

    // 👇 ESTE ES EL QUE FALTABA:
    // Flag de Automatización (Para rubros de ley con porcentaje)
    @IsBoolean()
    @IsOptional()
    esAutomatico?: boolean;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    montoEstimado?: number;
}