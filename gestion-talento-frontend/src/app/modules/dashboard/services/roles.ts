import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Rol {
    id: string;
    nombre: string;
    permisos: Record<string, boolean>; // El JSON de permisos
    esDefecto: boolean; // La nueva bandera
}

export interface CreateRolDto {
    nombre: string;
    permisos: Record<string, boolean>;
    esDefecto?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/roles`; // Asegúrate que tu backend tenga esta ruta base

    // Listar todos los roles
    getRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.apiUrl);
    }

    // Crear nuevo rol
    createRol(dto: CreateRolDto): Observable<Rol> {
        return this.http.post<Rol>(this.apiUrl, dto);
    }

    // Actualizar rol
    updateRol(id: string, dto: Partial<CreateRolDto>): Observable<Rol> {
        return this.http.patch<Rol>(`${this.apiUrl}/${id}`, dto);
    }

    // Borrar rol
    deleteRol(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}