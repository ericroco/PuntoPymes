import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// =========================================================
// 1. INTERFACES DE GESTIÓN DE PROYECTOS (HARD SKILLS)
// =========================================================

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface Sprint {
  id: string;
  nombre: string;
  objetivo?: string;
  fechaInicio: string;
  fechaFin: string;
  estado?: string;
  proyectoId: string;
}

export interface Task {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  puntosHistoria: number;
  sprintId: string;
  asignaciones?: any[];
  objetivoId?: string;
}

// =========================================================
// 2. INTERFACES DE CLIMA LABORAL (SOFT SKILLS) - ¡NUEVO!
// =========================================================

export interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  createdAt: string;
  fechaExpiracion?: string;
  sucursalId?: string | null; // Null si es Global
}

export interface OpcionEncuesta {
  id: string;
  texto: string;
  votos: number;
}

export interface Voto {
  opcionId: string;
  encuestaId?: string;
}

export interface Encuesta {
  id: string;
  titulo: string;
  descripcion?: string;
  activa: boolean;
  createdAt: string;
  opciones: OpcionEncuesta[];

  // Propiedades calculadas o virtuales
  miVoto?: Voto;
  totalVotos?: number; // Lo calculamos en el front si el back no lo manda
}

// DTOs para creación (Opcional, pero recomendado)
export interface CreateAnuncioDto {
  titulo: string;
  contenido: string;
  prioridad?: string;
  sucursalId?: string; // Opcional
}

export interface CreateEncuestaDto {
  titulo: string;
  descripcion?: string;
  fechaFin: string;
  opciones: { texto: string }[];
  sucursalId?: string | null;
}

// =========================================================
// SERVICIO PRINCIPAL
// =========================================================

@Injectable({
  providedIn: 'root'
})
export class ProductivityService {
  private http = inject(HttpClient);
  // Asegúrate que tu environment.apiUrl apunte al API Gateway (ej: http://localhost:3000)
  private apiUrl = environment.apiUrl;

  // =========================================================
  // SECCIÓN A: GESTIÓN DE PROYECTOS (Jira-like)
  // =========================================================

  // --- PROYECTOS ---
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/proyectos`);
  }

  createProject(data: any): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/proyectos`, data);
  }

  // --- SPRINTS ---
  getSprintsByProject(projectId: string): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/proyectos/${projectId}/sprints`);
  }

  createSprint(projectId: string, data: any): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.apiUrl}/proyectos/${projectId}/sprints`, data);
  }

  updateSprint(sprintId: string, data: any): Observable<Sprint> {
    return this.http.patch<Sprint>(`${this.apiUrl}/sprints/${sprintId}`, data);
  }

  // --- TAREAS ---
  getTasksBySprint(sprintId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/sprints/${sprintId}/tareas`);
  }

  createTask(sprintId: string, data: any): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/sprints/${sprintId}/tareas`, data);
  }

  updateTask(taskId: string, data: any): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tareas/${taskId}`, data);
  }

  // =========================================================
  // SECCIÓN B: CLIMA LABORAL Y COMUNICACIÓN (NUEVO)
  // Rutas basadas en el Gateway que configuramos (/productividad/...)
  // =========================================================

  // --- ANUNCIOS (Cartelera Digital) ---

  // Obtener anuncios (El backend filtra automáticamente por mi sucursal + globales)
  getMyAnuncios(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/anuncios`);
  }

  // Crear anuncio (Solo Admin/RRHH)
  createAnuncio(data: CreateAnuncioDto): Observable<Anuncio> {
    return this.http.post<Anuncio>(`${this.apiUrl}/anuncios`, data);
  }

  // --- ENCUESTAS (Votación) ---

  // Obtener encuestas activas (incluye si ya voté o no)
  getMyEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(`${this.apiUrl}/encuestas`);
  }

  // Crear encuesta (Solo Admin/RRHH)
  createEncuesta(data: CreateEncuestaDto): Observable<Encuesta> {
    return this.http.post<Encuesta>(`${this.apiUrl}/encuestas`, data);
  }

  // Votar en una encuesta
  votar(encuestaId: string, opcionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas/${encuestaId}/votar`, { opcionId });
  }


  // ================= ADMIN ENCUESTAS =================

  // 1. Obtener TODAS las encuestas (Admin View)
  getAllSurveys(): Observable<Encuesta[]> {
    // 🔴 ANTES (MAL): return this.http.get<Encuesta[]>(`${this.apiUrl}/encuestas/all`);

    // ✅ CORREGIDO:
    // 1. Agregamos '/productividad'
    // 2. Cambiamos '/all' por '/admin/encuestas' para coincidir con tu Backend y evitar bugs
    return this.http.get<Encuesta[]>(`${this.apiUrl}/productividad/admin/encuestas`);
  }
  // 3. Helper para calcular total de respuestas
  countVotes(encuesta: Encuesta): number {
    if (!encuesta.opciones) return 0;
    return encuesta.opciones.reduce((acc, curr) => acc + curr.votos, 0);
  }

  votarEncuesta(encuestaId: string, opcionId: string) {
    return this.http.post(`${this.apiUrl}/encuestas/${encuestaId}/votar`, { opcionId });
  }

  getAnuncios() {
    // Ya el interceptor se encarga de mandar el token con tu ID
    return this.http.get<any[]>(`${this.apiUrl}/anuncios`);
  }
  /**
     * Obtener detalle completo de una encuesta (útil para resultados)
     */
  getSurveyById(id: string): Observable<Encuesta> {
    // Apunta al endpoint GET /productividad/encuestas/:id
    return this.http.get<Encuesta>(`${this.apiUrl}/productividad/encuestas/${id}`);
  }

  /**
   * Eliminar encuesta
   */
  deleteSurvey(id: string): Observable<any> {
    // Apunta al endpoint DELETE /productividad/encuestas/:id
    return this.http.delete(`${this.apiUrl}/productividad/encuestas/${id}`);
  }

  /**
   * Editar encuesta (Título, descripción, fecha, estado)
   */
  updateSurvey(id: string, data: any): Observable<Encuesta> {
    // Apunta al endpoint PATCH /productividad/encuestas/:id
    return this.http.patch<Encuesta>(`${this.apiUrl}/productividad/encuestas/${id}`, data);
  }

  /**
   * Shortcut para abrir/cerrar encuesta rápidamente
   */
  toggleSurveyStatus(id: string, estadoActual: boolean): Observable<Encuesta> {
    return this.updateSurvey(id, { activa: !estadoActual });
  }
}