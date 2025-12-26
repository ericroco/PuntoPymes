import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
// 👇 Asegúrate de que la ruta sea correcta
import { ProductivityService } from '../../services/productivity';
import { ContextService } from '../../services/context';
import { BranchesService, Branch } from '../../../organization/services/branches';
import { AuthService } from '../../../auth/services/auth';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-create-survey-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDivider
  ],
  templateUrl: './create-survey-dialog.html', // Asegúrate que el nombre coincida
  styleUrls: ['./create-survey-dialog.scss']
})
export class CreateSurveyDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productivityService = inject(ProductivityService);
  private branchesService = inject(BranchesService);
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<CreateSurveyDialogComponent>);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  minDate: Date = new Date();
  isSubmitting = false;

  // Lógica de Sucursales
  branches: Branch[] = [];
  showBranchSelector = false; // Solo true si es SuperAdmin
  isLoadingBranches = false;

  constructor() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: [''],
      fechaFin: [null, Validators.required],
      // 👇 Nuevo campo. Si es Global será null.
      sucursalId: [null],
      opciones: this.fb.array([])
    });

    this.addOption();
    this.addOption();
  }

  ngOnInit() {
    this.checkUserPermissions();
  }

  checkUserPermissions() {
    const user = this.authService.getUser();
    // Validamos si es Super Admin (por rol o permiso '*')
    // Basado en tu log: role: "Super Admin" y permisos: ['*']
    const isSuperAdmin = user?.role === 'Super Admin' || user?.permisos?.includes('*');

    if (isSuperAdmin) {
      // ✅ CASO 1: ES SUPER ADMIN
      // Le mostramos el selector y cargamos las sucursales
      this.showBranchSelector = true;
      this.loadBranches();
    } else {
      // 🔒 CASO 2: ES MORTAL (Empleado/Gerente)
      // Ocultamos selector y forzamos SU sucursal ID
      this.showBranchSelector = false;

      // Asignamos su sucursal automáticamente
      // (Asegúrate de que authService.getUser() tenga sucursalId, 
      // si no, sácalo del empleadoService como en tu navbar)
      if (user?.sucursalId) {
        this.form.patchValue({ sucursalId: user.sucursalId });
      }
    }
  }

  loadBranches() {
    this.isLoadingBranches = true;
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        // Filtramos solo las activas
        this.branches = data.filter(b => b.activa);
        this.isLoadingBranches = false;
      },
      error: () => this.isLoadingBranches = false
    });
  }

  get opcionesArray(): FormArray {
    return this.form.get('opciones') as FormArray;
  }

  addOption() {
    const optionGroup = this.fb.group({
      texto: ['', Validators.required]
    });
    this.opcionesArray.push(optionGroup);
  }

  removeOption(index: number) {
    if (this.opcionesArray.length <= 2) {
      this.snackBar.open('Mínimo 2 opciones requeridas', 'Cerrar', { duration: 2000 });
      return;
    }
    this.opcionesArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.form.value;

    // Preparamos el payload
    // Nota: val.sucursalId ya viene del formulario (sea elegido o auto-asignado)
    const payload = {
      titulo: val.titulo,
      descripcion: val.descripcion,
      fechaFin: new Date(val.fechaFin).toISOString(),
      opciones: val.opciones,
      sucursalId: val.sucursalId // Puede ser UUID o null
    };

    console.log('Enviando encuesta para sucursal:', payload.sucursalId || 'GLOBAL');

    this.productivityService.createEncuesta(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Encuesta creada exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear encuesta', 'Cerrar');
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}