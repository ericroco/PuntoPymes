import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

// 1. Interfaz del TOKEN (Lo que viene DENTRO del string encriptado)
interface JwtPayload {
  sub: string;
  email: string;
  empresaId: string;
  empleadoId: string;
  rol: string; // "Administrador"
  permisos?: any;
  exp: number;
}

// 2. Interfaz de la RESPUESTA DEL BACKEND (Lo que te llega en el subscribe)
// 👇 AQUÍ ESTABA EL ERROR
interface LoginResponse {
  message: string;
  accessToken: string; // <--- ¡Debe llamarse accessToken!
  membresias: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // 👇 3. USAR LA PROPIEDAD CORRECTA
        const token = response.accessToken;

        if (!token) {
          console.error('ERROR CRÍTICO: No llegó el token', response);
          return;
        }

        localStorage.setItem('token', token);

        try {
          const decoded = jwtDecode<JwtPayload>(token);
          console.log('🔑 Token decodificado:', decoded);

          const userFromToken = {
            id: decoded.sub,
            email: decoded.email,
            empresaId: decoded.empresaId,
            empleadoId: decoded.empleadoId,
            role: decoded.rol // Mapeamos 'rol' del token a 'role' del usuario
          };

          localStorage.setItem('user', JSON.stringify(userFromToken));
          console.log('💾 Usuario guardado:', userFromToken);
        } catch (error) {
          console.error('Error al decodificar token:', error);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'Administrador' || user?.role === 'Admin';
  }
}