import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Para el ícono de $

// Interface para un Cargo (JobPosition)
interface JobPosition {
  id: number;
  name: string;
  department: string;
  minSalary: number;
  maxSalary: number;
}

// Interface para los datos que recibe el modal
interface DialogData {
  job: JobPosition | null; // null si es 'Crear', objeto si es 'Editar'
  availableDepartments: string[];
}

@Component({
  selector: 'app-add-job-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-job-dialog.html',
  styleUrls: ['./add-job-dialog.scss']
})
export class AddJobDialog implements OnInit {
  jobForm: FormGroup;
  isEditMode: boolean;
  availableDepartments: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddJobDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = !!this.data.job; // Si 'job' no es nulo, estamos en modo edición
    this.availableDepartments = this.data.availableDepartments || [];

    // Datos por defecto (para 'Crear') o datos existentes (para 'Editar')
    const jobData = this.data.job;

    // Inicializa el formulario
    this.jobForm = this.fb.group({
      name: [jobData?.name || '', Validators.required],
      department: [jobData?.department || null, Validators.required],
      minSalary: [jobData?.minSalary || 0, [Validators.required, Validators.min(0)]],
      maxSalary: [jobData?.maxSalary || 0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(); // Cierra sin devolver datos
  }

  onSave(): void {
    if (this.jobForm.valid) {
      // Devuelve solo los valores del formulario
      this.dialogRef.close(this.jobForm.value); 
    } else {
      this.jobForm.markAllAsTouched(); // Muestra errores si el form es inválido
    }
  }
}