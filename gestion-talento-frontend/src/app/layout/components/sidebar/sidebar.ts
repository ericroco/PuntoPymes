import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importar CommonModule para *ngIf
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth';
import { MatIconModule } from '@angular/material/icon';
import { PERMISSIONS } from '../../../shared/constants/permissions';
import { CompanyConfigService, ConfiguracionModulos } from '../../../modules/dashboard/services/company-config';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  public authService = inject(AuthService);
  public configService = inject(CompanyConfigService);

  // Exponemos las constantes al HTML
  P = PERMISSIONS;

  companyName = 'Mi Empresa';
  companyLogo = 'assets/logo.svg';

  // 3. Estado local de los módulos (Por defecto todo true para no parpadear al cargar)
  activeModules: ConfiguracionModulos = {
    reclutamiento: true,
    nomina: true,
    asistencia: true,
    kpis: true,
    onboarding: true,
    desempeno: true,
    proyectos: true,
    hojasTiempo: true,
    beneficios: true,
    capacitacion: true,
    documentos: true,
    activos: true,
    reportes: true,
    comunicacion: true
  };

  ngOnInit(): void {
    this.companyName = this.authService.getCompanyName();
    this.companyLogo = this.authService.getCompanyLogo();
    this.loadCompanyConfig();
  }

  // Helper para Admin Global (Configuraciones sensibles)
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadCompanyConfig() {
    this.configService.getConfig().subscribe({
      next: (config) => {
        if (config.modulos) {
          this.activeModules = config.modulos;
        }
      },
      error: (err) => console.error('Error cargando config sidebar', err)
    });
  }

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  // 5. NUEVA FUNCIÓN: Verifica si el módulo está activo en la DB
  isActive(moduleKey: string): boolean {
    // Si el módulo es 'core', siempre es true
    if (moduleKey === 'core') return true;

    // Mapeo entre tu HTML (conceptos) y el Backend (propiedades)
    switch (moduleKey) {
      case 'recruitment': return this.activeModules.reclutamiento ?? true;
      case 'onboarding': return this.activeModules.onboarding ?? true;
      case 'performance': return this.activeModules.desempeno ?? true;

      case 'projects': return this.activeModules.proyectos ?? true;
      case 'goals': return this.activeModules.kpis ?? true;
      case 'attendance': return this.activeModules.asistencia ?? true;
      case 'timesheet': return this.activeModules.hojasTiempo ?? true; // <--- TIMESHEET

      case 'payroll': return this.activeModules.nomina ?? true;
      case 'benefits': return this.activeModules.beneficios ?? true;

      case 'training': return this.activeModules.capacitacion ?? true;
      case 'documents': return this.activeModules.documentos ?? true;
      case 'assets': return this.activeModules.activos ?? true;
      case 'reports': return this.activeModules.reportes ?? true;
      case 'communication': return this.activeModules.comunicacion ?? true;
      default: return true;
    }
  }
}