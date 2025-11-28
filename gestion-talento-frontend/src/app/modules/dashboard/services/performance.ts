import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Objetivo {
  id: string;
  descripcion: string;
  progreso: number;

  // Nuevos campos que agregamos al backend
  tipo: 'PERSONAL' | 'DEPARTAMENTO' | 'EMPRESA';

  // Relaciones (pueden venir o no, por eso el ?)
  empleadoId?: string;
  empleado?: {
    id: string;
    nombre: string;
    apellido: string;
  };

  departamentoId?: string;
  departamento?: {
    id: string;
    nombre: string;
  };

  cicloId: string;
  createdAt: string;
}

export interface CreateObjetivoDto {
  descripcion: string;
  empleadoId?: string;
  departamentoId?: string; // <--- Agregado
  tipo?: 'PERSONAL' | 'DEPARTAMENTO' | 'EMPRESA'; // <--- Agregado
  progreso?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);
  // URL Base: http://localhost:3000/desempeno
  private baseUrl = `${environment.apiUrl}/desempeno`;

  // 1. Obtener Ciclo Activo
  getActiveCycle(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ciclos/activo`).pipe(
      catchError(err => {
        console.warn('No se encontró ciclo activo', err);
        return of(null);
      })
    );
  }

  // 2. Obtener Objetivos de un Empleado
  // CORRECCIÓN AQUÍ: Usamos la asignación explícita
  getEmployeeGoals(cycleId: string, employeeId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/objetivos`, {
      params: {
        empleadoId: employeeId // <--- AQUÍ ESTABA EL ERROR. La clave es 'empleadoId', el valor es 'employeeId'
      }
    });
  }

  // 3. Crear Objetivo
  createGoal(cycleId: string, data: CreateObjetivoDto): Observable<Objetivo> {
    return this.http.post<Objetivo>(`${this.baseUrl}/ciclos/${cycleId}/objetivos`, data);
  }

  // 4. Actualizar Progreso
  updateGoalProgress(goalId: string, progreso: number): Observable<Objetivo> {
    // Nota: Asegúrate que tu backend tenga este endpoint exacto o usa PATCH /desempeno/objetivos/:id
    return this.http.patch<Objetivo>(`${this.baseUrl}/objetivos/${goalId}`, {
      progreso: progreso
    });
  }
  getDepartmentGoals(cycleId: string, departmentId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/departamentos/${departmentId}/objetivos`);
  }

  getAllGoals(cycleId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/objetivos-globales`);
  }
  deleteGoal(goalId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/objetivos/${goalId}`);
  }
}