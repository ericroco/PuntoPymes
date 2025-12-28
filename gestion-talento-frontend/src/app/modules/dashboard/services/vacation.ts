import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VacationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/nomina/vacaciones`;

  // 1. ACTUALIZACIÓN: Agregar 'empleadoId' a la interfaz
  // Tu componente ahora envía { empleadoId, fechaInicio... }, así que Typescript
  // necesita saber que 'data' incluye ese campo.
  requestLeave(data: { empleadoId: string; fechaInicio: string; fechaFin: string; comentario?: string }) {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener historial (Sin cambios)
  getRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener pendientes (Sin cambios)
  getPendingRequests() {
    return this.http.get<any[]>(this.apiUrl); // Quizás quieras agregar ?estado=PENDIENTE aquí en el futuro
  }

  // 2. NUEVO: Obtener Saldo Disponible ("La Billetera")
  // Necesitas esto para mostrar en el Dashboard: "Te quedan 13 días"
  // Asume que en tu backend crearás un endpoint GET /nomina/vacaciones/saldo/:empleadoId
  getVacationBalance(empleadoId: string) {
    return this.http.get<{ diasTotales: number, diasUsados: number, diasDisponibles: number }>(
      `${this.apiUrl}/saldo/${empleadoId}`
    );
  }

  // Aprobar o Rechazar (Sin cambios, está perfecto)
  respondRequest(id: string, estado: 'APROBADA' | 'RECHAZADA', comentarios?: string) {
    return this.http.patch(`${this.apiUrl}/${id}/responder`, {
      estado,
      comentarios
    });
  }
}