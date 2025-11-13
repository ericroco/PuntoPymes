// apps/personal/src/dto/update-cargo.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCargoDto } from './create-cargo.dto';

/**
 * DTO para actualizar un Cargo.
 * Hereda todas las propiedades de CreateCargoDto como opcionales.
 */
export class UpdateCargoDto extends PartialType(CreateCargoDto) {}