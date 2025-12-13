import {
    IsString,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsEnum,
    IsBoolean,
    IsNumber,   // 👈 Agregado
    IsPositive, // 👈 Agregado
} from 'class-validator';

// Si tu TipoRubro viene de la entidad y solo tiene Ingreso/Egreso, 
// necesitamos extenderlo o validarlo de otra forma porque el frontend manda "Monetario".
// Opción A: Modifica el Enum en la entidad.
// Opción B (Rápida): Definimos los valores permitidos aquí mismo.

export enum TipoRubroExtendido {
    INGRESO = 'Ingreso',
    EGRESO = 'Egreso',
    MONETARIO = 'Monetario',     // Para compatibilidad con tu nuevo frontend
    NO_MONETARIO = 'No Monetario'
}

export enum IndicadorNomina {
    INGRESO = 'Ingreso',
    DESCUENTO = 'Descuento'
}

export class CreateConceptoNominaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    // 👇 CAMBIO 1: Aceptamos 'Monetario'
    @IsEnum(TipoRubroExtendido)
    @IsOptional() // Lo hacemos opcional por si el frontend manda solo 'indicador'
    tipo: TipoRubroExtendido;

    // 👇 CAMBIO 2: Agregamos el campo nuevo de Ingreso/Descuento
    @IsEnum(IndicadorNomina)
    @IsOptional()
    indicador?: IndicadorNomina;

    // 👇 CAMBIO 3: Soportamos el flag nuevo y el viejo
    @IsBoolean()
    @IsOptional()
    esRecurrente?: boolean;

    @IsBoolean()
    @IsOptional()
    esFijo?: boolean; // Mantenemos el viejo por si acaso

    // 👇 CAMBIO 4: Flag para IESS/Aporte Patronal
    @IsBoolean()
    @IsOptional()
    esAutomatico?: boolean;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    descripcion?: string;

    // 👇 CAMBIO 5: Montos y Fórmulas
    @IsNumber()
    @IsPositive()
    @IsOptional()
    montoEstimado?: number;

    @IsString()
    @IsOptional()
    formula?: string; // Mantenemos el viejo por si acaso
}