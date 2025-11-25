import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// --- INTERFACES ---

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  // ...
}

export interface Sprint {
  id: string;
  nombre: string;
  objetivo?: string; // o description
  fechaInicio: string;
  fechaFin: string;
  estado?: string; // Calculado o del backend
  proyectoId: string;
  // El backend no devuelve 'tasks' count directamente en el listado simple, 
  // a menos que el endpoint lo incluya.
  // Si no, lo calcularemos o pediremos un DTO extendido.
}

export interface Task {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA'; // Ajusta a tus Enums
  prioridad: string;
  puntosHistoria: number;
  sprintId: string;
  asignaciones?: any[]; // Para ver quién la tiene
}

@Injectable({
  providedIn: 'root'
})
export class ProductivityService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl; // http://localhost:3000

  // --- PROYECTOS ---
  getProjects(): Observable<Project[]> {
    // Asumimos ruta GET /proyectos (definida en AppController)
    return this.http.get<Project[]>(`${this.apiUrl}/proyectos`);
  }

  createProject(data: any): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/proyectos`, data);
  }

  // --- SPRINTS ---
  getSprintsByProject(projectId: string): Observable<Sprint[]> {
    // GET /proyectos/:id/sprints
    return this.http.get<Sprint[]>(`${this.apiUrl}/proyectos/${projectId}/sprints`);
  }

  createSprint(projectId: string, data: any): Observable<Sprint> {
    // POST /proyectos/:id/sprints
    return this.http.post<Sprint>(`${this.apiUrl}/proyectos/${projectId}/sprints`, data);
  }

  updateSprint(sprintId: string, data: any): Observable<Sprint> {
    return this.http.patch<Sprint>(`${this.apiUrl}/sprints/${sprintId}`, data);
  }

  // --- TAREAS ---
  getTasksBySprint(sprintId: string): Observable<Task[]> {
    // GET /sprints/:id/tareas
    return this.http.get<Task[]>(`${this.apiUrl}/sprints/${sprintId}/tareas`);
  }

  createTask(sprintId: string, data: any): Observable<Task> {
    // POST /sprints/:id/tareas
    return this.http.post<Task>(`${this.apiUrl}/sprints/${sprintId}/tareas`, data);
  }

  updateTask(taskId: string, data: any): Observable<Task> {
    // PATCH /tareas/:id (para mover en el kanban)
    return this.http.patch<Task>(`${this.apiUrl}/tareas/${taskId}`, data);
  }
}