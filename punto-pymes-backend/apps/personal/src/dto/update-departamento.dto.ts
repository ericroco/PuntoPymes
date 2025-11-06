// apps/personal/src/dto/update-departamento.dto.ts
import { IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO para actualizar un Departamento (RF-02)
 */
export class UpdateDepartamentoDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre?: string;
}