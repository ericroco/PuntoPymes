import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Contrato {
  id: string;
  tipo: string;
  salario: number;
  moneda: string;
  fechaInicio: string;
  fechaFin?: string;
  estado: string; // 'Vigente', 'Inactivo'
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  // 1. Obtener Historial de Contratos
  getEmployeeContracts(employeeId: string): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.apiUrl}/empleados/${employeeId}/contratos`);
  }
}