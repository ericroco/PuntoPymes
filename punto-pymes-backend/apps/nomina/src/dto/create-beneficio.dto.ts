// apps/nomina/src/dto/create-beneficio.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';

// Basado en beneficio.entity.ts
export enum TipoBeneficio {
  MONETARIO = 'Monetario',
  NO_MONETARIO = 'No Monetario',
}

export class CreateBeneficioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  descripcion?: string;

  @IsEnum(TipoBeneficio)
  @IsOptional()
  tipo: TipoBeneficio;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  montoEstimado?: number;
}