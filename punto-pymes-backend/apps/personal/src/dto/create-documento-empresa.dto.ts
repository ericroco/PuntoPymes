import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDocumentoEmpresaDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    url: string; // La URL que te devuelve tu servicio de subida de archivos

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    categoria?: string;

    @IsOptional()
    @IsUUID()
    sucursalId?: string; // Si viene vacío, es Global
}