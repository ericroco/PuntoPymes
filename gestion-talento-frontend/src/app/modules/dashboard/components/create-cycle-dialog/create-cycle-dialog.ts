import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Para *ngIf
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <--- Para [formGroup]

// --- MATERIAL IMPORTS (Necesarios para que funcionen las etiquetas HTML) ---
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Necesario para el Datepicker
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el loading

// --- SERVICIO ---
import { PerformanceService } from '../../services/performance'; // Ajusta si tu archivo se llama performance.ts

@Component({
  selector: 'app-create-cycle-dialog',
  standalone: true, // <--- Importante para que funcionen los imports aquí
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

    // Validar fechas
    const { fechaInicio, fechaFin } = this.cycleForm.value;

    // Asegurarnos de que sean objetos Date para comparar
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      this.snackBar.open('La fecha de fin debe ser posterior a la de inicio', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.cycleForm.disable(); // Deshabilitar formulario mientras guarda

    // Llamamos al servicio
    this.performanceService.createCycle(this.cycleForm.value).subscribe({
      next: (res) => {
        this.snackBar.open('Ciclo creado exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Retornamos true para que el padre recargue
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