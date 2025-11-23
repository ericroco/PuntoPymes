import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// --- INTERFACES (Coinciden con el Backend) ---
export interface Department {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface JobPosition { // Cargo
  id: string;
  nombre: string;
  departamentoId: string; // Relación
  departamento?: Department; // Objeto anidado (si el backend lo envía)
  salarioMin?: number; // Backend: salarioMin
  salarioMax?: number; // Backend: salarioMax
}

export interface Role {
  id: string;
  nombre: string;
  permisos?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl; // http://localhost:3000

  // ==========================================
  //              DEPARTAMENTOS
  // ==========================================
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departamentos`);
  }

  createDepartment(data: { nombre: string; descripcion?: string }): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/departamentos`, data);
  }

  updateDepartment(id: string, data: Partial<Department>): Observable<Department> {
    return this.http.patch<Department>(`${this.apiUrl}/departamentos/${id}`, data);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departamentos/${id}`);
  }

  // ==========================================
  //                CARGOS
  // ==========================================
  getJobs(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}/cargos`);
  }

  createJob(data: any): Observable<JobPosition> {
    return this.http.post<JobPosition>(`${this.apiUrl}/cargos`, data);
  }

  updateJob(id: string, data: any): Observable<JobPosition> {
    return this.http.patch<JobPosition>(`${this.apiUrl}/cargos/${id}`, data);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cargos/${id}`);
  }

  // ==========================================
  //                 ROLES
  // ==========================================
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  createRole(data: { nombre: string; permisos?: any }): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, data);
  }

  updateRole(id: string, data: Partial<Role>): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/roles/${id}`, data);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${id}`);
  }
}