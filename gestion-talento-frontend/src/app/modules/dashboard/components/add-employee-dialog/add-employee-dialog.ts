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
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { EmployeesService, CreateEmployeeDto } from '../../services/employees';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces para los datos recibidos
interface DialogData {
  availableJobs: JobPosition[];
  availableManagers: Manager[];
}
interface JobPosition {
  id: number | string;
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
    MatNativeDateModule, MatStepperModule, MatIconModule, MatDivider
  ],
  templateUrl: './add-employee-dialog.html',
  styleUrls: ['./add-employee-dialog.scss']
})
export class AddEmployeeDialog implements OnInit {
  isLoading = false;
  step1Form: FormGroup; // Personal
  step2Form: FormGroup; // Laboral
  step3Form: FormGroup; // Compensación

  availableJobs: JobPosition[] = [];
  availableManagers: Manager[] = [];
  selectedJobSalaryRange: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private employeesService: EmployeesService,
    private snackBar: MatSnackBar
  ) {
    this.availableJobs = data.availableJobs || [];
    this.availableManagers = data.availableManagers || [];

    // Paso 1
    this.step1Form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [null]
    });

    // Paso 2
    this.step2Form = this.fb.group({
      job: [null, Validators.required],
      reportsTo: [null, Validators.required], // Este campo es para jefeId, asegúrate de mapearlo si lo usas
      hireDate: [new Date(), Validators.required]
    });

    // Paso 3
    this.step3Form = this.fb.group({
      initialSalary: [null, [Validators.required, Validators.min(1)]]
    });

    // Lógica de salario
    this.step2Form.get('job')?.valueChanges.subscribe((selectedJob: JobPosition | null) => {
      if (selectedJob) {
        this.selectedJobSalaryRange = `Rango sugerido: ${selectedJob.minSalary} - ${selectedJob.maxSalary}`;
        this.step3Form.get('initialSalary')?.setValidators([
          Validators.required,
          Validators.min(selectedJob.minSalary),
          Validators.max(selectedJob.maxSalary)
        ]);
        this.step3Form.get('initialSalary')?.updateValueAndValidity();
      } else {
        this.selectedJobSalaryRange = null;
        this.step3Form.get('initialSalary')?.setValidators([Validators.required, Validators.min(1)]);
        this.step3Form.get('initialSalary')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Método Helper para formatear fechas a 'YYYY-MM-DD'
  private formatDate(date: Date | null): string | undefined {
    if (!date) return undefined;
    const d = new Date(date);
    // Ajustar zona horaria para evitar que se retrase un día
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  onSave(): void {
    if (this.step1Form.invalid || this.step2Form.invalid || this.step3Form.invalid) {
      this.step1Form.markAllAsTouched();
      this.step2Form.markAllAsTouched();
      this.step3Form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // 1. Procesar Nombre y Apellido
    const rawName = this.step1Form.value.name || '';
    const fullName = rawName.trim().split(' ');
    const nombre = fullName[0];
    // Si no puso apellido, ponemos un punto para que no falle la validación del backend
    const apellido = fullName.length > 1 ? fullName.slice(1).join(' ') : '.';

    // 2. IDs (Usamos los hardcoded si no vienen del formulario)
    // ⚠️ IMPORTANTE: Asegúrate de que estos UUIDs existen en tu tabla 'roles' y 'cargos' de Postgres
    const HARDCODED_ROL_ID = '63b5fcb2-2fd6-4454-bf05-0f75a13a1227';
    const cargoSeleccionado = this.step2Form.value.job;
    if (!cargoSeleccionado || !cargoSeleccionado.id) {
      this.snackBar.open('Error: Cargo no válido seleccionado', 'Cerrar');
      this.isLoading = false;
      return;
    }

    // 3. Construir el DTO exacto para el backend
    const employeeData: CreateEmployeeDto = {
      nombre: nombre,
      apellido: apellido,
      emailPersonal: this.step1Form.value.email,
      telefono: this.step1Form.value.phone,
      // Formateamos la fecha para que IsDateString no se queje
      fechaNacimiento: this.formatDate(this.step1Form.value.dateOfBirth),

      cargoId: cargoSeleccionado.id,
      rolId: HARDCODED_ROL_ID,
      // jefeId: ... (Si tuvieras el ID del jefe real, iría aquí. Si 'reportsTo' es solo nombre, no lo mandes)
    };

    console.log('📤 Enviando datos al backend:', employeeData);

    // 4. Llamar al servicio
    this.employeesService.createEmployee(employeeData).subscribe({
      next: (res) => {
        console.log('✅ Empleado creado:', res);
        this.isLoading = false;
        this.snackBar.open('¡Empleado creado y credenciales enviadas!', 'Cerrar', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('❌ Error creando empleado:', err);
        this.isLoading = false;

        // Mostrar mensaje detallado si el backend devuelve errores de validación
        let errorMsg = 'Error al crear empleado.';
        if (err.error?.message && Array.isArray(err.error.message)) {
          errorMsg = err.error.message.join(', '); // Ej: "email must be an email, apellido should not be empty"
        } else if (err.error?.message) {
          errorMsg = err.error.message;
        }

        this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
      }
    });
  }
}