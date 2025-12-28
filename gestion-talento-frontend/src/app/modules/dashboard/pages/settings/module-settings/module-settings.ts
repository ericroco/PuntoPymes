import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes y Servicios
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { CompanyConfigService, ConfiguracionModulos } from '../../../services/company-config';

interface ModuleSetting {
  key: string;          // Clave interna del Frontend
  label: string;        // Nombre visible
  hint: string;         // Descripción corta
  icon: string;         // Icono para referencia visual
  isActive: boolean;    // Estado actual
  canBeDisabled: boolean; // Si es false, es un módulo Core
  configRoute?: string;   // Ruta a su configuración específica
  requires?: string[];    // Módulos que necesita activados para funcionar
}

@Component({
  selector: 'app-module-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SubpageHeader
  ],
  templateUrl: './module-settings.html',
  styleUrls: ['./module-settings.scss']
})
export class ModuleSettings implements OnInit {

  isLoading = false;

  moduleSettings: ModuleSetting[] = [
    // 1. CORE (INDISPENSABLE)
    {
      key: 'core_hr',
      label: 'Gestión de Personal (Core)',
      hint: 'Directorio, Organigrama, Políticas y Perfiles.',
      icon: 'domain',
      isActive: true,       // SIEMPRE ACTIVO
      canBeDisabled: false, // NO SE PUEDE DESACTIVAR NUNCA
      configRoute: '/dashboard/settings/profile-fields',
      requires: []
    },

    // 2. TALENTO HUMANO
    {
      key: 'recruitment',
      label: 'Reclutamiento (ATS)',
      hint: 'Vacantes, candidatos y pipeline de selección.',
      icon: 'work_outline',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },
    {
      key: 'onboarding',
      label: 'Onboarding',
      hint: 'Procesos de bienvenida y tareas de ingreso.',
      icon: 'how_to_reg',
      isActive: true,
      canBeDisabled: true,
      requires: ['recruitment'] // Depende de que exista reclutamiento
    },
    {
      key: 'performance',
      label: 'Evaluaciones de Desempeño',
      hint: 'Revisiones 360°, competencias y feedback.',
      icon: 'stars',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },

    // 3. OPERACIONES
    {
      key: 'projects',
      label: 'Gestión de Proyectos (Sprints)',
      hint: 'Tableros Kanban, tareas y sprints.',
      icon: 'view_kanban',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },
    {
      key: 'goals',
      label: 'Metas y Objetivos (OKRs)',
      hint: 'Seguimiento de metas empresariales y personales.',
      icon: 'flag',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },
    {
      key: 'attendance',
      label: 'Control de Asistencia',
      hint: 'Marcajes, geocerca, horarios y atrasos.',
      icon: 'event_available',
      isActive: true,
      canBeDisabled: true,
      configRoute: '/dashboard/settings/attendance',
      requires: ['core_hr']
    },
    {
      key: 'timesheet',
      label: 'Hojas de Tiempo (Timesheets)',
      hint: 'Registro de horas dedicadas a proyectos.',
      icon: 'schedule',
      isActive: true,
      canBeDisabled: true,
      requires: ['projects'] // Depende de proyectos
    },

    // 4. COMPENSACIÓN
    {
      key: 'payroll',
      label: 'Nómina',
      hint: 'Cálculo de roles, pagos y provisiones.',
      icon: 'receipt_long',
      isActive: true,
      canBeDisabled: true,
      configRoute: '/dashboard/settings/payroll',
      requires: ['attendance'] // Depende de asistencia (normalmente)
    },
    {
      key: 'benefits',
      label: 'Gestión de Beneficios',
      hint: 'Solicitud de préstamos y beneficios corporativos.',
      icon: 'card_giftcard',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },

    // 5. DESARROLLO
    {
      key: 'training',
      label: 'Capacitación (LMS)',
      hint: 'Cursos, planes de carrera y certificaciones.',
      icon: 'school',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },

    // 6. RECURSOS
    {
      key: 'documents',
      label: 'Gestión Documental',
      hint: 'Repositorio digital de documentos.',
      icon: 'folder',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },
    {
      key: 'assets',
      label: 'Activos y Equipos',
      hint: 'Inventario de computadoras y asignaciones.',
      icon: 'devices',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },

    // 7. ANÁLISIS
    {
      key: 'reports',
      label: 'Analítica y Reportes',
      hint: 'Dashboards avanzados y exportación de datos.',
      icon: 'analytics',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    },

    // 8. COMUNICACIÓN
    {
      key: 'communication',
      label: 'Comunicación Interna',
      hint: 'Anuncios, noticias y encuestas de clima.',
      icon: 'campaign',
      isActive: true,
      canBeDisabled: true,
      requires: ['core_hr']
    }
  ];
  constructor(
    private configService: CompanyConfigService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  // --- CARGAR CONFIGURACIÓN DEL BACKEND ---
  loadSettings() {
    this.isLoading = true;
    this.configService.getConfig().subscribe({
      next: (config) => {
        const modulos = config.modulos || {};

        this.updateToggle('recruitment', modulos.reclutamiento);
        this.updateToggle('onboarding', modulos.onboarding);
        this.updateToggle('performance', modulos.desempeno);

        this.updateToggle('projects', modulos.proyectos);
        this.updateToggle('goals', modulos.kpis);
        this.updateToggle('attendance', modulos.asistencia);
        this.updateToggle('timesheet', modulos.hojasTiempo); // <--- AQUÍ ESTÁ EL TIMESHEET

        this.updateToggle('payroll', modulos.nomina);
        this.updateToggle('benefits', modulos.beneficios);

        this.updateToggle('training', modulos.capacitacion);
        this.updateToggle('documents', modulos.documentos);
        this.updateToggle('assets', modulos.activos);
        this.updateToggle('reports', modulos.reportes);
        this.updateToggle('communication', modulos.comunicacion);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando configuración:', err);
        this.isLoading = false;
        // Opcional: Mostrar error al usuario
      }
    });
  }

  // --- GUARDAR CONFIGURACIÓN AL BACKEND ---
  saveModuleSettings(): void {
    this.isLoading = true;

    // Mapeo: Frontend (Sidebar Key) -> Backend DTO (Español)
    // Solo enviamos lo que el Backend soporta actualmente en 'ConfiguracionModulos'
    const modulosDto: ConfiguracionModulos = {
      reclutamiento: this.getModuleValue('recruitment'),
      onboarding: this.getModuleValue('onboarding'),
      desempeno: this.getModuleValue('performance'),

      proyectos: this.getModuleValue('projects'),
      kpis: this.getModuleValue('goals'),
      asistencia: this.getModuleValue('attendance'),
      hojasTiempo: this.getModuleValue('timesheet'), // <--- AQUÍ ESTÁ EL TIMESHEET

      nomina: this.getModuleValue('payroll'),
      beneficios: this.getModuleValue('benefits'),

      capacitacion: this.getModuleValue('training'),
      documentos: this.getModuleValue('documents'),
      activos: this.getModuleValue('assets'),
      reportes: this.getModuleValue('reports'),
      comunicacion: this.getModuleValue('communication')
    };

    this.configService.updateConfig({ modulos: modulosDto }).subscribe({
      next: () => {
        this.snackBar.open('Configuración de módulos guardada', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        // Opcional: Recargar página para actualizar sidebar inmediatamente
        // window.location.reload(); 
      },
      error: (err) => {
        console.error('Error guardando:', err);
        this.snackBar.open('Error al guardar cambios', 'Cerrar', { duration: 3000, panelClass: 'error-snackbar' });
        this.isLoading = false;
      }
    });
  }

  // --- LÓGICA DE UI ---

  private updateToggle(key: string, value: boolean | undefined) {
    if (value === undefined) return;
    const module = this.moduleSettings.find(m => m.key === key);
    if (module) module.isActive = value;
  }

  private getModuleValue(key: string): boolean {
    return this.moduleSettings.find(m => m.key === key)?.isActive ?? false;
  }

  // Verifica si un toggle debe estar deshabilitado
  isToggleDisabled(module: ModuleSetting): boolean {
    // 1. Si es Core, nunca se desactiva
    if (!module.canBeDisabled) return true;

    // 2. Si otro módulo activo depende de este
    return this.moduleSettings.some(otherModule =>
      otherModule.isActive &&
      otherModule.requires?.includes(module.key)
    );
  }

  // Genera el mensaje de por qué está deshabilitado
  getDisabledTooltip(module: ModuleSetting): string {
    if (!module.canBeDisabled) {
      return 'Este es un módulo núcleo del sistema y no puede desactivarse.';
    }

    const depencencies = this.moduleSettings
      .filter(other => other.isActive && other.requires?.includes(module.key))
      .map(other => other.label);

    if (depencencies.length > 0) {
      return `No puedes desactivarlo porque es requerido por: ${depencencies.join(', ')}.`;
    }
    return '';
  }
}