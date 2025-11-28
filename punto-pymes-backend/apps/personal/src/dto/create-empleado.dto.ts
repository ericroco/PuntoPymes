import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsNumber,
  Min,// <--- 1. HABILITADO (Antes estaba comentado o faltaba)
} from 'class-validator';

/**
 * DTO para crear un nuevo Empleado (RF-01-01)
 * Define las reglas de validación para los datos de entrada de la *persona*.
 */
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

  // --- NUEVOS CAMPOS AGREGADOS ---

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD).' })
  fechaNacimiento?: string;

  // --------------------------------

  /**
   * El ID del Cargo (puesto) que ocupará.
   */
  @IsNotEmpty({ message: 'El cargo es requerido.' })
  @IsUUID('4', { message: 'El cargoId debe ser un UUID válido.' })
  cargoId: string;

  /**
   * El ID del Rol (permisos) que tendrá.
   */
  @IsNotEmpty({ message: 'El rol es requerido.' })
  @IsUUID('4', { message: 'El rolId debe ser un UUID válido.' })
  rolId: string;

  /**
   * (Opcional) ID del Empleado que será su jefe.
   */
  @IsOptional()
  @IsUUID('4', { message: 'El jefeId debe ser un UUID válido.' })
  jefeId?: string;

  @IsOptional() // Opcional porque el Admin Local no necesita enviarlo (se infiere)
  @IsUUID()
  sucursalId?: string;
  // 👇 AGREGAR ESTOS CAMPOS NUEVOS PARA EL CONTRATO 👇

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
}
