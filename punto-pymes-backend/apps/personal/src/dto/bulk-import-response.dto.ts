// apps/personal/src/dto/bulk-import-response.dto.ts
import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO auxiliar para detallar errores individuales
 */
export class BulkErrorDetailDto {
    @IsString()
    identifier: string; // Ej: "Juan Perez"

    @IsString()
    error: string;      // Ej: "DNI Duplicado"
}

/**
 * DTO de Respuesta para la Importación Masiva
 */
export class BulkImportResponseDto {
    @IsNumber()
    total: number;

    @IsNumber()
    success: number;

    @IsNumber()
    errors: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BulkErrorDetailDto)
    details: BulkErrorDetailDto[];
}