import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BulkImportResponse } from '../models/bulk-import.models';
import { map } from 'rxjs';
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

interface Manager {
    id: string;
    nombre: string;
    apellido: string;
    cargo?: { nombre: string }; // Opcional, para mostrar el cargo en la lista
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

export interface OrganigramaNodo {
    id: string;
    nombre: string;
    apellido: string;
    fotoUrl?: string;
    jefeId?: string | null; // Puede ser null si es el CEO/Dueño
    cargo?: {
        nombre: string;
    };
    // Campos opcionales que usaremos más adelante para la lógica visual
    children?: OrganigramaNodo[];
    cssClass?: string;
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

    getOrganigramaTree() {
        return this.http.get<OrganigramaNodo[]>(`${this.apiUrl}/organigrama`)
            .pipe(
                // Usamos el operador map de RXJS para transformar la respuesta antes de que llegue al componente
                map(flatData => this.buildTree(flatData))
            );
    }


    // --- LÓGICA DE TRANSFORMACIÓN (Algoritmo de 2 Pasos) ---
    private buildTree(employees: OrganigramaNodo[]): OrganigramaNodo[] {
        const nodeMap = new Map<string, OrganigramaNodo>();
        const roots: OrganigramaNodo[] = [];

        // PASO A: Crear un mapa de acceso rápido y preparar el campo 'children'
        employees.forEach(emp => {
            // Creamos una copia para no mutar el original y añadimos children vacío
            nodeMap.set(emp.id, { ...emp, children: [] });
        });

        // PASO B: Conectar a los hijos con sus padres
        nodeMap.forEach(node => {
            // Si tiene jefe Y el jefe existe en el mapa...
            if (node.jefeId && nodeMap.has(node.jefeId)) {
                const parent = nodeMap.get(node.jefeId);
                // ...lo empujamos al array de hijos del jefe
                parent!.children!.push(node);
            } else {
                // Si no tiene jefe (o el jefe no está activo), es una RAIZ (CEO)
                roots.push(node);
            }
        });

        return roots; // Devolvemos solo los nodos principales (que ya contienen a todos los demás dentro)
    }
}