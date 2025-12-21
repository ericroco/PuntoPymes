// apps/personal/src/dto/create-departamento.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsUUID } from 'class-validator';

/**
 * DTO para crear un nuevo Departamento (RF-02)
 */
export class CreateDepartamentoDto {
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsNotEmpty({ message: 'El estado es requerido.' })
  @IsString()
  @MaxLength(255)
  estado: string;

  // 👇 NUEVO CAMPO PARA SOPORTAR LA SUCURSAL 👇
  @IsOptional() // Es opcional porque puede haber deptos "Globales"
  @IsUUID('4', { message: 'El ID de la sucursal debe ser un UUID válido.' })
  sucursalId?: string;
}