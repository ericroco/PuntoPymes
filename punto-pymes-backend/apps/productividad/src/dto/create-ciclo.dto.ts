import { IsString, IsNotEmpty, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoCiclo } from 'default/database/entities/cicloEvaluacion.entity'; // Ajusta import según tu estructura
// O define el enum aquí si prefieres desacoplar:
// export enum EstadoCiclo { ... }

export class CreateCicloDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDate()
    @Type(() => Date)
    fechaInicio: Date;

    @IsDate()
    @Type(() => Date)
    fechaFin: Date;

    @IsEnum(EstadoCiclo)
    @IsOptional()
    estado?: EstadoCiclo;
}