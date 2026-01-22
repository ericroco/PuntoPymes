import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface JwtPayload {
  sub: string;
  email: string;
  empresaId: string;
  empleadoId: string;
  rol: string;
  permisos?: string[];
  exp: number;
  fotoUrl?: string;
  sucursalId?: string;
}

// Interfaz de Usuario para uso interno de la app
export interface User {
  id: string;
  email: string;
  empresaId: string;
  empleadoId: string;
  role: string;
  permisos?: string[];
  fotoUrl?: string;
  sucursalId?: string;
}

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
  private router = inject(Router);

  // ==========================================
  // LOGIN Y SESIÓN
  // ==========================================

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const token = response.accessToken;

        if (!token) {
          console.error('ERROR CRÍTICO: No llegó el token', response);
          return;
        }

        localStorage.setItem('token', token);
        this.memberships = response.membresias || [];

        this.saveUserData(token);
        this.setupInitialBranding(token);
      })
    );
  }

  private saveUserData(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const userFromToken: User = {
        id: decoded.sub,
        email: decoded.email,
        empresaId: decoded.empresaId,
        empleadoId: decoded.empleadoId,
        role: decoded.rol,

        permisos: decoded.permisos || [],

        fotoUrl: decoded.fotoUrl,
        sucursalId: decoded.sucursalId
      };

      localStorage.setItem('user', JSON.stringify(userFromToken));
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }

  // ==========================================
  // RECUPERACIÓN DE CONTRASEÑA (NUEVO)
  // ==========================================

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  // ==========================================
  // GESTIÓN DE PERMISOS (RBAC)
  // ==========================================

  hasPermission(permissionKey: string): boolean {
    const user = this.getUser();
    if (!user || !user.permisos) {
      return false;
    }

    if (Array.isArray(user.permisos)) {
      if (user.permisos.includes('*')) {
        return true;
      }
      return user.permisos.includes(permissionKey);
    }

    if (user.permisos['*'] === true) {
      return true;
    }

    return user.permisos[permissionKey] === true;
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  isAdmin(): boolean {
    return this.hasPermission('usuarios.gestionar') ||
      this.hasPermission('empresa.configurar') ||
      this.hasPermission('roles.gestionar');
  }

  // ==========================================
  // CAMBIO DE EMPRESA
  // ========================================== 

  switchCompany(empresaId: string): Observable<any> {
    const user = this.getUser();

    if (!user || !user.id) {
      throw new Error('No se pudo obtener el ID del usuario');
    }

    return this.http.post<any>(`${this.apiUrl}/switch-company`, {
      usuarioId: user.id,
      empresaId
    }).pipe(
      tap(res => {
        localStorage.setItem('token', res.accessToken);
        this.saveUserData(res.accessToken);

        const selectedMembership = this.memberships.find(m => m.empresaId === empresaId);
        if (selectedMembership?.empresa?.branding) {
          localStorage.setItem('companyBranding', JSON.stringify(selectedMembership.empresa.branding));
          this.applyTheme(selectedMembership.empresa.branding);
        }
        localStorage.setItem('companyName', selectedMembership?.empresa?.nombre);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (!Array.isArray(user.permisos)) {
          user.permisos = [];
        }
        return user;
      } catch { return null; }
    }

    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        return {
          id: decoded.sub,
          email: decoded.email,
          empresaId: decoded.empresaId,
          empleadoId: decoded.empleadoId,
          role: decoded.rol || 'Usuario',
          permisos: Array.isArray(decoded.permisos) ? decoded.permisos : [],

          fotoUrl: decoded.fotoUrl,
          sucursalId: decoded.sucursalId
        };
      } catch (e) {
        console.error('Error decodificando token', e);
        return null;
      }
    }

    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('companyBranding');
    localStorage.removeItem('companyName');
    this.memberships = [];
    document.documentElement.style.removeProperty('--color-primary');
    this.router.navigate(['/auth/login']);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setRegistrationStep1(data: { email: string; password: string }) {
    this.tempRegistrationData = { ...this.tempRegistrationData, email: data.email, password: data.password };
  }

  getRegistrationData() { return this.tempRegistrationData; }
  clearRegistrationData() { this.tempRegistrationData = {}; }

  getCompanyLogo(): string {
    const brandingStr = localStorage.getItem('companyBranding');
    if (brandingStr) {
      const branding = JSON.parse(brandingStr);
      return branding.logoUrl || 'assets/logo.svg';
    }
    return 'assets/logo.svg';
  }

  getCompanyName(): string {
    return localStorage.getItem('companyName') || 'Mi Empresa';
  }

  getStoredMemberships() {
    return this.memberships;
  }

  uploadLogo(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload-logo`, formData);
  }

  private setupInitialBranding(token: string) {
    if (this.memberships.length > 0) {
      const decoded = jwtDecode<JwtPayload>(token);
      const activeMembership = this.memberships.find(m => m.empresaId === decoded.empresaId) || this.memberships[0];

      if (activeMembership?.empresa) {
        const empresa = activeMembership.empresa;
        if (empresa.branding) {
          localStorage.setItem('companyBranding', JSON.stringify(empresa.branding));
          this.applyTheme(empresa.branding);
        }
        localStorage.setItem('companyName', empresa.nombre);
      }
    }
  }

  private applyTheme(branding: any) {
    if (branding && branding.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', branding.primaryColor);
    }
  }

  getCurrentUserId(): string {
    const user = this.getUser();
    return user?.empleadoId || '';
  }

  createCompany(data: {
    nombreEmpresa: string;
    nombreAdmin: string;
    apellidoAdmin: string;
    logoUrl?: string;
    colorCorporativo?: string;
    planSuscripcion: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-company`, data);
  }

  refreshMemberships(): Observable<any[]> {
    return new Observable(obs => {
      const stored = this.getStoredMemberships();
      obs.next(stored);
      obs.complete();
    });
  }

  addCompanyToLocalCache(newCompany: any) {
    this.getStoredMemberships();

    const user = this.getUser();

    const newMembership = {
      rol: { nombre: 'Super Admin' },
      empresa: newCompany,
      empresaId: newCompany.id,
      usuarioId: user?.id,
      cargo: { nombre: 'Gerente General' }
    };

    this.memberships.push(newMembership);
    localStorage.setItem('membresias', JSON.stringify(this.memberships));

    console.log('✅ Cache local actualizada. Total empresas:', this.memberships.length);
  }
  changePassword(data: { passwordActual: string; nuevaPassword: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/change-password`, data);
  }
}