import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// --- MATERIAL IMPORTS ---
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// --- SERVICIO ---
import { PerformanceService } from '../../services/performance';

@Component({
  selector: 'app-create-cycle-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-cycle-dialog.html',
  styleUrls: ['./create-cycle-dialog.scss']
})
export class CreateCycleDialogComponent {

  cycleForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCycleDialogComponent>,
    private performanceService: PerformanceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cycleForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.cycleForm.invalid) return;

    const { nombre, fechaInicio, fechaFin } = this.cycleForm.value;

    // 1. Arreglo de Fechas: Normalizamos horas para evitar problemas de zona horaria
    const inicio = new Date(fechaInicio);
    inicio.setHours(0, 0, 0, 0); // Empieza al inicio del día

    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999); // Termina al final del día

    if (fin <= inicio) {
      this.snackBar.open('La fecha de fin debe ser posterior a la de inicio', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.cycleForm.disable();

    // 2. Preparar el envío (Payload)
    // El "as const" soluciona tu error de TypeScript, asegurando que el tipo sea exacto.
    const payload = {
      nombre: nombre,
      fechaInicio: inicio,
      fechaFin: fin,
      estado: 'ACTIVO' as const
    };

    // 3. Llamar al servicio
    this.performanceService.createCycle(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Ciclo creado y activado exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear el ciclo', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
        this.cycleForm.enable();
      }
    });
  }
}