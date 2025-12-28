import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// --- INTERFACES DE OBJETIVOS (EXISTENTES) ---
export interface Objetivo {
  id: string;
  descripcion: string;
  progreso: number;
  tipo: 'PERSONAL' | 'DEPARTAMENTO' | 'EMPRESA';
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
  departamentoId?: string;
  tipo?: 'PERSONAL' | 'DEPARTAMENTO' | 'EMPRESA';
  progreso?: number;
}

// 👇 NUEVAS INTERFACES PARA CICLOS
export interface CicloEvaluacion {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'ACTIVO' | 'CERRADO' | 'PLANIFICADO'; // Ajusta según tus enums del backend
}

export interface CreateCicloDto {
  nombre: string;
  fechaInicio: Date | string; // Aceptamos Date para facilitar el uso con Datepicker
  fechaFin: Date | string;
  estado?: 'ACTIVO' | 'PLANIFICADO'; // Opcional
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/desempeno`;

  // ==========================================================
  // 🟢 GESTIÓN DE CICLOS (NUEVO)
  // ==========================================================

  // 1. Crear un nuevo ciclo
  // POST http://localhost:3000/desempeno/ciclos
  createCycle(data: CreateCicloDto): Observable<CicloEvaluacion> {
    return this.http.post<CicloEvaluacion>(`${this.baseUrl}/ciclos`, data);
  }

  // 1.1 Obtener TODOS los ciclos (Util para la lista de administración)
  getAllCycles(): Observable<CicloEvaluacion[]> {
    return this.http.get<CicloEvaluacion[]>(`${this.baseUrl}/ciclos`);
  }

  // 1.2 Obtener Ciclo Activo (Ya lo tenías, solo ajusté el tipo de retorno)
  getActiveCycle(): Observable<CicloEvaluacion | null> {
    return this.http.get<CicloEvaluacion>(`${this.baseUrl}/ciclos/activo`).pipe(
      catchError(err => {
        console.warn('No se encontró ciclo activo', err);
        return of(null);
      })
    );
  }

  // ==========================================================
  // 🎯 GESTIÓN DE OBJETIVOS
  // ==========================================================

  // 2. Obtener Objetivos de un Empleado
  getEmployeeGoals(cycleId: string, employeeId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/objetivos`, {
      params: {
        empleadoId: employeeId
      }
    });
  }

  // 3. Crear Objetivo
  createGoal(cycleId: string, data: CreateObjetivoDto): Observable<Objetivo> {
    return this.http.post<Objetivo>(`${this.baseUrl}/ciclos/${cycleId}/objetivos`, data);
  }

  // 4. Actualizar Progreso
  updateGoalProgress(goalId: string, progreso: number): Observable<Objetivo> {
    return this.http.patch<Objetivo>(`${this.baseUrl}/objetivos/${goalId}`, {
      progreso: progreso
    });
  }

  // 5. Objetivos de Departamento
  getDepartmentGoals(cycleId: string, departmentId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/departamentos/${departmentId}/objetivos`);
  }

  // 6. Objetivos Globales
  getAllGoals(cycleId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/objetivos-globales`);
  }

  // 7. Eliminar Objetivo
  deleteGoal(goalId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/objetivos/${goalId}`);
  }
}