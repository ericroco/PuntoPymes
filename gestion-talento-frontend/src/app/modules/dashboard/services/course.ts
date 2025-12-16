import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
    Course,
    Enrollment,
    CreateCourseDto,
    UpdateCourseDto,
    CreateInscripcionDto,
    UpdateInscripcionDto
} from '../models/course.models'; // Ajusta la ruta a tus interfaces

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private http = inject(HttpClient);
    // Base URL: http://localhost:3000/capacitacion
    private apiUrl = `${environment.apiUrl}/capacitacion`;

    // ==========================================
    //        GESTIÓN DE CURSOS (LMS)
    // ==========================================

    /**
     * Obtener todos los cursos disponibles
     * GET /capacitacion/cursos
     */
    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/cursos`);
    }

    /**
     * Crear un nuevo curso (Solo Admin)
     * POST /capacitacion/cursos
     */
    createCourse(dto: CreateCourseDto): Observable<Course> {
        return this.http.post<Course>(`${this.apiUrl}/cursos`, dto);
    }

    /**
     * Actualizar un curso existente
     * PATCH /capacitacion/cursos/:id
     */
    updateCourse(id: string, dto: UpdateCourseDto): Observable<Course> {
        return this.http.patch<Course>(`${this.apiUrl}/cursos/${id}`, dto);
    }

    /**
     * Eliminar un curso
     * DELETE /capacitacion/cursos/:id
     */
    deleteCourse(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/cursos/${id}`);
    }

    // ==========================================
    //        GESTIÓN DE INSCRIPCIONES
    // ==========================================

    /**
     * Inscribir a un empleado en un curso
     * POST /capacitacion/cursos/:cursoId/inscripciones
     */
    enrollEmployee(cursoId: string, empleadoId: string): Observable<Enrollment> {
        const dto: CreateInscripcionDto = { empleadoId };
        return this.http.post<Enrollment>(
            `${this.apiUrl}/cursos/${cursoId}/inscripciones`,
            dto
        );
    }

    /**
     * Ver alumnos inscritos en un curso (Para el Admin/Instructor)
     * GET /capacitacion/cursos/:cursoId/inscripciones
     */
    getCourseEnrollments(cursoId: string): Observable<Enrollment[]> {
        return this.http.get<Enrollment[]>(
            `${this.apiUrl}/cursos/${cursoId}/inscripciones`
        );
    }

    /**
     * Obtener los cursos donde YO (el empleado) estoy inscrito
     * Nota: Este endpoint no estaba explícito en tu lista, pero lo necesitarás.
     * Usualmente se filtra en el backend o se usa un endpoint tipo:
     * GET /capacitacion/mis-cursos
     */

    /**
     * Actualizar progreso (Ej: Marcar clase como vista)
     * PATCH /capacitacion/inscripciones/:id
     */
    updateProgress(inscripcionId: string, progress: number): Observable<Enrollment> {
        const dto: UpdateInscripcionDto = {
            progreso: progress,
            estado: progress === 100 ? 'Completado' : 'En Progreso'
        };
        return this.http.patch<Enrollment>(
            `${this.apiUrl}/inscripciones/${inscripcionId}`,
            dto
        );
    }

    /**
     * Darse de baja de un curso
     * DELETE /capacitacion/inscripciones/:id
     */
    unenroll(inscripcionId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/inscripciones/${inscripcionId}`);
    }
    getMyEnrollments(empleadoId: string): Observable<any[]> {
        // Ya no necesitamos pasar el empleadoId por parámetro si el backend lo saca del token,
        // pero si tu lógica anterior lo usaba, no estorba.

        // 👇 ESTA ES LA RUTA QUE ACABAMOS DE CREAR
        return this.http.get<any[]>(`${this.apiUrl}/mis-cursos`);
    }
}