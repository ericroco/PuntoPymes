import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Asegúrate de tener tu environment


// 1. NUEVA INTERFAZ PARA VACACIONES (Esto es lo que faltaba)
export interface ConfiguracionVacaciones {
    diasPorAnio?: number;
    diasMaximoAcumulables?: number;
    requiereAprobacion?: boolean;
}
// --- INTERFACES (Espejo del Backend) ---
export interface ConfiguracionModulos {
    reclutamiento?: boolean;
    onboarding?: boolean;
    desempeno?: boolean;
    proyectos?: boolean;
    kpis?: boolean;
    asistencia?: boolean;
    hojasTiempo?: boolean;
    nomina?: boolean;
    beneficios?: boolean;
    capacitacion?: boolean;
    documentos?: boolean;
    activos?: boolean;
    reportes?: boolean;
    comunicacion?: boolean;
}

export interface ConfiguracionAsistencia {
    horaEntrada?: string;
    horaSalida?: string;
    toleranciaRetraso?: number;
}

export interface ConfiguracionNomina {
    frecuenciaPago?: 'mensual' | 'quincenal' | 'semanal';
    multiplicadorHorasExtra?: number;
}

export interface ConfiguracionEmpresa {
    modulos?: ConfiguracionModulos;
    asistencia?: ConfiguracionAsistencia;
    nomina?: ConfiguracionNomina;
    vacaciones?: ConfiguracionVacaciones;
    // ... resto
}

@Injectable({
    providedIn: 'root'
})
export class CompanyConfigService {
    // Ajusta la URL según tu environment (ej: http://localhost:3000/settings)
    private apiUrl = `${environment.apiUrl}/empresas`;

    constructor(private http: HttpClient) { }

    // 1. OBTENER CONFIGURACIÓN
    getConfig(): Observable<ConfiguracionEmpresa> {
        return this.http.get<ConfiguracionEmpresa>(`${this.apiUrl}/configuracion`);
    }

    // 2. ACTUALIZAR CONFIGURACIÓN (PATCH)
    updateConfig(config: Partial<ConfiguracionEmpresa>): Observable<any> {
        return this.http.patch(`${this.apiUrl}/configuracion`, config);
    }
}