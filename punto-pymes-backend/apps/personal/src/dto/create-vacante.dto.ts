import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsNumber,
    Min,
    IsDateString,
    IsUUID,
} from 'class-validator';
// Ajusta la ruta según donde esté tu entidad
import { EstadoVacante } from 'default/database/entities/vacante.entity';

export class CreateVacanteDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsOptional()
    requisitos?: string;

    @IsEnum(EstadoVacante)
    @IsOptional()
    estado?: EstadoVacante; // Default: BORRADOR

    @IsString()
    @IsOptional()
    ubicacion?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    salarioMin?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    salarioMax?: number;

    @IsDateString() // Usamos DateString para recibir 'YYYY-MM-DD'
    @IsOptional()
    fechaCierre?: string; // Lo transformaremos a Date en el servicio si hace falta

    @IsUUID()
    @IsOptional()
    departamentoId?: string; // Para vincularlo a Marketing, TI, etc.
}