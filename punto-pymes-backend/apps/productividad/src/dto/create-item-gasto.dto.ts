import { IsString, IsNotEmpty, IsNumber, Min, IsDate, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemGastoDto {
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    concepto: string; // Ej: "Taxi Aeropuerto"

    @IsNumber()
    @Min(0.01)
    monto: number;

    @IsString()
    @IsOptional()
    // @IsUrl() // Descomenta si quieres validar formato URL estricto
    facturaUrl?: string;
}