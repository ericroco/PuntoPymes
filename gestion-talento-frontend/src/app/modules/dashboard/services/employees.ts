import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BulkImportResponse } from '../models/bulk-import.models';
// DTO para crear (Datos que enviamos)
export interface CreateEmployeeDto {
    nombre: string;
    apellido: string;
    emailPersonal: string;
    nroIdentificacion: string;
    tipoIdentificacion: string;
    telefono: string;
    fechaNacimiento?: string;
    rolId: string;
    cargoId: string;
    jefeId?: string;
    salario?: number;
    tipoContrato?: string;
    fechaInicio?: string;
    fechaFin?: string;
}
export interface OnboardingTask {
    id: string; // Cambiado a string pq UUID
    title: string;
    description: string;
    link?: string;
    isComplete: boolean;
}

export interface DirectorioEmpleado {
    id: string;
    nombre: string;
    apellido: string;
    emailPersonal: string; // 👈 Ajustado a tu entidad
    telefono?: string;
    fotoUrl?: string;
    sucursal?: { nombre: string };
    cargo?: { nombre: string }; // 👈 Ajustado: Cargo en vez de Departamento
}

// Interfaz del Empleado (Datos que recibimos)
export interface Employee {
    id: string;
    nombre: string;
    apellido: string;
    emailPersonal: string;
    nroIdentificacion: string;
    tipoIdentificacion: string;
    telefono?: string;
    estado: string;
    salario?: number;
    tipoContrato?: string;
    fechaInicio?: string;
    fechaFin?: string;
    fotoUrl?: string; // Agregado
    direccion?: string; // Agregado para el perfil
    fechaNacimiento?: string; // Agregado
    cargo?: {
        id: string;
        nombre: string;
        departamento?: { nombre: string }
    };
    rol?: { id: string; nombre: string };
    contratos?: {
        id: string;
        salario: number;
        estado: string; // 'Vigente', 'Finalizado'
        fechaInicio: string;
    }[];
}
export interface EmployeeDocument {
    id?: string;
    name: string;
    type: string;
    origin: string;
    date: Date | string;
    url?: string;
    canDelete: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    private http = inject(HttpClient);

    // ⚠️ URL: Apunta al endpoint base del Gateway
    // Backend: @Controller() -> @Post('empleados')
    private apiUrl = `${environment.apiUrl}/empleados`;

    /**
     * Obtener todos los empleados
     * GET http://localhost:3000/empleados
     */
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiUrl);
    }

    /**
     * Crear un nuevo empleado
     * POST http://localhost:3000/empleados
     */
    createEmployee(data: CreateEmployeeDto): Observable<Employee> {
        return this.http.post<Employee>(this.apiUrl, data);
    }

    /**
     * Actualizar empleado (Para el botón Editar)
     * PATCH http://localhost:3000/empleados/:id
     */
    updateEmployee(id: string, data: Partial<CreateEmployeeDto>): Observable<Employee> {
        return this.http.patch<Employee>(`${this.apiUrl}/${id}`, data);
    }

    /**
     * Desactivar empleado (Para el botón Borrar/Desactivar)
     * DELETE http://localhost:3000/empleados/:id
     */
    deleteEmployee(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
    getEmployeeById(id: string): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiUrl}/${id}`);
    }
    getEmployeeDocuments(id: string): Observable<EmployeeDocument[]> {
        return this.http.get<EmployeeDocument[]>(`${this.apiUrl}/${id}/documentos`);
    }
    uploadDocument(empleadoId: string, file: File, nombre: string, tipo: string): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nombre', nombre);
        formData.append('tipo', tipo);

        return this.http.post(`${this.apiUrl}/${empleadoId}/documentos`, formData);
    }
    uploadProfilePhoto(empleadoId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(`${this.apiUrl}/${empleadoId}/foto`, formData);
    }
    deleteDocument(documentoId: string): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/empleados/documentos/${documentoId}`);
    }

    importBulk(employees: any[]): Observable<BulkImportResponse> {
        // Ajusta la URL a la ruta de tu API Gateway
        return this.http.post<BulkImportResponse>(`${this.apiUrl}/importar-masivo`, { employees });
    }

    getMyOnboardingTasks(): Observable<OnboardingTask[]> {
        // ⚠️ OJO: La ruta debe ser EXACTAMENTE la que definimos en el Gateway
        // Si en el Gateway pusiste 'empleados/me/onboarding', aquí debe ser igual.
        return this.http.get<OnboardingTask[]>(`${this.apiUrl}/me/onboarding`);
    }

    toggleOnboardingTask(taskId: string, isComplete: boolean): Observable<any> {
        return this.http.patch(`${this.apiUrl}/me/onboarding/${taskId}`, { isComplete });
    }

    getDirectory(): Observable<DirectorioEmpleado[]> {
        return this.http.get<DirectorioEmpleado[]>(`${this.apiUrl}/lista-directorio`);
    }
}