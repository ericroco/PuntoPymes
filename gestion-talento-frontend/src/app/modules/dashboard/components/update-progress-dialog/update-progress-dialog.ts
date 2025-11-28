import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

// --- 1. DEFINE LA INTERFAZ PARA LOS DATOS ---
export interface UpdateProgressData {
  currentProgress: number;
  goalTitle: string;
  completedTaskTitle?: string; // Opcional: Si viene de una tarea completada
}

@Component({
  selector: 'app-update-progress-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSliderModule, MatIconModule
  ],
  templateUrl: './update-progress-dialog.html',
  styleUrls: ['./update-progress-dialog.scss']
})
export class UpdateProgressDialog {
  progressForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateProgressDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UpdateProgressData
  ) {
    // Inicializamos el formulario con el progreso actual
    this.progressForm = this.fb.group({
      progress: [
        data.currentProgress,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      comment: [''] // Campo opcional para notas
    });

    // Opcional: Si quieres que el progreso SOLO aumente, descomenta esto:
    // this.progressForm.get('progress')?.addValidators(Validators.min(data.currentProgress));
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.progressForm.valid) {
      // Devolvemos el nuevo valor de progreso
      this.dialogRef.close(this.progressForm.value.progress);
    }
  }

  // Sincroniza el input numérico con el slider (si el slider emite evento 'input')
  onSliderInput(event: any) {
    this.progressForm.patchValue({ progress: event.value });
  }

  // Sincroniza si escriben manualmente
  onInputChange(event: any) {
    let val = parseInt(event.target.value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    // No hace falta patchValue aquí porque formControlName ya lo hace, 
    // pero podemos forzar límites si se salen.
  }
}