// apps/personal/src/dto/create-departamento.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * DTO para crear un nuevo Departamento (RF-02)
 */
export class CreateDepartamentoDto {
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString()
  @MaxLength(255)
  nombre: string;
}