// rechazar-candidato.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class RechazarCandidatoDto {
    @IsString()
    @IsOptional()
    motivo?: string; // Ej: "No cumple experiencia", "Salario muy alto"
}