export interface Course {
    id: string; // UUID
    title: string;
    description?: string;
    instructor: string;
    duration: string; // Ej: "10h"
    category: string;
    imageUrl?: string;
    isActive: boolean;
    createdAt?: Date;
    // Propiedades virtuales (para el frontend)
    isEnrolled?: boolean;
    progress?: number;
}

export interface Enrollment {
    id: string;
    cursoId: string;
    empleadoId: string;
    fechaInscripcion: Date;
    progreso: number; // 0 - 100
    estado: 'Inscrito' | 'En Progreso' | 'Completado';
    notaFinal?: number;
}

// DTOs para enviar datos
export interface CreateCourseDto {
    titulo: string;       // 👈 Antes era 'title'
    descripcion: string;  // 👈 Antes era 'description'
    instructor: string;
    duration: string;
    category: string;
    imageUrl?: string;
    isActive?: boolean;
}
export interface UpdateCourseDto extends Partial<CreateCourseDto> {
    isActive?: boolean;
}

export interface CreateInscripcionDto {
    empleadoId: string;
}

export interface UpdateInscripcionDto {
    progreso?: number;
    estado?: string;
    notaFinal?: number;
}