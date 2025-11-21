import { IsUUID, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
// Asegúrate de importar el Enum desde tu entidad o definirlo aquí si prefieres
import { EstadoInscripcion } from 'default/database/entities/inscripcionCurso.entity';

export class CreateInscripcionDto {
    @IsUUID()
    @IsNotEmpty()
    empleadoId: string; // ¿Quién va a tomar el curso?

    @IsEnum(EstadoInscripcion)
    @IsOptional()
    estado?: EstadoInscripcion; // Default: INSCRITO
}