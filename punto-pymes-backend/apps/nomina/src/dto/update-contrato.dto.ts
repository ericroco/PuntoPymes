// apps/nomina/src/dto/update-contrato.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateContratoDto } from './create-contrato.dto';

// No permitimos cambiar el 'empleadoId' de un contrato
export class UpdateContratoDto extends PartialType(CreateContratoDto) {
  empleadoId?: never; // <-- "ultra completo": Prohibimos cambiar el empleado
}