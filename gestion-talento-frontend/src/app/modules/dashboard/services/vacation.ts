import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export enum TipoSolicitud {
  VACACIONES = 'VACACIONES',
  CALAMIDAD = 'CALAMIDAD_DOMESTICA',
  SALUD = 'CITA_MEDICA',
  TRAMITE = 'TRAMITE_PERSONAL',
  OTROS = 'OTROS'
}

@Injectable({ providedIn: 'root' })
export class VacationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/nomina/vacaciones`;

  requestLeave(data: {
    empleadoId: string;
    fechaInicio: string;
    fechaFin: string;
    comentario?: string;
    tipo?: TipoSolicitud;
  }) {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener historial
  getRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener pendientes
  getPendingRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener Saldo
  getVacationBalance(empleadoId: string) {
    return this.http.get<{ diasTotales: number, diasUsados: number, diasDisponibles: number }>(
      `${this.apiUrl}/saldo/${empleadoId}`
    );
  }

  // Aprobar o Rechazar
  respondRequest(id: string, estado: 'APROBADA' | 'RECHAZADA', comentarios?: string) {
    return this.http.patch(`${this.apiUrl}/${id}/responder`, {
      estado,
      comentarios
    });
  }
}