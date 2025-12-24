import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VacationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/nomina/vacaciones`;

  // Solicitar (Ya lo tenías)
  requestLeave(data: { fechaInicio: string; fechaFin: string; comentario?: string }) {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener historial
  getRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 👇 NUEVO: Obtener pendientes (para el admin)
  getPendingRequests() {
    // Asumiendo que el backend retorna todas y filtramos, o si tienes un endpoint especifico
    // Por ahora usamos el mismo y filtraremos en el componente si es necesario
    return this.http.get<any[]>(this.apiUrl);
  }

  // 👇 NUEVO: Aprobar o Rechazar
  respondRequest(id: string, estado: 'APROBADA' | 'RECHAZADA', comentarios?: string) {
    return this.http.patch(`${this.apiUrl}/${id}/responder`, {
      estado,
      comentarios
    });
  }
}