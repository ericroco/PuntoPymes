import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';

// Servicios
import { ProductivityService } from '../../services/productivity';
import { AuthService } from '../../../auth/services/auth';
import { BranchesService, Branch } from '../../../organization/services/branches'; // Ajusta ruta si es necesario
import { PERMISSIONS } from '../../../../shared/constants/permissions';

@Component({
  selector: 'app-create-announcement-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatDivider
  ],
  templateUrl: './create-announcement-dialog.html',
  styleUrls: ['./create-announcement-dialog.scss']
})
export class CreateAnnouncementDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productivityService = inject(ProductivityService);
  private branchesService = inject(BranchesService);
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<CreateAnnouncementDialogComponent>);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  isSubmitting = false;
  minDate = new Date(); // Para no permitir fechas pasadas

  // Datos para selectores
  prioridades = ['ALTA', 'MEDIA', 'BAJA'];
  branches: Branch[] = [];

  // Lógica de visualización
  showBranchSelector = false;
  isLoadingBranches = false;

  constructor() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      contenido: ['', [Validators.required, Validators.minLength(10)]],
      prioridad: ['MEDIA', Validators.required],
      fechaExpiracion: [null], // Opcional
      sucursalId: [null]       // Null = Global
    });
  }

  ngOnInit() {
    this.checkPermissions();
  }

  checkPermissions() {
    const user = this.authService.getUser();

    // Solo el Super Admin real ve el selector de sucursales
    // Usamos ?.toLowerCase() para evitar errores si role es undefined
    const rol = user?.role?.toLowerCase() || '';
    const isSuperAdmin = rol.includes('admin') || rol.includes('root');

    if (isSuperAdmin) {
      this.showBranchSelector = true;
      this.loadBranches();
    } else {
      this.showBranchSelector = false;
      // Si es RRHH (tiene permiso de políticas) pero no es Admin Global,
      // se le asignará su sede automáticamente en el backend.
    }
  }

  loadBranches() {
    this.isLoadingBranches = true;
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data.filter(b => b.activa);
        this.isLoadingBranches = false;
      },
      error: () => this.isLoadingBranches = false
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.form.value;

    const payload = {
      titulo: val.titulo,
      contenido: val.contenido,
      prioridad: val.prioridad,
      // Si hay fecha, la mandamos ISO, si no, undefined
      fechaExpiracion: val.fechaExpiracion ? new Date(val.fechaExpiracion).toISOString() : undefined,
      sucursalId: val.sucursalId // Puede ser UUID o null (Global)
    };

    this.productivityService.createAnuncio(payload).subscribe({
      next: () => {
        this.snackBar.open('Comunicado publicado exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Retorna true para refrescar la lista
      },
      error: (err) => {
        console.error('Error creando anuncio', err);
        this.snackBar.open('Error al publicar. Intenta nuevamente.', 'Cerrar');
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}