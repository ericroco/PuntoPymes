import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
// Servicios
import { EmployeesService } from '../../../dashboard/services/employees';
import { Branch } from '../../services/branches';

@Component({
  selector: 'app-add-branch-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatIconModule
  ],
  templateUrl: './add-branch-dialog.html',
  styleUrls: ['./add-branch-dialog.scss']
})
export class AddBranchDialogComponent implements OnInit {
  // 1. INYECCIONES (Todo con inject para asegurar el orden)
  private fb = inject(FormBuilder);
  private employeesService = inject(EmployeesService);
  public dialogRef = inject(MatDialogRef<AddBranchDialogComponent>);

  // 🔥 CORRECCIÓN AQUÍ: 
  // Usamos inject(MAT_DIALOG_DATA) en lugar del constructor.
  // Al ponerlo antes del branchForm, aseguramos que 'data' ya existe cuando se crea el form.
  public data: { branch?: Branch } = inject(MAT_DIALOG_DATA);

  // 2. FORMULARIO
  // Ahora TypeScript sabe que 'this.data' ya está inicializado arriba
  branchForm: FormGroup = this.fb.group({
    nombre: [this.data?.branch?.nombre || '', Validators.required],
    direccion: [this.data?.branch?.direccion || ''],
    telefono: [this.data?.branch?.telefono || ''],
    jefeId: [this.data?.branch?.jefeId || null]
  });

  employees: any[] = [];

  // El constructor queda vacío o lo puedes borrar
  constructor() { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        // Filtramos solo activos (opcional)
        this.employees = data.filter(e => e.estado === 'Activo');
      },
      error: (err) => console.error('Error cargando empleados', err)
    });
  }

  onSave() {
    if (this.branchForm.valid) {
      this.dialogRef.close(this.branchForm.value);
    } else {
      this.branchForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  // Helper para iniciales (si no hay foto)
  getInitials(name: string, lastname: string): string {
    return (name?.charAt(0) || '') + (lastname?.charAt(0) || '');
  }
}