import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'La contraseña actual es obligatoria' })
    passwordActual: string;

    @IsString()
    @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
    nuevaPassword: string;
}