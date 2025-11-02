import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// Interfaz para los datos que recibe
interface EvidenceData {
  taskTitle: string;
}

@Component({
  selector: 'app-upload-evidence-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './upload-evidence-dialog.html',
  styleUrls: ['./upload-evidence-dialog.scss']
})
export class UploadEvidenceDialog {
  evidenceForm: FormGroup;
  selectedFile: File | null = null;
  taskTitle: string;

  constructor(
    public dialogRef: MatDialogRef<UploadEvidenceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EvidenceData
  ) {
    this.taskTitle = data.taskTitle;
    this.evidenceForm = this.fb.group({
      fileInput: [null, Validators.required], // El archivo es obligatorio
      comment: [''] // Comentario opcional
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.evidenceForm.patchValue({ fileInput: this.selectedFile });
      this.evidenceForm.get('fileInput')?.updateValueAndValidity();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null); // Devuelve null si cancela
  }

  onConfirm(): void {
    if (this.evidenceForm.valid && this.selectedFile) {
      // Devuelve los datos (en una app real, subiría el archivo aquí)
      this.dialogRef.close({
        fileName: this.selectedFile.name,
        comment: this.evidenceForm.value.comment,
        file: this.selectedFile // El archivo en sí
      });
    }
  }
}