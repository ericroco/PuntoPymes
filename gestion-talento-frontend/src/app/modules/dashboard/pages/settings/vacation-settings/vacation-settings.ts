// ============================================
// vacation-settings.component.ts
// ============================================
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

// Material Imports
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Service Import (Ajusta la ruta según tu estructura)
import { CompanyConfigService } from '../../../services/company-config';

@Component({
  selector: 'app-vacation-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  templateUrl: './vacation-settings.html',
  styleUrls: ['./vacation-settings.scss']
})
export class VacationSettingsComponent implements OnInit {

  // Inyección de dependencias moderna
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private companyConfigService = inject(CompanyConfigService);

  policyForm!: FormGroup;
  isLoading = false;
  isSaving = false;

  // Valor por defecto para comparación y reset
  currentDiasPorAnio: number = 15;

  ngOnInit(): void {
    this.initForm();
    this.loadCurrentPolicy();
  }

  initForm(): void {
    this.policyForm = this.fb.group({
      // 🟢 CAMPO FUNCIONAL: Días de vacaciones por año
      diasPorAnio: [15, [
        Validators.required,
        Validators.min(1),
        Validators.max(365),
        Validators.pattern("^[0-9]*$") // Solo números enteros
      ]],

      // 🔒 CAMPOS MOCKUP (Deshabilitados visualmente)
      // Estos campos se muestran en la UI para dar sensación de completitud,
      // pero no se envían al backend en esta versión.
      diasMaximoAcumulables: [{ value: 30, disabled: true }],
      requiereAprobacion: [{ value: true, disabled: true }],
      diasMinimosAnticipacion: [{ value: 7, disabled: true }],
      permiteMediasDias: [{ value: false, disabled: true }],
      observaciones: [{ value: 'Política estándar 2025', disabled: true }]
    });
  }

  loadCurrentPolicy(): void {
    this.isLoading = true;

    this.companyConfigService.getConfig().subscribe({
      next: (config) => {
        // Extraemos el valor del backend, o usamos 15 por defecto
        const diasBackend = config?.vacaciones?.diasPorAnio;
        this.currentDiasPorAnio = (diasBackend !== undefined && diasBackend !== null) ? diasBackend : 15;

        // Actualizamos el formulario
        this.policyForm.patchValue({
          diasPorAnio: this.currentDiasPorAnio
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando configuración:', err);
        this.showNotification('Error al cargar la configuración actual', 'error');
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const diasInput = this.policyForm.get('diasPorAnio')?.value;

    // Construimos el payload específico para actualizar solo vacaciones
    const payload = {
      vacaciones: {
        diasPorAnio: Number(diasInput) // Aseguramos que sea número
      }
    };

    this.companyConfigService.updateConfig(payload).subscribe({
      next: (res) => {
        this.currentDiasPorAnio = diasInput; // Actualizamos estado local
        this.isSaving = false;

        // Marcamos el formulario como "pristine" (sin cambios pendientes)
        this.policyForm.markAsPristine();

        this.showNotification('Política de vacaciones actualizada correctamente', 'success');
      },
      error: (err) => {
        console.error('Error guardando configuración:', err);
        this.isSaving = false;
        this.showNotification('No se pudieron guardar los cambios', 'error');
      }
    });
  }

  onReset(): void {
    // Restaurar al último valor guardado en base de datos
    this.policyForm.patchValue({
      diasPorAnio: this.currentDiasPorAnio
    });
    this.policyForm.markAsPristine();
  }

  // Helper para notificaciones visuales
  private showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}