import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 👈 Importante para procesar la respuesta del upload

export interface DocumentoEmpresa {
  id: string;
  nombre: string;
  descripcion?: string;
  url: string;
  categoria: string;
  fechaSubida: Date;
  sucursalId?: string; // Si es null, es Global
  sucursal?: { nombre: string };
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private http = inject(HttpClient);

  // Endpoint para guardar los DATOS (Microservicio)
  private apiUrl = `${environment.apiUrl}/documentos-empresa`;

  // Endpoint para subir el ARCHIVO FÍSICO (Gateway Multer)
  // Asegúrate de haber agregado este endpoint en tu app.controller.ts
  private uploadUrl = `${environment.apiUrl}/documentos-empresa/upload`;

  // 1. Obtener documentos (El Interceptor pondrá el filtro de sede automáticamente)
  getDocuments(): Observable<DocumentoEmpresa[]> {
    return this.http.get<DocumentoEmpresa[]>(this.apiUrl);
  }

  createDocument(data: any): Observable<DocumentoEmpresa> {
    console.log('🚀 ENVIANDO AL BACKEND:', data); // 👈 Revisa esto en la consola F12
    return this.http.post<DocumentoEmpresa>(this.apiUrl, data);
  }

  // 3. Eliminar
  deleteDocument(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 4. SUBIDA REAL DE ARCHIVO
  // Envía el archivo físico al Gateway, el cual lo guarda y devuelve la URL pública
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(this.uploadUrl, formData).pipe(
      map(response => response.url) // Extraemos solo el string de la URL
    );
  }
}