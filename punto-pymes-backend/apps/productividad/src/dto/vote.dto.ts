import { IsUUID, IsNotEmpty } from 'class-validator';

export class VoteDto {
    @IsUUID()
    @IsNotEmpty()
    opcionId: string; // El ID de la opción seleccionada (ej: "Sí", "No")

    // El encuestaId vendrá por la URL (params), no en el body necesariamente,
    // pero lo manejaremos en el controller.
}