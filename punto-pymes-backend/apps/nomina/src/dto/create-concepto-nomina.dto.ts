// apps/nomina/src/dto/create-concepto-nomina.dto.ts
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsEnum,
    IsBoolean,
} from 'class-validator';
import { TipoRubro } from '../../../../libs/database/src/entities/conceptoNomina.entity'; // Importamos el Enum desde la entidad

export class CreateConceptoNominaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string; // Ej: "Salario Base", "Descuento IESS"

    @IsEnum(TipoRubro)
    @IsNotEmpty({ message: 'El tipo (Ingreso/Egreso) es requerido.' })
    tipo: TipoRubro;

    @IsBoolean()
    @IsOptional()
    esFijo?: boolean; // ¿Es un monto fijo o calculado por fórmula?

    @IsString()
    @IsOptional()
    formula?: string; // Ej: "(salario / 30) * dias_trabajados" (para futura implementación)
}