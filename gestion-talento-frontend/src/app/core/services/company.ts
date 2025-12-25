// src/app/core/services/company.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private http = inject(HttpClient);
    // URL base del Gateway
    private apiUrl = `${environment.apiUrl}/empresa`;

    // 1. Obtener mi configuración
    getMyCompany() {
        return this.http.get<any>(`${this.apiUrl}/me`);
    }

    // 2. Subir Logo (Devuelve { url: string })
    uploadLogo(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<{ url: string }>(`${this.apiUrl}/upload-logo`, formData);
    }

    // 3. Guardar cambios
    updateBranding(data: { logoUrl?: string, primaryColor?: string }) {
        return this.http.patch(`${this.apiUrl}/me/branding`, { branding: data });
    }
}