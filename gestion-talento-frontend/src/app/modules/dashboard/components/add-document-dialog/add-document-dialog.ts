import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; // Importa FormGroup

// Importaciones de Angular Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Para el tipo de documento
import { MatIconModule } from '@angular/material/icon';

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
    MatSelectModule, // Añade MatSelectModule
    MatIconModule
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
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDocumentDialog>
  ) {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      fileName: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Si el usuario no puso nombre, usamos el del archivo
      if (!this.documentForm.get('fileName')?.value) {
        this.documentForm.patchValue({ fileName: file.name });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.documentForm.valid && this.selectedFile) {
      // Devolvemos todo: datos del form + el archivo real
      this.dialogRef.close({
        ...this.documentForm.value,
        file: this.selectedFile
      });
    }
  }
}