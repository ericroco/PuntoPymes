import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { PayrollService, PeriodoNomina } from '../../services/payroll';

@Component({
  selector: 'app-process-payroll-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatSelectModule,
    MatFormFieldModule, FormsModule, MatIconModule, MatProgressBarModule
  ],
  template: `
    <div class="dialog-container">
      
      <div class="dialog-header">
        <h2>Procesar Nómina</h2>
        <button type="button" mat-icon-button class="close-btn" (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content class="custom-content">
        
        <div class="info-box blue" *ngIf="!isLoading">
          <mat-icon>info</mat-icon>
          <p>Esta acción calculará los sueldos, impuestos y novedades para todos los empleados activos.</p>
        </div>

        <mat-progress-bar mode="indeterminate" *ngIf="isLoading" class="custom-progress"></mat-progress-bar>

        <div class="form-section" *ngIf="!isLoading">
          <label class="field-label">Selecciona el Período</label>
          <mat-form-field appearance="outline" class="custom-field full-width" subscriptSizing="dynamic">
            <mat-select [(ngModel)]="selectedPeriodId" [disabled]="openPeriods.length === 0" placeholder="-- Seleccionar --">
              <mat-option *ngFor="let p of openPeriods" [value]="p.id">
                {{ p.nombre }} ({{ p.fechaInicio | date:'dd/MM' }} - {{ p.fechaFin | date:'dd/MM' }})
              </mat-option>
            </mat-select>
            <mat-icon matSuffix>date_range</mat-icon>
          </mat-form-field>
          
          <div *ngIf="openPeriods.length === 0" class="empty-state-message">
            <mat-icon>event_busy</mat-icon> No hay períodos abiertos. Ve a Configuración.
          </div>
        </div>

        <div class="warning-box" *ngIf="selectedPeriodId">
          <mat-icon>warning_amber</mat-icon>
          <p>Asegúrate de haber registrado todas las novedades (bonos/multas) antes de continuar.</p>
        </div>

      </mat-dialog-content>

      <div class="dialog-footer">
        <button mat-flat-button class="btn-cancel" (click)="onCancel()" [disabled]="isLoading">
          Cancelar
        </button>
        <button mat-flat-button color="primary" class="btn-save" (click)="onProcess()" 
                [disabled]="!selectedPeriodId || isLoading">
          <mat-icon>play_circle_filled</mat-icon> Procesar Ahora
        </button>
      </div>

    </div>
  `,
  styles: [`
    // ============================================
    // ESTRUCTURA PRINCIPAL
    // ============================================
    .dialog-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 700px; 
      background-color: var(--color-surface);
      box-sizing: border-box;
      max-height: 90vh;
    }

    // ============================================
    // HEADER
    // ============================================
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1.5rem 1rem;
      border-bottom: 1px solid var(--color-border-light);
      background-color: var(--color-surface);

      h2 {
        margin: 0;
        font-family: var(--font-family-base);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .close-btn {
        color: var(--color-text-secondary);
        &:hover { background-color: var(--color-surface-variant); color: var(--color-text-primary); }
      }
    }

    // ============================================
    // CONTENIDO SCROLLABLE
    // ============================================
    .custom-content {
      padding: 1.5rem !important;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      overflow-y: auto;
      overflow-x: hidden;
    }

    // CAJAS DE INFORMACIÓN (CORREGIDA)
    .info-box {
      display: flex;
      gap: 12px; // Este espacio ahora se respetará
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 0.9rem;
      line-height: 1.5;
      align-items: flex-start;

      // FIX: Evita que el icono se encoja si el texto es largo
      mat-icon {
        flex-shrink: 0;
      }

      // FIX: Quita márgenes por defecto del párrafo para alineación perfecta
      p {
        margin: 0;
      }

      &.blue {
        background-color: var(--color-info-light);
        color: var(--color-text-primary);
        border: 1px solid rgba(59, 130, 246, 0.2);
        mat-icon { color: var(--color-info); }
      }
    }

    .warning-box {
      display: flex;
      gap: 12px;
      background-color: var(--color-warning-light); 
      color: var(--color-warning-dark, #B45309);
      padding: 12px 16px; 
      border-radius: 12px; 
      font-size: 0.9rem;
      align-items: center;
      border: 1px solid rgba(245, 158, 11, 0.2);
      
      mat-icon { flex-shrink: 0; }
      p { margin: 0; }
    }

    .empty-state-message {
      color: var(--color-danger);
      font-size: 0.85rem;
      display: flex; 
      align-items: center; 
      gap: 6px; 
      margin-top: 8px;
    }

    // ============================================
    // INPUTS PERSONALIZADOS (Soft UI)
    // ============================================
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .field-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        margin-left: 4px;
      }
    }

    .custom-field {
      width: 100%;

      ::ng-deep .mat-mdc-form-field-subscript-wrapper { display: none; } 

      ::ng-deep .mat-mdc-text-field-wrapper {
        background-color: #F3F4F6 !important; // Gris suave
        border-radius: 12px !important;
        height: 48px;
        padding: 0 12px;
        border: 1px solid transparent;
        display: flex;
        align-items: center;

        .mdc-notched-outline__leading,
        .mdc-notched-outline__notch,
        .mdc-notched-outline__trailing { border: none !important; }
      }

      &.mat-focused ::ng-deep .mat-mdc-text-field-wrapper {
        background-color: white !important;
        border-color: var(--color-primary) !important;
        box-shadow: 0 0 0 3px var(--color-primary-subtle);
      }

      ::ng-deep .mat-mdc-form-field-flex {
        height: 100%;
        align-items: center;
      }

      mat-icon { color: var(--color-text-muted); }
    }

    // ============================================
    // FOOTER (Botones Pill)
    // ============================================
    .dialog-footer {
      padding: 1rem 1.5rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid var(--color-border-light);
      background-color: var(--color-surface);

      // Botón Cancelar (Pill + Gris)
      .btn-cancel {
        background-color: #F1F5F9 !important; 
        color: var(--color-text-secondary) !important;
        border-radius: 999px !important; // Pill Shape
        height: 44px;
        padding: 0 24px;
        font-weight: 600;
        border: none;
        box-shadow: none !important;

        &:hover {
          background-color: #E2E8F0 !important; 
          color: var(--color-text-primary) !important;
        }
      }

      // Botón Procesar (Pill + Gradiente)
      .btn-save {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)) !important;
        color: white !important;
        border-radius: 999px !important; // Pill Shape
        height: 44px;
        padding: 0 24px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.45);
        }

        &:disabled {
          background: #E2E8F0 !important;
          color: #94A3B8 !important;
          box-shadow: none !important;
          transform: none !important;
        }
      }
    }

    ::ng-deep .custom-progress {
      height: 4px;
      border-radius: 2px;
    }
  `]
})
export class ProcessPayrollDialog implements OnInit {
  openPeriods: PeriodoNomina[] = [];
  selectedPeriodId: string | null = null;
  isLoading = false;

  constructor(
    private payrollService: PayrollService,
    private dialogRef: MatDialogRef<ProcessPayrollDialog>
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.payrollService.getPeriodos().subscribe({
      next: (periods) => {
        this.openPeriods = periods.filter(p => p.estado === 'Abierto');
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onProcess() {
    if (!this.selectedPeriodId) return;
    this.dialogRef.close(this.selectedPeriodId);
  }

  onCancel() {
    this.dialogRef.close();
  }
}