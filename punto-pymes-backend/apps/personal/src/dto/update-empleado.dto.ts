import { PartialType } from '@nestjs/mapped-types'; // 👈 Importante
import { CreateEmpleadoDto } from './create-empleado.dto';
import { IsOptional, IsString } from 'class-validator';

/**
 * UpdateEmpleadoDto extiende de CreateEmpleadoDto.
 * PartialType hace que:
 * 1. Heredes AUTOMÁTICAMENTE: telefono, sucursalId, salario, etc.
 * 2. Todos los campos heredados se vuelvan @IsOptional().
 */
export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {

  // Aquí solo agregamos campos que NO existen en la creación, como 'estado'
  @IsOptional()
  @IsString()
  estado?: string;

  // Nota: Si en Create se llama 'fechaInicio' y aquí querías 'fechaContratacion',
  // PartialType usará 'fechaInicio'. Asegúrate de que el frontend envíe el nombre correcto.
}