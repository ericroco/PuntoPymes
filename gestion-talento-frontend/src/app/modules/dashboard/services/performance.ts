import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Objetivo {
  id: string;
  descripcion: string;
  progreso: number;
  estado: string;
  // ... otros campos
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/desempeno`;

  // 1. Obtener el Ciclo Activo
  getActiveCycle(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ciclos/activo`).pipe(
      catchError(err => {
        console.warn('No se encontró ciclo activo', err);
        return of(null);
      })
    );
  }

  // 2. Obtener Objetivos de un Empleado en un Ciclo
  getEmployeeGoals(cycleId: string, employeeId: string): Observable<Objetivo[]> {
    return this.http.get<Objetivo[]>(`${this.baseUrl}/ciclos/${cycleId}/objetivos`, {
      params: { empleadoId: employeeId }
    });
  }

  // 3. Obtener Evaluaciones
  getEmployeeEvaluations(cycleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ciclos/${cycleId}/evaluaciones`);
  }
}