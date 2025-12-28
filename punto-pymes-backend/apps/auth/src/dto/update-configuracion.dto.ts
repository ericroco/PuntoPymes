import {
    IsBoolean, IsEnum, IsNumber, IsOptional,
    IsString, Matches, Min, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

// 1. Validar Módulos (Toggle List)
class ConfigModulosDto {
    @IsOptional() @IsBoolean() reclutamiento?: boolean;
    @IsOptional() @IsBoolean() onboarding?: boolean;      // <--- Agregado
    @IsOptional() @IsBoolean() desempeno?: boolean;       // <--- Agregado
    @IsOptional() @IsBoolean() proyectos?: boolean;       // <--- Agregado
    @IsOptional() @IsBoolean() kpis?: boolean;
    @IsOptional() @IsBoolean() asistencia?: boolean;
    @IsOptional() @IsBoolean() hojasTiempo?: boolean;     // <--- Agregado (Timesheet)
    @IsOptional() @IsBoolean() nomina?: boolean;
    @IsOptional() @IsBoolean() beneficios?: boolean;      // <--- Agregado
    @IsOptional() @IsBoolean() capacitacion?: boolean;    // <--- Agregado
    @IsOptional() @IsBoolean() documentos?: boolean;      // <--- Agregado
    @IsOptional() @IsBoolean() activos?: boolean;         // <--- Agregado
    @IsOptional() @IsBoolean() reportes?: boolean;        // <--- Agregado
    @IsOptional() @IsBoolean() comunicacion?: boolean;    // <--- Agregado
}
// 2. Validar Asistencia (Horarios)
class ConfigAsistenciaDto {
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora debe ser HH:mm' })
    horaEntrada?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora debe ser HH:mm' })
    horaSalida?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    toleranciaRetraso?: number;
}

// 3. Validar Nómina
class ConfigNominaDto {
    @IsOptional()
    @IsEnum(['mensual', 'quincenal', 'semanal'])
    frecuenciaPago?: 'mensual' | 'quincenal' | 'semanal';

    @IsOptional()
    @IsNumber()
    @Min(1)
    multiplicadorHorasExtra?: number;
}

// 4. Validar Vacaciones
class ConfigVacacionesDto {
    @IsOptional() @IsNumber() @Min(0) diasPorAnio?: number;
}

// --- DTO PRINCIPAL QUE RECIBE EL CONTROLLER ---
export class UpdateConfiguracionEmpresaDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ConfigModulosDto)
    modulos?: ConfigModulosDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ConfigAsistenciaDto)
    asistencia?: ConfigAsistenciaDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ConfigNominaDto)
    nomina?: ConfigNominaDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ConfigVacacionesDto)
    vacaciones?: ConfigVacacionesDto;
}