import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSprintDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDate()
    @Type(() => Date) // Transforma string "2025-11-18" a objeto Date
    fechaInicio: Date;

    @IsDate()
    @Type(() => Date)
    fechaFin: Date;

    @IsString()
    @IsOptional()
    objetivo?: string;
}