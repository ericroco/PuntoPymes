// apps/personal/src/dto/create-empleado.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  // IsDateString ya no es necesario aquí
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

  // --- INICIO DEL CAMBIO ---
  /*
   * Se elimina 'fechaContratacion'. 
   * Esta lógica ahora vivirá en un DTO separado (ej. CreateContratoDto)
   * que se usará para crear la entidad 'Contrato'.
   */
  // --- FIN DEL CAMBIO ---

  /**
   * El ID del Cargo (puesto) que ocupará.
   * (Ej: 'Desarrollador Backend Sr.')
   */
  @IsNotEmpty({ message: 'El cargo es requerido.' })
  @IsUUID()
  cargoId: string;

  /**
   * El ID del Rol (permisos) que tendrá.
   * (Ej: 'Empleado', 'Manager')
   */
  @IsNotEmpty({ message: 'El rol es requerido.' })
  @IsUUID()
  rolId: string;

  /**
   * (Opcional) ID del Empleado que será su jefe.
   */
  @IsOptional()
  @IsUUID()
  jefeId?: string;
}