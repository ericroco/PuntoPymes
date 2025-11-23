import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AttendanceSummary {
  asistenciaPercentage: number;
  diasTrabajados: number;
  diasHabilesEsperados: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/asistencia`;

  /**
   * Obtener resumen de asistencia (Porcentaje y días)
   * GET /asistencia/empleados/:id/resumen
   */
  getSummary(employeeId: string): Observable<AttendanceSummary> {
    return this.http.get<AttendanceSummary>(`${this.apiUrl}/empleados/${employeeId}/resumen`);
  }
}