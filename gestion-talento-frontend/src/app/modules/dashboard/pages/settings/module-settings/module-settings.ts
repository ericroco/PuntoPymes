import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Material Imports
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import Tooltip
import { MatIconModule } from '@angular/material/icon';     // Import Icon
// Reusable Header
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Adjust path
import { RouterModule } from '@angular/router'; // Import RouterModule for links

// Interface for cleaner module configuration
interface ModuleSetting {
  key: string; // Internal key (e.g., 'recruitment')
  label: string; // Display label (e.g., 'Reclutamiento (ATS)')
  hint: string; // Description
  isActive: boolean; // Current state
  canBeDisabled: boolean; // Can this module be turned off? (Core modules might be false)
  configRoute?: string; // Optional route for specific config page
  requires?: string[]; // Optional: List of keys this module depends on
  requiredBy?: string[]; // Optional: List of keys that depend on this module
}

@Component({
  selector: 'app-module-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Add RouterModule
    MatSlideToggleModule,
    MatButtonModule,
    MatTooltipModule, // Add Tooltip
    MatIconModule,    // Add Icon
    SubpageHeader
  ],
  templateUrl: './module-settings.html',
  styleUrls: ['./module-settings.scss']
})
export class ModuleSettings {

  // Configuration array
  moduleSettings: ModuleSetting[] = [
    { key: 'core_hr', label: 'Gestión de Personal (Core)', hint: 'Perfiles, organigrama, documentos base.', isActive: true, canBeDisabled: false, configRoute: '/dashboard/settings/profile-fields', requires: [], requiredBy: ['payroll', 'lms', 'assets', 'timesheets', 'culture'] }, // Example core module
    { key: 'recruitment', label: 'Reclutamiento (ATS)', hint: 'Gestión de vacantes y candidatos.', isActive: true, canBeDisabled: true, configRoute: undefined, requires: ['core_hr'], requiredBy: [] },
    { key: 'payroll', label: 'Nómina y Compensación', hint: 'Salarios, beneficios, novedades.', isActive: true, canBeDisabled: true, configRoute: '/dashboard/settings/payroll', requires: ['core_hr'], requiredBy: [] },
    { key: 'lms', label: 'Desarrollo y Capacitación', hint: 'Cursos, planes de carrera.', isActive: true, canBeDisabled: true, configRoute: '/dashboard/settings/lms', requires: ['core_hr'], requiredBy: [] },
    { key: 'timesheets', label: 'Hojas de Horas', hint: 'Registro de horas por proyecto.', isActive: false, canBeDisabled: true, configRoute: undefined, requires: ['core_hr'], requiredBy: [] },
    { key: 'culture', label: 'Cultura y Comunicación', hint: 'Anuncios, encuestas.', isActive: true, canBeDisabled: true, configRoute: undefined, requires: ['core_hr'], requiredBy: [] },
    { key: 'assets', label: 'Gestión de Activos', hint: 'Inventario y asignación.', isActive: true, canBeDisabled: true, configRoute: undefined, requires: ['core_hr'], requiredBy: [] },
    // Add expenses, helpdesk etc. following this pattern
  ];

  constructor() {}

  // Function to check if disabling is allowed (considering dependencies)
  isToggleDisabled(module: ModuleSetting): boolean {
    if (!module.canBeDisabled) return true; // Cannot disable core modules

    // Check if any *active* module requires this one
    return this.moduleSettings.some(otherModule =>
      otherModule.isActive && // If the other module is active...
      otherModule.requires?.includes(module.key) // ...and it requires the current module
    );
  }

  // Generate tooltip text explaining why a module might be disabled
  getDisabledTooltip(module: ModuleSetting): string {
    if (!module.canBeDisabled) {
      return 'Este módulo es esencial y no puede desactivarse.';
    }
    const dependingModules = this.moduleSettings
      .filter(other => other.isActive && other.requires?.includes(module.key))
      .map(other => other.label);

    if (dependingModules.length > 0) {
      return `Requerido por: ${dependingModules.join(', ')}. Desactiva ${dependingModules.length > 1 ? 'estos módulos' : 'este módulo'} primero.`;
    }
    return ''; // Should not happen if isToggleDisabled is correct
  }

  saveModuleSettings(): void {
    // Extract only key and isActive status to send to backend
    const configToSave = this.moduleSettings.reduce((acc, mod) => {
      acc[mod.key] = mod.isActive;
      return acc;
    }, {} as { [key: string]: boolean });

    console.log('Saving module settings:', configToSave);
    // TODO: Call API Service
  }
}