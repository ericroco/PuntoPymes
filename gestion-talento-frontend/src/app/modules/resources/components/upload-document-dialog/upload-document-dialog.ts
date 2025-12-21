import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentsService } from '../../../../core/services/documents';
import { ContextService } from '../../../../modules/dashboard/services/context';
import { BranchesService, Branch } from '../../../../modules/organization/services/branches'; // 👈 IMPORTANTE

@Component({
  selector: 'app-upload-document-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressBarModule
  ],
  templateUrl: './upload-document-dialog.html',
  styles: [`
    .full-width { width: 100%; margin-bottom: 10px; }
    .file-drop { border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; cursor: pointer; }
  `]
})
export class UploadDocumentDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private docsService = inject(DocumentsService);
  private contextService = inject(ContextService);
  private branchesService = inject(BranchesService); // 👈 Inyectamos servicio de sedes
  private dialogRef = inject(MatDialogRef<UploadDocumentDialogComponent>);

  branches: Branch[] = []; // Lista de sucursales
  categorias = ['LEGAL', 'MANUALES', 'POLÍTICAS', 'FORMATOS', 'OTROS'];
  isUploading = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    categoria: ['GENERAL', Validators.required],
    descripcion: [''],
    // 👇 Por defecto ponemos la sede actual, o null si es global
    sucursalId: [this.contextService.getBranch()],
    file: [null as File | null, Validators.required]
  });

  ngOnInit() {
    // Cargar las sucursales para llenar el select
    this.branchesService.getBranches().subscribe(data => {
      this.branches = data.filter(b => b.activa); // Solo activas
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ file });
      if (!this.form.get('nombre')?.value) {
        this.form.patchValue({ nombre: file.name });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    this.isUploading = true;
    const file = this.form.get('file')?.value!;
    const formValues = this.form.value;

    this.docsService.uploadFile(file).subscribe({
      next: (url) => {
        const dto = {
          nombre: formValues.nombre,
          categoria: formValues.categoria,
          descripcion: formValues.descripcion,
          url: url,
          // 👇 AHORA SÍ enviamos lo que el usuario seleccionó manualmente
          sucursalId: formValues.sucursalId
        };

        this.docsService.createDocument(dto).subscribe({
          next: (res) => this.dialogRef.close(res),
          error: () => this.isUploading = false
        });
      },
      error: () => this.isUploading = false
    });
  }
}