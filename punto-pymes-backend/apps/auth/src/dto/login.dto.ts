// apps/auth/src/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO para el inicio de sesión de un usuario.
 * Define las reglas de validación para los datos de entrada.
 */
export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  password: string;
}