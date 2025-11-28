import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// DTO para crear (Datos que enviamos)
export interface CreateEmployeeDto {
    nombre: string;
    apellido: string;
    emailPersonal: string;
    telefono: string;
    fechaNacimiento?: string; // YYYY-MM-DD
    rolId: string;   // UUID
    cargoId: string; // UUID
    jefeId?: string; // UUID
    salario?: number;
    tipoContrato?: string;
    fechaInicio?: string;
    fechaFin?: string;
}

// Interfaz del Empleado (Datos que recibimos)
export interface Employee {
    id: string;
    nombre: string;
    apellido: string;
    emailPersonal: string;
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
}