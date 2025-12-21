import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSucursalDto {
    @IsNotEmpty({ message: 'El nombre de la sucursal es obligatorio.' })
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    jefeId?: string;
}