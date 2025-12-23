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
import { RolesService, Rol } from '../../services/roles';

// Interfaces para los datos recibidos
interface DialogData {
  availableJobs: JobPosition[];
  availableManagers: Manager[];
}

interface Manager {
  id: string;
  nombre: string;
  apellido: string;
  cargo?: { nombre: string }; // Opcional, para mostrar el cargo en la lista
}
interface JobPosition {
  id: number | string;
  name: string;
  department: string;
  minSalary: number;
  maxSalary: number;
}

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
  availableRoles: Rol[] = [];
  selectedJobSalaryRange: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private rolesService: RolesService
  ) {
    this.availableJobs = data.availableJobs || [];
    this.availableManagers = data.availableManagers || [];

    // ============================================================
    // Paso 1: Datos Personales (ACTUALIZADO CON IDENTIFICACIÓN)
    // ============================================================
    this.step1Form = this.fb.group({
      name: ['', Validators.required],

      // 👇 NUEVOS CAMPOS
      tipoIdentificacion: ['Cedula', Validators.required], // Valor por defecto
      nroIdentificacion: ['', Validators.required], // Validadores dinámicos se aplican en ngOnInit

      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [null]
    });

    // Paso 2: Datos Laborales
    this.step2Form = this.fb.group({
      job: [null, Validators.required],
      systemRole: [null, Validators.required],
      reportsTo: [null, Validators.required],
      contractType: [null, Validators.required],
      hireDate: [new Date(), Validators.required],
      contractEndDate: [null]
    });

    // Paso 3: Compensación
    this.step3Form = this.fb.group({
      initialSalary: [null, [Validators.required, Validators.min(1)]]
    });

    // Lógica de rangos salariales
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

  // ============================================================
  // LÓGICA DE VALIDACIÓN DINÁMICA (CÉDULA vs PASAPORTE)
  // ============================================================
  ngOnInit(): void {
    const tipoControl = this.step1Form.get('tipoIdentificacion');
    const nroControl = this.step1Form.get('nroIdentificacion');

    // Suscribirse a cambios en el tipo de identificación
    tipoControl?.valueChanges.subscribe(tipo => {
      // Limpiar valor anterior para evitar confusión visual
      nroControl?.setValue('');

      if (tipo === 'Cedula') {
        // CÉDULA: Requerido, 10 dígitos exactos, solo números
        nroControl?.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$') // Solo números
        ]);
      } else {
        // PASAPORTE: Requerido, mín 5 caracteres, alfanumérico
        nroControl?.setValidators([
          Validators.required,
          Validators.minLength(5)
        ]);
      }
      nroControl?.updateValueAndValidity();
    });

    // Disparar la validación inicial (para aplicar las reglas de Cédula al cargar)
    tipoControl?.updateValueAndValidity();
    this.loadRoles();
    this.loadPotentialManagers();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatDate(date: Date | null): string | undefined {
    if (!date) return undefined;
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  loadRoles() {
    this.rolesService.getRoles().subscribe(roles => {
      this.availableRoles = roles;

      // 4. AUTO-SELECCIONAR EL ROL POR DEFECTO
      const defaultRole = roles.find(r => r.esDefecto);
      if (defaultRole) {
        this.step2Form.patchValue({ systemRole: defaultRole });
      }
    });
  }
  // --- NUEVA FUNCIÓN: CARGAR JEFES DESDE BACKEND ---
  loadPotentialManagers() {
    // Usamos getDirectory o el endpoint que tengas para listar empleados
    this.employeesService.getDirectory().subscribe({
      next: (employees: any[]) => {
        // Mapeamos para que coincida con la interfaz Manager
        this.availableManagers = employees.map(emp => ({
          id: emp.id,
          nombre: emp.nombre,
          apellido: emp.apellido,
          cargo: emp.cargo
        }));
      },
      error: (err) => console.error('Error cargando jefes', err)
    });
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
    const apellido = fullName.length > 1 ? fullName.slice(1).join(' ') : '.';

    // 2. IDs
    const selectedRole = this.step2Form.value.systemRole;
    const cargoSeleccionado = this.step2Form.value.job;
    if (!cargoSeleccionado || !cargoSeleccionado.id) {
      this.snackBar.open('Error: Cargo no válido seleccionado', 'Cerrar');
      this.isLoading = false;
      return;
    }

    // 3. Construir el DTO (ACTUALIZADO)
    const employeeData: CreateEmployeeDto = {
      nombre: nombre,
      apellido: apellido,

      // 👇 ENVIAMOS LOS NUEVOS CAMPOS
      tipoIdentificacion: this.step1Form.value.tipoIdentificacion,
      nroIdentificacion: this.step1Form.value.nroIdentificacion,

      emailPersonal: this.step1Form.value.email,
      telefono: this.step1Form.value.phone,
      fechaNacimiento: this.formatDate(this.step1Form.value.dateOfBirth),

      cargoId: cargoSeleccionado.id,
      rolId: selectedRole ? selectedRole.id : '',
      jefeId: this.step2Form.value.reportsTo || '',

      salario: this.step3Form.value.initialSalary,
      tipoContrato: this.step2Form.value.contractType,
      fechaInicio: this.formatDate(this.step2Form.value.hireDate),
      fechaFin: this.formatDate(this.step2Form.value.contractEndDate)
    };

    console.log('📤 Enviando datos al backend:', employeeData);

    // 4. Llamar al servicio
    this.employeesService.createEmployee(employeeData).subscribe({
      next: (res) => {
        console.log('✅ Empleado creado:', res);
        this.isLoading = false;
        this.snackBar.open('¡Empleado creado exitosamente!', 'Cerrar', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('❌ Error creando empleado:', err);
        this.isLoading = false;

        let errorMsg = 'Error al crear empleado.';

        // Manejo mejorado de errores del backend (ConflictException, BadRequest)
        if (err.error?.message) {
          if (Array.isArray(err.error.message)) {
            errorMsg = err.error.message.join(', ');
          } else {
            errorMsg = err.error.message;
          }
        }

        this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
      }
    });
  }
}