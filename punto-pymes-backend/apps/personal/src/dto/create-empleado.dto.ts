import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateEmpleadoDto {
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es requerido.' })
  @IsString()
  apellido: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email personal no es válido.' })
  emailPersonal?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida.' })
  fechaNacimiento?: string;

  // =================================================================
  // 🚨 CAMBIOS CLAVE PARA LA IMPORTACIÓN MASIVA E INTELIGENCIA ARTIFICIAL
  // =================================================================

  /**
   * MODIFICADO: Ahora es Opcional.
   * Razón: En la importación masiva no tenemos el ID, tenemos el nombre.
   * El servicio se encargará de buscar el ID o crear uno nuevo con IA.
   */
  @IsOptional()
  @IsUUID('4', { message: 'El cargoId debe ser un UUID válido.' })
  cargoId?: string;

  /**
   * ✅ NUEVO CAMPO: Necesario para la IA.
   * Aquí recibiremos "Gerente de Ventas" o "Desarrollador".
   * Si cargoId no viene, el servicio usará este campo para Gemini.
   */
  @IsOptional()
  @IsString()
  cargoNombre?: string;

  /**
   * MODIFICADO: Ahora es Opcional.
   * Razón: El JSON no trae rol. El servicio asignará el "Rol por Defecto" automáticamente.
   */
  @IsOptional()
  @IsUUID('4', { message: 'El rolId debe ser un UUID válido.' })
  rolId?: string;

  // =================================================================

  @IsOptional()
  @IsUUID('4', { message: 'El jefeId debe ser un UUID válido.' })
  jefeId?: string;

  @IsOptional()
  @IsUUID()
  sucursalId?: string;

  // --- DATOS DEL CONTRATO ---

  @IsOptional()
  @IsNumber()
  @Min(0)
  salario?: number;

  @IsOptional()
  @IsString()
  tipoContrato?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsString()
  @IsNotEmpty()
  tipoIdentificacion: string;

  @IsString()
  @IsNotEmpty()
  nroIdentificacion: string;
}