import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// --- INTERFACES QUE NECESITAS ---
export interface Vacancy {
  id: string;
  titulo: string;
  descripcion: string;
  requisitos?: string;
  estado: 'BORRADOR' | 'PUBLICA' | 'INTERNA' | 'CERRADA';
  ubicacion?: string;
  salarioMin?: number;
  salarioMax?: number;
  createdAt: string;
  candidatosCount?: number;
}

export interface Candidate {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  cvUrl: string;
  aiScore?: number;
  aiAnalysis?: string;
  estado: string;
  fechaPostulacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reclutamiento/vacantes`;

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }

  getVacancyById(id: string): Observable<Vacancy> {
    // Si no tienes el endpoint específico, usa un filtro o asume que existe
    return this.http.get<Vacancy>(`${this.apiUrl}/${id}`);
  }

  createVacancy(data: any): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.apiUrl, data);
  }

  getCandidates(vacancyId: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/${vacancyId}/candidatos`);
  }

  applyToVacancy(vacancyId: string, data: { nombre: string; email: string; telefono: string; file: File }): Observable<any> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('nombre', data.nombre);
    formData.append('email', data.email);
    formData.append('telefono', data.telefono);
    return this.http.post(`${this.apiUrl}/${vacancyId}/postular`, formData);
  }

  /**
   * Obtener vacante pública (Sin token necesario)
   */
  getPublicVacancyById(id: string): Observable<Vacancy> {
    // Apunta al nuevo endpoint que creamos
    return this.http.get<Vacancy>(`${environment.apiUrl}/public/vacantes/${id}`);
  }

  updateVacancy(id: string, data: any) {
    // Esto llamará a tu endpoint existente: PATCH /vacantes/:id
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
}