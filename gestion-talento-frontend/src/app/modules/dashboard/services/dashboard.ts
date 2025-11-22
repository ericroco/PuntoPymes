import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

// Interface basada en el DTO de tu backend (DashboardKpiDto)
export interface DashboardKPIs {
  totalEmpleados: number;
  totalProyectosActivos: number;
  totalGastosAprobados: number;
  tasaAsistenciaHoy: number;
  distribucion9Box: {
    bajoDesempenoBajoPotencial: number;
    altoDesempenoAltoPotencial: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  // Ajusta la URL si tu backend tiene un prefijo global, pero según tu código es directo
  private apiUrl = `${environment.apiUrl}/analiticas/dashboard`;

  getKPIs(): Observable<DashboardKPIs> {
    return this.http.get<DashboardKPIs>(this.apiUrl);
  }
}