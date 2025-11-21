import { IsString, IsNotEmpty, IsEmail, IsUUID, IsUrl, IsOptional } from 'class-validator';

export class CreateCandidatoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    // @IsUrl() // Descomenta si quieres validar formato URL estricto
    @IsNotEmpty()
    cvUrl: string; // Este URL viene del endpoint de carga de archivos que ya hicimos

    @IsUUID()
    @IsNotEmpty()
    vacanteId: string;
}