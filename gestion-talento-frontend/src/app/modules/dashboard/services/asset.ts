import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Importamos las interfaces que creamos en el Paso 3
import { Asset, CreateAssetDto, AssignAssetDto, ReturnAssetDto } from '../models/asset.models';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/activos`; // Ajusta si tu prefijo es diferente (ej: /productividad/activos)

  // ==========================================
  //                CRUD BÁSICO
  // ==========================================

  // 1. Obtener todos los activos
  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  // 2. Crear un activo
  createAsset(dto: CreateAssetDto): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, dto);
  }

  // 3. Editar un activo
  updateAsset(id: string, dto: Partial<CreateAssetDto>): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/${id}`, dto);
  }

  // 4. Eliminar (Dar de baja lógica o física según tu backend)
  deleteAsset(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 5. Obtener historial (Opcional, pero tu controller lo tiene)
  getAssetHistory(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/historial`);
  }

  // ==========================================
  //              ASIGNACIONES
  // ==========================================

  // 6. Asignar activo a empleado
  assignAsset(assetId: string, dto: AssignAssetDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/${assetId}/asignaciones`, dto);
  }

  // 7. Devolver activo (Liberarlo)
  // Nota: Tu controller pide el ID de la *asignación*, no del activo.
  // El frontend deberá saber el ID de la asignación vigente.
  returnAsset(asignacionId: string, dto: ReturnAssetDto): Observable<any> {
    // Nota: Usamos asignacionId, NO el id del activo
    return this.http.post(`${this.apiUrl}/asignaciones/${asignacionId}/devolver`, dto);
  }

  getEmployeesShortList(): Observable<any[]> {
    // Ajusta la URL si tus empleados están en otra ruta, ej: 'recursos-humanos/empleados'
    return this.http.get<any[]>(`${environment.apiUrl}/empleados`);
  }
}