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
  fotoUrl?: string;
}

// 2. Interfaz de la RESPUESTA DEL BACKEND (Lo que te llega en el subscribe)
interface LoginResponse {
  message: string;
  accessToken: string;
  membresias: any[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombreEmpresa: string;
  nombreAdmin: string;
  apellidoAdmin: string;
  logoUrl?: string;
  colorCorporativo?: string;
  planSuscripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;
  private tempRegistrationData: Partial<RegisterRequest> = {};
  private memberships: any[] = [];


  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.accessToken;

        // 1. Validación de seguridad
        if (!token) {
          console.error('ERROR CRÍTICO: No llegó el token', response);
          return;
        }

        // 2. Guardar Token y Membresías
        localStorage.setItem('token', token);
        this.memberships = response.membresias || [];

        // 3. Decodificar y Guardar Datos del Usuario (Llama al helper de abajo)
        this.saveUserData(token);

        // 4. Configurar Branding y Nombre de la Empresa
        // Buscamos la empresa que coincide con el token actual
        if (this.memberships.length > 0) {
          // Decodificamos un momento para sacar el empresaId del token
          const decoded = jwtDecode<JwtPayload>(token);
          const currentEmpresaId = decoded.empresaId;

          // Buscamos la membresía que corresponde a ese ID, o usamos la primera por defecto
          const activeMembership = this.memberships.find(m => m.empresaId === currentEmpresaId) || this.memberships[0];

          if (activeMembership && activeMembership.empresa) {
            const empresa = activeMembership.empresa;

            // A. Guardar Branding
            if (empresa.branding) {
              localStorage.setItem('companyBranding', JSON.stringify(empresa.branding));
              this.applyTheme(empresa.branding);
            }

            // B. Guardar Nombre
            localStorage.setItem('companyName', empresa.nombre);
          }
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setRegistrationStep1(data: { email: string; password: string }) {
    this.tempRegistrationData = {
      ...this.tempRegistrationData,
      email: data.email,
      password: data.password
    };
  }

  getRegistrationData() {
    return this.tempRegistrationData;
  }

  clearRegistrationData() {
    this.tempRegistrationData = {};
  }

  // Método público para recuperar el logo
  getCompanyLogo(): string {
    const brandingStr = localStorage.getItem('companyBranding');
    if (brandingStr) {
      const branding = JSON.parse(brandingStr);
      return branding.logoUrl || 'assets/logo.svg'; // Fallback
    }
    return 'assets/logo.svg';
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
    if (!userStr) {
      // 🔧 NUEVO: Si no hay usuario guardado, intentar extraerlo del token
      const token = this.getToken();
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          return {
            id: decoded.sub,
            email: decoded.email,
            empresaId: decoded.empresaId,
            empleadoId: decoded.empleadoId,
            role: decoded.rol,
            fotoUrl: decoded.fotoUrl
          };
        } catch {
          return null;
        }
      }
      return null;
    }
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // --- CAMBIAR EMPRESA (Obtener Token Definitivo) ---
  switchCompany(empresaId: string): Observable<any> {
    // ✅ Obtener el usuarioId del usuario actual
    const user = this.getUser();
    console.log('👤 Usuario obtenido:', user); // ← AGREGA ESTO
    console.log('🔍 user.id:', user?.id);

    if (!user || !user.id) {
      console.error('❌ Usuario no encontrado o sin ID:', user);
      throw new Error('No se pudo obtener el ID del usuario');
    }
    const payload = { usuarioId: user.id, empresaId };
    console.log('📦 Payload a enviar:', payload); // ← Y ESTO

    console.log('🔄 Enviando a backend:', { usuarioId: user.id, empresaId });

    return this.http.post<any>(`${this.apiUrl}/switch-company`, {
      usuarioId: user.id,
      empresaId
    }).pipe(
      tap(res => {
        console.log('✅ Respuesta del backend:', res);

        // Sobrescribimos el token con el nuevo específico para la empresa
        localStorage.setItem('token', res.accessToken);
        this.saveUserData(res.accessToken); // Decodificar y guardar user

        // Guardar branding
        const selectedMembership = this.memberships.find(m => m.empresaId === empresaId);
        if (selectedMembership?.empresa?.branding) {
          localStorage.setItem('companyBranding', JSON.stringify(selectedMembership.empresa.branding));
        }
        localStorage.setItem('companyName', selectedMembership?.empresa?.nombre);
      })
    );
  }


  // Helper privado para no repetir código
  private saveUserData(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('🔑 Token decodificado:', decoded);

      const userFromToken = {
        id: decoded.sub,
        email: decoded.email,
        empresaId: decoded.empresaId,
        empleadoId: decoded.empleadoId,
        role: decoded.rol,
        fotoUrl: decoded.fotoUrl
      };

      localStorage.setItem('user', JSON.stringify(userFromToken));
      console.log('💾 Usuario guardado:', userFromToken);
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'Administrador' || user?.role === 'Admin';
  }

  private applyTheme(branding: any) {
    if (branding && branding.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', branding.primaryColor);
    }
  }

  uploadLogo(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload-logo`, formData);
  }

  getCompanyName(): string {
    return localStorage.getItem('companyName') || 'Mi Empresa';
  }

  getStoredMemberships() {
    return this.memberships;
  }
}