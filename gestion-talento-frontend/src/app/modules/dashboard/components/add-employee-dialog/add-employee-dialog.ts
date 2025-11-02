import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper'; // <-- Importar Stepper
import { MatIconModule } from '@angular/material/icon';

// Interfaz para los datos recibidos
interface DialogData {
  availableJobs: JobPosition[];
  availableManagers: Manager[];
}
interface JobPosition {
  id: number;
  name: string;
  department: string;
  minSalary: number;
  maxSalary: number;
}
interface Manager { id: number | string; name: string; }

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatStepperModule, MatIconModule, MatDivider // <-- Añadir MatStepperModule
  ],
  templateUrl: './add-employee-dialog.html',
  styleUrls: ['./add-employee-dialog.scss']
})
export class AddEmployeeDialog implements OnInit {
  // Un FormGroup por cada paso
  step1Form: FormGroup; // Personal
  step2Form: FormGroup; // Laboral
  step3Form: FormGroup; // Compensación

  // Listas para los dropdowns
  availableJobs: JobPosition[] = [];
  availableManagers: Manager[] = [];
  selectedJobSalaryRange: string | null = null;
  // Propiedad para el hint de salario (asegúrate de que esté definida en la clase

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.availableJobs = data.availableJobs || [];
    this.availableManagers = data.availableManagers || [];

    // --- Paso 1 (COMPLETADO) ---
    this.step1Form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [null] // Opcional
    });

    // --- Paso 2 (Modificado) ---
    this.step2Form = this.fb.group({
      job: [null, Validators.required], // Almacenará el objeto JobPosition completo
      reportsTo: [null, Validators.required],
      hireDate: [new Date(), Validators.required] // Fecha de hoy por defecto
    });

    // --- Paso 3 (Modificado) ---
    this.step3Form = this.fb.group({
      initialSalary: [null, [Validators.required, Validators.min(1)]] // Validación base
    });

    // --- LÓGICA CLAVE: Escuchar cambios en el Cargo seleccionado ---
    this.step2Form.get('job')?.valueChanges.subscribe((selectedJob: JobPosition | null) => {
      if (selectedJob) {
        // Rellenar automáticamente el departamento (y deshabilitarlo)
        // (Asegúrate de que el control 'department' exista en step2Form si quieres hacer esto)
        // this.step2Form.patchValue({ department: selectedJob.department });

        // Actualizar el hint de salario
        this.selectedJobSalaryRange = `Rango sugerido: ${selectedJob.minSalary} - ${selectedJob.maxSalary}`;

        // --- VALIDACIÓN DE RANGO ---
        // Añadir validadores dinámicamente al campo de salario
        this.step3Form.get('initialSalary')?.setValidators([
          Validators.required,
          Validators.min(selectedJob.minSalary),
          Validators.max(selectedJob.maxSalary)
        ]);
        this.step3Form.get('initialSalary')?.updateValueAndValidity(); // Actualiza la validación

      } else {
        // Limpiar si no hay cargo seleccionado
        this.selectedJobSalaryRange = null;
        // Resetea los validadores al estado base
        this.step3Form.get('initialSalary')?.setValidators([Validators.required, Validators.min(1)]);
        this.step3Form.get('initialSalary')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Se llama en el último paso para guardar
  onSave(): void {
    // Doble chequeo de validez (aunque el botón de guardar debería estar deshabilitado)
    if (this.step1Form.invalid || this.step2Form.invalid || this.step3Form.invalid) {
      // Marca todos los campos como tocados para mostrar errores en todos los pasos (si el usuario intenta forzar el guardado)
      this.step1Form.markAllAsTouched();
      this.step2Form.markAllAsTouched();
      this.step3Form.markAllAsTouched();
      return;
    }

    // Helper de formato de fecha (maneja zona horaria)
    const formatDt = (date: Date | null): string | null => {
      if (!date) return null;
      // Ajusta la fecha para evitar problemas de zona horaria (resta el offset)
      const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      // Devuelve solo la parte de la fecha en formato YYYY-MM-DD
      return adjustedDate.toISOString().split('T')[0];
    };

    // Combina los datos de todos los formularios
    const finalData = {
      personal: {
        ...this.step1Form.value,
        dateOfBirth: formatDt(this.step1Form.value.dateOfBirth) // Formatea la fecha de nacimiento
      },
      job: {
        ...this.step2Form.value,
        // Extraer datos clave del objeto 'job'
        role: this.step2Form.value.job.name,
        department: this.step2Form.value.job.department,
        hireDate: formatDt(this.step2Form.value.hireDate) // Formatea la fecha de contratación
      },
      compensation: this.step3Form.value
    };

    // Eliminamos el objeto 'job' completo que ya no necesitamos en la data final
    delete finalData.job.job;

    // Cerramos el modal y devolvemos el objeto combinado
    this.dialogRef.close(finalData);
  }
}