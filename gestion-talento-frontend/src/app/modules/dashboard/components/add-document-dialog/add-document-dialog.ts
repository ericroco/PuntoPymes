import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { BranchesService, Branch } from '../../../../modules/organization/services/branches';
import { ContextService } from '../../../../modules/dashboard/services/context';

export interface AddDocumentDialogData {
  mode: 'employee' | 'company' | 'policy'; // 👈 Modos soportados
  title?: string;
}

@Component({
  selector: 'app-add-document-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-document-dialog.html',
  styleUrls: ['./add-document-dialog.scss']
})
export class AddDocumentDialog implements OnInit {
  documentForm: FormGroup;
  selectedFile: File | null = null;
  branches: Branch[] = [];

  // 1. Tipos para EMPLEADO (Por defecto)
  documentTypes: string[] = [
    'Certificación Externa',
    'Capacitación Interna',
    'Diploma Académico',
    'Documento Legal',
    'Reconocimiento Interno',
    'Otro'
  ];

  // 2. Tipos para POLÍTICAS
  policyTypes = ['POLÍTICA', 'REGLAMENTO', 'NORMATIVA', 'CÓDIGO DE ÉTICA'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDocumentDialog>,
    private branchesService: BranchesService,
    private contextService: ContextService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddDocumentDialogData
  ) {
    this.data = this.data || { mode: 'employee' };

    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      fileName: ['', Validators.required],
      sucursalId: [null]
    });
  }

  ngOnInit() {
    // CASO A: DOCUMENTOS CORPORATIVOS (Manuales, Formatos) -> Con Selector de Sede
    if (this.data.mode === 'company') {
      this.documentTypes = ['MANUAL', 'FORMATO', 'LEGAL', 'OTROS'];

      const currentBranch = this.contextService.getBranch();
      if (currentBranch) {
        this.documentForm.patchValue({ sucursalId: currentBranch });
      }

      this.branchesService.getBranches().subscribe(branches => {
        this.branches = branches.filter(b => b.activa);
      });
    }

    // CASO B: POLÍTICAS Y NORMAS -> Siempre Globales (Sin selector)
    else if (this.data.mode === 'policy') {
      // Usamos la lista de políticas
      this.documentTypes = this.policyTypes;
      // Forzamos NULL explícitamente (Global)
      this.documentForm.patchValue({ sucursalId: null });
      // NO cargamos branchesService ni mostramos el selector
    }

    // CASO C: EMPLEADO -> Se queda con los defaults del constructor
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      if (!this.documentForm.get('fileName')?.value) {
        this.documentForm.patchValue({ fileName: file.name });
      }
    }
  }

  onSave() {
    if (this.documentForm.valid && this.selectedFile) {
      this.dialogRef.close({
        ...this.documentForm.value,
        file: this.selectedFile
      });
    }
  }
}