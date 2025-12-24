// create-item-gasto.dto.ts
import { IsString, IsNotEmpty, IsNumber, Min, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemGastoDto {
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    concepto: string;

    @IsNumber()
    @Min(0.01)
    monto: number;

    // --- AGREGAR ESTO ---
    @IsString()
    @IsNotEmpty()
    categoria: string;
    // --------------------

    @IsString()
    @IsOptional()
    facturaUrl?: string;
}