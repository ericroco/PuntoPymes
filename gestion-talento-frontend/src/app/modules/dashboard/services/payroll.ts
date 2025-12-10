import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// ==========================================
//               INTERFACES
// ==========================================



export interface PeriodoNomina {
  id: string;
  nombre?: string; // El ? es por si viene null
  fechaInicio: string;
  fechaFin: string;
  estado: string; // 👈 TIENE QUE LLAMARSE 'estado', no 'status'
}

export interface CreatePeriodoDto {
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;    // YYYY-MM-DD
  estado?: string;
}

export interface Contrato {
  id: string;
  tipo: string;
  salario: number;
  moneda: string;
  fechaInicio: string;
  fechaFin?: string;
  estado: string; // 'Vigente', 'Inactivo'
}

export interface ConceptoNomina {
  id: string;
  nombre: string;
  tipo: 'Ingreso' | 'Egreso';
  esFijo: boolean;
  empresaId: string;
  formula?: string;
}


export interface CreateNovedadDto {
  empleadoId: string;
  conceptoId: string;
  monto: number;
  fecha: string;        // YYYY-MM-DD
  observacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private http = inject(HttpClient);
  // Base URL global (ej: http://localhost:3000)
  private apiUrl = `${environment.apiUrl}`;

  // ==========================================
  // 1. GESTIÓN DE CONTRATOS (Historial)
  // ==========================================
  getEmployeeContracts(employeeId: string): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.apiUrl}/empleados/${employeeId}/contratos`);
  }

  // ==========================================
  // 2. CONFIGURACIÓN (Conceptos de Nómina)
  //    Adapto las rutas a tu backend existente ('conceptos-nomina')
  // ==========================================

  getConceptos(): Observable<ConceptoNomina[]> {
    // 👇 Ruta corregida para coincidir con tu AppController existente
    return this.http.get<ConceptoNomina[]>(`${this.apiUrl}/conceptos-nomina`);
  }

  createConcepto(data: Partial<ConceptoNomina>): Observable<ConceptoNomina> {
    // 👇 Ruta corregida
    return this.http.post<ConceptoNomina>(`${this.apiUrl}/conceptos-nomina`, data);
  }

  deleteConcepto(id: string): Observable<void> {
    // 👇 Ruta corregida
    return this.http.delete<void>(`${this.apiUrl}/conceptos-nomina/${id}`);
  }

  // ==========================================
  // 3. OPERACIÓN DIARIA (Novedades)
  //    Esta es la funcionalidad nueva
  // ==========================================

  createNovedad(data: CreateNovedadDto): Observable<any> {
    // Esta ruta sí es nueva, asegúrate de haber creado el endpoint en el backend
    // Si prefieres seguir tu convención, puedes cambiarla a 'novedades-nomina'
    return this.http.post(`${this.apiUrl}/nomina/novedades`, data);
  }

  createBulkNovedades(items: CreateNovedadDto[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/nomina/novedades/bulk`, { items });
  }
  getEmployeeNovedades(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nomina/novedades/empleado/${employeeId}`);
  }

  // ==========================================
  // 4. GESTIÓN DE PERÍODOS DE NÓMINA
  // ==========================================

  getPeriodos(): Observable<PeriodoNomina[]> {
    // 👇 Coincide con tu @Get('periodos-nomina')
    return this.http.get<PeriodoNomina[]>(`${this.apiUrl}/periodos-nomina`);
  }

  createPeriodo(data: CreatePeriodoDto): Observable<PeriodoNomina> {
    // 👇 Coincide con tu @Post('periodos-nomina')
    return this.http.post<PeriodoNomina>(`${this.apiUrl}/periodos-nomina`, data);
  }

  deletePeriodo(id: string): Observable<void> {
    // 👇 Coincide con tu @Delete('periodos-nomina/:id')
    return this.http.delete<void>(`${this.apiUrl}/periodos-nomina/${id}`);
  }

  // CONFIGURACIÓN GLOBAL
  getGlobalSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nomina/configuracion`);
  }

  updateGlobalSettings(settings: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/nomina/configuracion`, settings);
  }
  procesarNomina(periodoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/nomina/procesar`, { periodoId });
  }

  // Helper para filtrar solo periodos ABIERTOS (útil para el select)
  getPeriodosAbiertos(): Observable<PeriodoNomina[]> {
    return this.http.get<PeriodoNomina[]>(`${this.apiUrl}/periodos-nomina?estado=Abierto`);
    // O si tu backend no filtra, fíltralo en el frontend:
    // return this.getPeriodos().pipe(map(ps => ps.filter(p => p.estado === 'Abierto')));
  }
  getReporteNomina(periodoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nomina/reportes/${periodoId}`);
  }

}