import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; // Importa FormGroup

// Importaciones de Angular Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Para el tipo de documento

@Component({
  selector: 'app-add-document-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule // Añade MatSelectModule
  ],
  templateUrl: './add-document-dialog.html',
  styleUrls: ['./add-document-dialog.scss']
})
export class AddDocumentDialog {
  documentForm: FormGroup;
  selectedFile: File | null = null; // Para guardar el archivo seleccionado

  // Tipos de documento predefinidos
  documentTypes: string[] = [
    'Certificación Externa',
    'Capacitación Interna',
    'Diploma Académico',
    'Documento Legal',
    'Reconocimiento Interno',
    'Otro'
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDocumentDialog>,
    private fb: FormBuilder
  ) {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      fileInput: [null, Validators.required] 
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.documentForm.patchValue({ fileInput: this.selectedFile });
      this.documentForm.get('fileInput')?.updateValueAndValidity();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.documentForm.valid && this.selectedFile) {
      this.dialogRef.close({
        documentType: this.documentForm.value.documentType,
        fileName: this.selectedFile.name
      });
    }
  }
}