// src/app/core/services/company.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private http = inject(HttpClient);

    // Rutas Base
    private companyUrl = `${environment.apiUrl}/empresa`;
    private authUrl = `${environment.apiUrl}/auth`; // <--- AGREGAMOS ESTA REFERENCIA

    // 1. Obtener mi configuración
    getMyCompany() {
        return this.http.get<any>(`${this.companyUrl}/me`);
    }

    // 2. Subir Logo (CORREGIDO)
    // Usamos 'authUrl' porque ahí es donde vive el endpoint que sabe guardar archivos en el disco
    uploadLogo(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        // 👇 CAMBIO AQUÍ: Apuntamos al endpoint que SÍ funciona
        return this.http.post<{ url: string }>(`${this.authUrl}/upload-logo`, formData);
    }

    // 3. Guardar cambios
    updateBranding(data: { logoUrl?: string, primaryColor?: string }) {
        // Esto sigue yendo al microservicio de empresa para guardar la URL en la BD
        return this.http.patch(`${this.companyUrl}/me/branding`, { branding: data });
    }
}