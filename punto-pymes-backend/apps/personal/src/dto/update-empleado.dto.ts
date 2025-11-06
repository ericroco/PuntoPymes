// apps/personal/src/dto/update-empleado.dto.ts
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';

/**
 * DTO para actualizar un Empleado (RF-01-03)
 * Todas las propiedades son opcionales para permitir PATCH.
 */
export class UpdateEmpleadoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email personal no es válido.' })
  emailPersonal?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de contratación debe ser una fecha válida.'})
  fechaContratacion?: Date;

  @IsOptional()
  @IsUUID()
  cargoId?: string;

  @IsOptional()
  @IsUUID()
  rolId?: string;

  @IsOptional()
  @IsUUID()
  jefeId?: string;

  @IsOptional()
  @IsString()
  estado?: string; // Para desactivar (RF-01-04)
}