import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { switchMap, of } from 'rxjs'; // Importante para la lógica secuencial

@Injectable({ providedIn: 'root' })
export class ExpensesService {
    private http = inject(HttpClient);
    // Base URL: localhost:3000/gastos/reportes
    private apiUrl = `${environment.apiUrl}/gastos/reportes`;
    // URL para subir archivos: localhost:3000/gastos/upload-factura
    private uploadUrl = `${environment.apiUrl}/gastos/upload-factura`;

    // ... (Tus métodos existentes getMyReports, createReport, getReports se quedan igual) ...
    getMyReports(empleadoId: string) {
        let params = new HttpParams().set('empleadoId', empleadoId);
        return this.http.get<any[]>(this.apiUrl, { params });
    }

    createReport(data: { titulo: string; descripcion: string; empleadoId: string }) {
        const params = new HttpParams().set('empleadoId', data.empleadoId);
        return this.http.post(this.apiUrl, {
            titulo: data.titulo,
            descripcion: data.descripcion
        }, { params });
    }

    getReports() {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateStatus(id: string, estado: 'APROBADO' | 'RECHAZADO' | 'PAGADO', comentarios?: string) {
        return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado });
    }

    getReportById(id: string) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // =========================================================
    // 🚀 LÓGICA DE GESTIÓN DE ÍTEMS CON ARCHIVOS (NUEVO)
    // =========================================================

    /**
     * Paso 1: Subir archivo físico
     */
    private uploadFactura(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<{ url: string }>(this.uploadUrl, formData);
    }

    /**
     * Paso 2: Crear el ítem (JSON)
     */
    private addItem(reporteId: string, itemData: any) {
        return this.http.post(`${this.apiUrl}/${reporteId}/items`, itemData);
    }

    /**
     * MÉTODO MAESTRO: Orquesta la subida y luego la creación.
     * Úsalo desde tu componente padre cuando recibas los datos del diálogo.
     */
    createItemWithAttachment(reporteId: string, formData: any, file: File | null) {
        // A. Si hay archivo, primero lo subimos
        if (file) {
            return this.uploadFactura(file).pipe(
                switchMap((response) => {
                    // El backend nos devolvió la URL
                    const dataConUrl = {
                        ...formData,
                        facturaUrl: response.url // Inyectamos la URL
                    };
                    // Ahora guardamos el ítem
                    return this.addItem(reporteId, dataConUrl);
                })
            );
        } else {
            // B. Si no hay archivo, guardamos directo
            return this.addItem(reporteId, formData);
        }
    }

    deleteItem(reporteId: string, itemId: string) {
        return this.http.delete(`${this.apiUrl}/${reporteId}/items/${itemId}`);
    }

    submitReport(reporteId: string) {
        return this.http.patch(`${this.apiUrl}/${reporteId}/estado`, {
            estado: 'PENDIENTE'
        });
    }
}