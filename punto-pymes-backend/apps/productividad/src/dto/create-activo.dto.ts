import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, IsDateString } from 'class-validator';
// ❌ Ya NO necesitas Type de class-transformer
import { EstadoActivo } from 'default/database/entities/activo.entity';

export class CreateActivoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    serial?: string;

    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsEnum(EstadoActivo)
    @IsOptional()
    estado?: EstadoActivo;

    @IsNumber()
    @Min(0)
    @IsOptional()
    valor?: number;

    // ✅ CAMBIO AQUÍ - Acepta string en formato ISO
    @IsDateString()  // ← Cambiado de @IsDate()
    @IsOptional()
    fechaAdquisicion?: string; // ← Cambiado de Date a string

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}