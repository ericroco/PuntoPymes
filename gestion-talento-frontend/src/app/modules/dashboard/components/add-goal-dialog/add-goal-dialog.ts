import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio'; // <--- 1. IMPORTAR

// Importamos interfaces correctas
import { Employee } from '../../services/employees';
import { Department } from '../../services/catalog'; // <--- 2. IMPORTAR

interface DialogData {
  isAdmin: boolean;
  employees: Employee[];
  departments: Department[]; // <--- 3. AGREGAR A LA INTERFAZ
  currentUserId?: string;
}

@Component({
  selector: 'app-add-goal-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule,
    MatRadioModule // <--- AGREGAR AL IMPORT
  ],
  templateUrl: './add-goal-dialog.html',
  styles: [`
    .full-width { width: 100%; margin-bottom: 10px; }
    .progress-section { margin-top: 10px; display: flex; flex-direction: column; }
    .slider-label { margin-bottom: 5px; color: rgba(0,0,0,.6); font-size: 14px; font-weight: 500; }
  `]
})
export class AddGoalDialog implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddGoalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(5)]],

      // Nuevo campo de Tipo (Default PERSONAL)
      tipo: ['PERSONAL', Validators.required],

      // Empleado: Si no es admin, lo prellenamos. Si es admin, empieza requerido (para tipo PERSONAL)
      empleadoId: [
        !data.isAdmin ? data.currentUserId : '',
        !data.isAdmin ? [Validators.required] : []
      ],

      // Departamento: Empieza vacío
      departamentoId: [''],

      progreso: [0, [Validators.min(0), Validators.max(100)]]
    });

    // --- LÓGICA DINÁMICA PARA ADMIN ---
    if (data.isAdmin) {
      // Configuración inicial: Como tipo es PERSONAL, empleado es requerido
      this.form.get('empleadoId')?.setValidators([Validators.required]);

      // Escuchar cambios en el tipo de meta
      this.form.get('tipo')?.valueChanges.subscribe(tipo => {
        const empleadoCtrl = this.form.get('empleadoId');
        const deptoCtrl = this.form.get('departamentoId');

        if (tipo === 'PERSONAL') {
          // Habilitar Empleado, Deshabilitar Depto
          empleadoCtrl?.setValidators([Validators.required]);
          deptoCtrl?.clearValidators();
          deptoCtrl?.setValue('');
        } else {
          // DEPARTAMENTO
          // Habilitar Depto, Deshabilitar Empleado
          empleadoCtrl?.clearValidators();
          empleadoCtrl?.setValue('');
          deptoCtrl?.setValidators([Validators.required]);
        }

        // Actualizar estado de los controles
        empleadoCtrl?.updateValueAndValidity();
        deptoCtrl?.updateValueAndValidity();
      });
    }
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      // Clonamos el valor para no modificar el form directamente
      const cleanData = { ...this.form.value };

      // 🧹 LIMPIEZA: Si el ID es una cadena vacía, lo borramos del objeto
      // Esto evita que el backend intente validar un UUID vacío y falle.

      if (!cleanData.empleadoId || cleanData.empleadoId.trim() === '') {
        delete cleanData.empleadoId;
      }

      if (!cleanData.departamentoId || cleanData.departamentoId.trim() === '') {
        delete cleanData.departamentoId;
      }

      // Aseguramos que el tipo siempre se envíe
      if (!cleanData.tipo) {
        cleanData.tipo = 'PERSONAL';
      }

      console.log('Payload limpio:', cleanData); // Para depurar
      this.dialogRef.close(cleanData);
    } else {
      this.form.markAllAsTouched();
    }
  }
}