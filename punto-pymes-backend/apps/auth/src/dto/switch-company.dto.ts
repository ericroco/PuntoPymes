import { IsNotEmpty, IsUUID } from 'class-validator';

export class SwitchCompanyDto {
    @IsNotEmpty()
    @IsUUID()
    empresaId: string;

    @IsNotEmpty()
    @IsUUID()
    usuarioId: string; // Lo necesitamos para buscar la membresía
}