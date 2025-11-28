import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, Min, Max, IsEnum } from 'class-validator';
// Asegúrate de que la ruta al enum sea correcta (ajusta los ../ si hace falta)
import { TipoObjetivo } from '../../../../libs/database/src/entities/objetivo.entity';

export class CreateObjetivoDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // 👇 CAMBIO 1: Ahora es Opcional (para metas de departamento)
    @IsOptional()
    @IsUUID()
    empleadoId?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    progreso?: number;

    // 👇 CAMBIO 2: Nuevos campos agregados
    @IsOptional()
    @IsEnum(TipoObjetivo)
    tipo?: TipoObjetivo; // PERSONAL, DEPARTAMENTO, EMPRESA

    @IsOptional()
    @IsUUID()
    departamentoId?: string;

    @IsOptional()
    @IsUUID()
    parentObjetivoId?: string;
}