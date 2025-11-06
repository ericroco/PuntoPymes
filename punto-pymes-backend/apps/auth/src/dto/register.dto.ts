// apps/auth/src/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para el registro de un nuevo Tenant (Empresa).
 * Define la forma y las reglas de validación para los datos de entrada.
 */
export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre de la empresa no puede estar vacío.' })
  @IsString()
  nombreEmpresa: string;

  @IsNotEmpty({ message: 'Tu nombre no puede estar vacío.' })
  @IsString()
  nombreAdmin: string;
  
  @IsNotEmpty({ message: 'Tu apellido no puede estar vacío.' })
  @IsString()
  apellidoAdmin: string;

  @IsEmail({}, { message: 'El email no es válido.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;
}