import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EstadoReporte } from 'default/database/entities/reporteGasto.entity';

export class UpdateReporteEstadoDto {
    @IsEnum(EstadoReporte)
    @IsNotEmpty()
    estado: EstadoReporte; // APROBADO, RECHAZADO...

    @IsString()
    @IsOptional()
    comentarios?: string; // Motivo del rechazo
}