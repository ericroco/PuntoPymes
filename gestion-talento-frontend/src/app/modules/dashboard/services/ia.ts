import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ChatResponse {
    respuesta: string;
    contextoUsado?: number;
}

@Injectable({
    providedIn: 'root'
})
export class IaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ia`;

    constructor() { }

    consultar(pregunta: string): Observable<ChatResponse> {
        return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, { pregunta });
    }
}