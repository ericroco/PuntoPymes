import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
// Asegúrate de importar el Enum desde tu entidad actualizada
import { EstadoActivo } from 'default/database/entities/activo.entity';

export class CreateActivoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string; // Ej: "MacBook Pro 16"

    @IsString()
    @IsOptional()
    serial?: string; // Ej: "C02..."

    @IsString()
    @IsNotEmpty()
    tipo: string; // Ej: "Laptop", "Monitor"

    @IsEnum(EstadoActivo)
    @IsOptional()
    estado?: EstadoActivo; // Default: DISPONIBLE

    @IsNumber()
    @Min(0)
    @IsOptional()
    valor?: number; // Ej: 2500.00

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaAdquisicion?: Date;
}