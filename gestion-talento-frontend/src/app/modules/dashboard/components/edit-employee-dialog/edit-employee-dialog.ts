import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <--- Importante
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';

// Interfaces necesarias
export interface EditEmployeeData {
  employee: any;           // El empleado a editar
  roles: any[];            // Lista de roles disponibles
  managers: any[];         // Lista de posibles jefes
}

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatIconModule, MatDivider
  ],
  templateUrl: './edit-employee-dialog.html'
})
export class EditEmployeeDialog implements OnInit {
  editForm: FormGroup;

  // Guardamos la sucursal heredada aquí
  private targetSucursalId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeDialog>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: EditEmployeeData
  ) {
    // Inicializamos el formulario con los nuevos campos
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      telefono: [''],
      // 👇 NUEVOS CAMPOS
      rolId: ['', Validators.required],
      jefeId: [null] // Puede ser null
    });
  }

  ngOnInit(): void {
    if (this.data.employee) {
      const emp = this.data.employee;

      // 1. Cargar datos actuales
      this.editForm.patchValue({
        nombre: emp.nombre,
        apellido: emp.apellido,
        emailPersonal: emp.emailPersonal,
        telefono: emp.telefono,
        rolId: emp.rolId || emp.usuario?.rolId, // Ajusta según tu estructura
        jefeId: emp.jefeId
      });

      // Inicializar la sucursal actual por si no cambia de jefe
      this.targetSucursalId = emp.sucursalId;
    }

    // 2. Lógica de Herencia de Sucursal
    this.setupBranchInheritance();
  }

  setupBranchInheritance() {
    // Escuchar cambios en el select de Jefe
    this.editForm.get('jefeId')?.valueChanges.subscribe((newJefeId) => {
      if (newJefeId) {
        // Buscamos al jefe completo en la lista que recibimos
        const boss = this.data.managers.find(m => m.id === newJefeId);

        if (boss && boss.sucursalId) {
          // ¡EUREKA! Encontramos la sucursal del jefe
          this.targetSucursalId = boss.sucursalId;

          // Opcional: Avisar al usuario
          this.snackBar.open(
            `Se asignará la sucursal: ${boss.sucursal?.nombre || 'del jefe'}`,
            'Ok', { duration: 3000 }
          );
        }
      }
    });
  }

  onSave() {
    if (this.editForm.invalid) return;

    // Preparamos el objeto para enviar al Backend
    const updateData = {
      ...this.editForm.value,
      sucursalId: this.targetSucursalId // 👇 Aquí enviamos la sucursal heredada
    };

    this.dialogRef.close(updateData);
  }

  onCancel() {
    this.dialogRef.close();
  }
}