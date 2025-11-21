import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripcion.dto';
import { IsDate, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInscripcionDto extends PartialType(CreateInscripcionDto) {
    @IsNumber()
    @Min(0)
    @Max(100) // O la escala que usen (ej. 10)
    @IsOptional()
    calificacion?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaCompletado?: Date;
}