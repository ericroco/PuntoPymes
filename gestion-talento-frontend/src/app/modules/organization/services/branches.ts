import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Branch {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  activa: boolean;
  jefeId?: string;
  // Relaciones (para mostrar datos bonitos)
  jefe?: {
    id: string;
    nombre: string;
    apellido: string;
    fotoUrl?: string;
  };
  _count?: { // Para saber cuánta gente hay (opcional si tu backend lo manda)
    empleados: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private http = inject(HttpClient);
  // Según tu PersonalController, la ruta base es /personal/sucursales
  // Si usas api-gateway, ajusta si es necesario (ej: /api/personal/sucursales)
  private apiUrl = `${environment.apiUrl}/sucursales`;

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  createBranch(data: any): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, data);
  }

  updateBranch(id: string, data: any): Observable<Branch> {
    return this.http.patch<Branch>(`${this.apiUrl}/${id}`, data);
  }

  deleteBranch(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}