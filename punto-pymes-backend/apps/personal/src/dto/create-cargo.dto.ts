// apps/personal/src/dto/create-cargo.dto.ts
import { IsNotEmpty, IsString, IsUUID, MaxLength, IsOptional, IsNumber, Min } from 'class-validator';

/**
 * DTO para crear un nuevo Cargo (RF-02)
 */
export class CreateCargoDto {
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString()
  @MaxLength(255)
  nombre: string;

  /**
   * ID del Departamento al que pertenecerá este cargo.
   */
  @IsNotEmpty({ message: 'El departamento es requerido.' })
  @IsUUID()
  departamentoId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salarioMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salarioMax?: number;
}