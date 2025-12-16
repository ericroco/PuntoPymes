import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    titulo: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    descripcion: string;

    @IsString()
    @IsNotEmpty({ message: 'La duración es obligatoria' })
    duration: string; // Coincide con el frontend

    @IsString()
    @IsNotEmpty({ message: 'El instructor es obligatorio' })
    instructor: string;

    @IsString()
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    category: string;

    @IsString()
    @IsOptional()
    // @IsUrl() // Descomenta si quieres validar que sea URL real
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}