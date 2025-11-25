import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VacationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/nomina/vacaciones`;

  requestLeave(data: { fechaInicio: string; fechaFin: string }) {
    return this.http.post(this.apiUrl, data);
  }

  getRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }
}