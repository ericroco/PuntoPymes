import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon'; // Asegúrate de importar MatIconModule

// --- 1. DEFINE LA INTERFAZ PARA LOS DATOS ---
// (Esto define la forma de los datos que esperamos recibir)
export interface UpdateProgressData {
  currentProgress: number;
  goalTitle: string;
  completedTaskTitle?: string; // <-- 2. AÑADE LA PROPIEDAD OPCIONAL AQUÍ
}

@Component({
  selector: 'app-update-progress-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSliderModule, MatIconModule // Asegúrate que MatIconModule esté aquí
  ],
  templateUrl: './update-progress-dialog.html',
  styleUrls: ['./update-progress-dialog.scss']
})
export class UpdateProgressDialog {
  progressForm: FormGroup;
  currentProgress: number;
  // Hacemos 'data' pública para que el HTML pueda acceder a 'data.goalTitle' y 'data.completedTaskTitle'
  data: UpdateProgressData; 

  constructor(
    public dialogRef: MatDialogRef<UpdateProgressDialog>,
    private fb: FormBuilder,
    // --- 3. USA LA INTERFAZ AL INYECTAR LOS DATOS ---
    @Inject(MAT_DIALOG_DATA) data: UpdateProgressData
  ) {
    this.data = data; // Almacena los datos completos
    this.currentProgress = data.currentProgress || 0;
    
    this.progressForm = this.fb.group({
      progress: [this.currentProgress, [Validators.required, Validators.min(this.currentProgress), Validators.max(100)]], // Validador 'min' opcional
      comment: ['']
    });

    // Añadimos validador 'min' para que el progreso solo pueda aumentar
    this.progressForm.get('progress')?.addValidators(Validators.min(this.currentProgress));
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.progressForm.valid) {
      this.dialogRef.close(this.progressForm.value); // Devuelve { progress, comment }
    }
  }

  // Sincroniza el input numérico con el slider
  onSliderChange(event: any) {
    this.progressForm.patchValue({ progress: event.value });
  }
  onInputChange(event: any) {
     const value = (event.target as HTMLInputElement).value;
     this.progressForm.patchValue({ progress: value });
  }
}