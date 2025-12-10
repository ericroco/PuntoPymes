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
    <h2 mat-dialog-title>Procesar Nómina</h2>
    
    <div mat-dialog-content>
      <p class="intro-text">
        Esta acción calculará los sueldos, impuestos y novedades para todos los empleados activos.
      </p>

      <mat-progress-bar mode="indeterminate" *ngIf="isLoading"></mat-progress-bar>

      <div class="form-container" *ngIf="!isLoading">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Selecciona el Período</mat-label>
          <mat-select [(ngModel)]="selectedPeriodId" [disabled]="openPeriods.length === 0">
            <mat-option *ngFor="let p of openPeriods" [value]="p.id">
              {{ p.nombre }} ({{ p.fechaInicio | date:'dd/MM' }} - {{ p.fechaFin | date:'dd/MM' }})
            </mat-option>
          </mat-select>
          <mat-hint *ngIf="openPeriods.length > 0">Solo se muestran períodos abiertos.</mat-hint>
          <mat-error *ngIf="openPeriods.length === 0">
            No hay períodos abiertos. Ve a Configuración.
          </mat-error>
        </mat-form-field>
      </div>

      <div class="warning-box" *ngIf="selectedPeriodId">
        <mat-icon>warning</mat-icon>
        <p>Asegúrate de haber registrado todas las novedades (bonos/multas) antes de continuar.</p>
      </div>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-stroked-button (click)="onCancel()" [disabled]="isLoading">Cancelar</button>
      <button mat-flat-button color="primary" (click)="onProcess()" 
              [disabled]="!selectedPeriodId || isLoading">
        <mat-icon>play_circle_filled</mat-icon> Procesar Ahora
      </button>
    </div>
  `,
  styles: [`
    .intro-text { color: #666; margin-bottom: 20px; }
    .full-width { width: 100%; }
    .warning-box {
      background-color: #fff3e0; color: #e65100;
      padding: 10px; border-radius: 8px; display: flex; gap: 10px; align-items: center;
      margin-top: 10px; font-size: 0.9rem;
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
    // Traemos todos y filtramos en el cliente por seguridad, o usamos un endpoint específico
    this.payrollService.getPeriodos().subscribe({
      next: (periods) => {
        // Solo mostramos los que están 'Abierto'
        this.openPeriods = periods.filter(p => p.estado === 'Abierto');
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onProcess() {
    if (!this.selectedPeriodId) return;
    this.dialogRef.close(this.selectedPeriodId); // Devolvemos el ID seleccionado
  }

  onCancel() {
    this.dialogRef.close();
  }
}