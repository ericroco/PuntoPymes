import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
// Importa la interfaz correcta
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
  styles: [`.full-width { width: 100%; margin-bottom: 10px; } .form-row { display: flex; gap: 10px; }`]
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
    const job = this.data.job;

    // Lógica para obtener el ID del departamento de forma segura
    let currentDeptId = '';
    if (job) {
      // Si ya es string (ID) o si es objeto con ID
      if (typeof job.departamentoId === 'string') {
        currentDeptId = job.departamentoId;
      } else if (job.departamento && typeof job.departamento === 'object') {
        currentDeptId = (job.departamento as any).id;
      }
    }

    // 👇 FORMULARIO CON NOMBRES EN ESPAÑOL (Coinciden con Backend)
    this.jobForm = this.fb.group({
      nombre: [job?.nombre || '', [Validators.required]],
      departamentoId: [currentDeptId, [Validators.required]],
      salarioMin: [job?.salarioMin || 0, [Validators.min(0)]],
      salarioMax: [job?.salarioMax || 0, [Validators.min(0)]]
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