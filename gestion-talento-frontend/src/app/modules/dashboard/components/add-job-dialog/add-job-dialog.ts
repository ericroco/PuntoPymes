import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Importamos las interfaces correctas del servicio
import { JobPosition, Department } from '../../services/catalog';

interface DialogData {
  job?: JobPosition;
  availableDepartments: Department[];
}

@Component({
  selector: 'app-add-job-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-job-dialog.html',
  styles: [
    `.full-width { width: 100%; margin-bottom: 10px; }
     .form-row { display: flex; gap: 15px; }
     .form-field { flex: 1; }`
  ]
})
export class AddJobDialog implements OnInit {
  jobForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddJobDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = !!this.data.job;
    const jobData = this.data.job;

    // --- LÓGICA DE EXTRACCIÓN SEGURA DEL ID ---
    let currentDeptId = '';

    if (jobData) {
      // Caso 1: Viene la propiedad departamentoId (Lo ideal)
      if (jobData.departamentoId) {
        currentDeptId = jobData.departamentoId;
      }
      // Caso 2: Viene el objeto completo 'departamento'
      else if (jobData.departamento && typeof jobData.departamento === 'object') {
        currentDeptId = jobData.departamento.id;
      }
      // Caso 3: Viene 'departamento' pero es solo un string (ID)
      // Aquí usamos 'typeof' para evitar el error de TypeScript
      else if (typeof jobData.departamento === 'string') {
        currentDeptId = jobData.departamento;
      }
      // Si es undefined, se queda en '' y el validador required se encargará
    }

    // Inicializamos el formulario
    this.jobForm = this.fb.group({
      nombre: [jobData?.nombre || '', [Validators.required]],
      departamentoId: [currentDeptId, [Validators.required]],
      salarioMin: [jobData?.salarioMin || 0, [Validators.required, Validators.min(0)]],
      salarioMax: [jobData?.salarioMax || 0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.jobForm.valid) {
      this.dialogRef.close(this.jobForm.value);
    } else {
      this.jobForm.markAllAsTouched();
    }
  }
}