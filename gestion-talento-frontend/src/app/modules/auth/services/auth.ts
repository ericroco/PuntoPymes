import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

// 1. Interfaz del TOKEN (Lo que viene DENTRO del string encriptado)
interface JwtPayload {
  sub: string;
  email: string;
  empresaId: string;
  empleadoId: string;
  rol: string;
  // 👇 CAMBIO 1: Lo cambié a string[] porque tu log mostró ['*']. 
  // Si lo dejas como Record, .includes('*') da error.
  permisos?: string[];
  exp: number;
  fotoUrl?: string;
  sucursalId?: string; // 👈 CAMBIO 2: AGREGADO (Importante)
}

// Interfaz de Usuario para uso interno de la app
export interface User {
  id: string;
  email: string;
  empresaId: string;
  empleadoId: string;
  role: string;
  // 👇 CAMBIO 1: Lo mismo aquí, Array de strings para que funcione el check
  permisos?: string[];
  fotoUrl?: string;
  sucursalId?: string; // 👈 CAMBIO 2: AGREGADO (Importante)
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

        // 1. Guardar Token y Membresías
        localStorage.setItem('token', token);
        this.memberships = response.membresias || [];

        // 2. Decodificar y Guardar Usuario
        this.saveUserData(token);

        // 3. Configurar Branding Inicial
        this.setupInitialBranding(token);
      })
    );
  }

  // Helper privado para guardar los datos del usuario DESDE EL TOKEN
  private saveUserData(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const userFromToken: User = {
        id: decoded.sub,
        email: decoded.email,
        empresaId: decoded.empresaId,
        empleadoId: decoded.empleadoId,
        role: decoded.rol,

        // 👇 CAMBIO AQUÍ: Usa [] (array vacío) en lugar de {} (objeto vacío)
        permisos: decoded.permisos || [],

        fotoUrl: decoded.fotoUrl,
        sucursalId: decoded.sucursalId // No olvides agregar esto si lo necesitas
      };

      localStorage.setItem('user', JSON.stringify(userFromToken));
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }

  // ==========================================
  // GESTIÓN DE PERMISOS (RBAC)
  // ==========================================

  /**
   * Verifica si el usuario tiene un permiso específico.
   * @param permissionKey La clave del permiso (ej: 'nomina.procesar')
   */
  hasPermission(permissionKey: string): boolean {
    const user = this.getUser();
    if (!user || !user.permisos) {
      return false;
    }

    // -----------------------------------------------------
    // CASO 1: El Backend envía un ARRAY (['*', 'empleados.leer'])
    // -----------------------------------------------------
    if (Array.isArray(user.permisos)) {
      // 👑 REGLA DE ORO: Si tiene '*', es Super Admin y puede hacer TODO.
      if (user.permisos.includes('*')) {
        return true;
      }
      // Si no es admin, buscamos si tiene el permiso exacto en la lista
      return user.permisos.includes(permissionKey);
    }

    // -----------------------------------------------------
    // CASO 2: Tu lógica antigua (Objeto { 'empleados.leer': true })
    // -----------------------------------------------------
    // Mantenemos esto por compatibilidad, pero agregamos el check de admin

    // Si por casualidad tu objeto tiene la llave '*' en true
    if (user.permisos['*'] === true) {
      return true;
    }

    // Tu lógica original intacta
    return user.permisos[permissionKey] === true;
  }

  /**
   * Verifica si el usuario tiene ALGUNO de los permisos listados.
   * Útil para menús que requieren al menos una capacidad.
   */
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  /**
   * Determina si es Admin basado en capacidades críticas, no en el nombre del rol.
   */
  isAdmin(): boolean {
    // Es Admin si puede gestionar usuarios o configurar la empresa
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
        // Al cambiar empresa, recibimos un NUEVO token con los permisos de ESA empresa
        localStorage.setItem('token', res.accessToken);
        this.saveUserData(res.accessToken);

        // Actualizar Branding
        const selectedMembership = this.memberships.find(m => m.empresaId === empresaId);
        if (selectedMembership?.empresa?.branding) {
          localStorage.setItem('companyBranding', JSON.stringify(selectedMembership.empresa.branding));
          this.applyTheme(selectedMembership.empresa.branding);
        }
        localStorage.setItem('companyName', selectedMembership?.empresa?.nombre);
      })
    );
  }

  // ==========================================
  // UTILIDADES Y GETTERS
  // ==========================================

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');

    // CASO 1: Tenemos usuario guardado en LocalStorage
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Pequeña validación para evitar errores antiguos
        if (!Array.isArray(user.permisos)) {
          user.permisos = [];
        }
        return user;
      } catch { return null; }
    }

    // CASO 2: Fallback (Recuperar desde el Token)
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        return {
          id: decoded.sub,
          email: decoded.email,
          empresaId: decoded.empresaId,
          empleadoId: decoded.empleadoId,

          // Revisa si tu token trae 'role' o 'rol'. En tu log anterior decía 'role'.
          role: decoded.rol || 'Usuario',

          // 👇 CORRECCIÓN IMPORTANTE: Fallback a Array vacío []
          permisos: Array.isArray(decoded.permisos) ? decoded.permisos : [],

          fotoUrl: decoded.fotoUrl,

          // 👇 AÑADIDO: Mapeamos la sucursal
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

  // ... (Resto de métodos de registro y branding se mantienen igual)
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

  // ==========================================
  // GESTIÓN DE EMPRESA (LOGUEADO) - AGREGAR ESTO
  // ==========================================

  /**
   * Crea una nueva empresa vinculada al usuario que ya está logueado.
   * @param data Datos del formulario (nombre, plan, colores, etc.)
   */
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

  /**
   * Actualiza la lista de membresías del usuario localmente.
   * Llámalo después de crear una empresa para que aparezca en el selector.
   */
  refreshMemberships(): Observable<any[]> {
    // En lugar de llamar a la API, simplemente devolvemos lo que hay guardado.
    // (Si acabas de crear una empresa, la añadiremos manualmente en el componente)
    return new Observable(obs => {
      const stored = this.getStoredMemberships();
      obs.next(stored);
      obs.complete();
    });
  }

  addCompanyToLocalCache(newCompany: any) {
    // 1. IMPORTANTE: Forzamos la carga de lo que ya existe en localStorage
    // Si no hacemos esto, 'this.memberships' podría estar vacío y sobrescribiríamos todo.
    this.getStoredMemberships();

    const user = this.getUser();

    // 2. Creamos el objeto de membresía simulado
    const newMembership = {
      rol: { nombre: 'Super Admin' },
      empresa: newCompany,
      empresaId: newCompany.id,
      usuarioId: user?.id,
      // Agregamos cargo para que no se vea feo en la tarjeta
      cargo: { nombre: 'Gerente General' }
    };

    // 3. Agregamos al array existente
    this.memberships.push(newMembership);

    // 4. Guardamos el array COMPLETO de nuevo
    localStorage.setItem('membresias', JSON.stringify(this.memberships));

    console.log('✅ Cache local actualizada. Total empresas:', this.memberships.length);
  }
}