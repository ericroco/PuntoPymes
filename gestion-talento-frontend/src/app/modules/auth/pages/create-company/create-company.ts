import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Angular Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicios e Interfaces
import { AuthService, RegisterRequest } from '../../services/auth'; // Ajusta la ruta a tu auth.service

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  templateUrl: './create-company.html',
  styleUrls: ['./create-company.scss']
})
export class CreateCompanyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  logoPreview: string | null = null;
  isLoading = false;

  // Estado para saber en qué modo estamos
  isLoggedInMode = false;
  currentUser: any = null;

  // Datos temporales (solo para modo Registro Nuevo)
  private tempRegisterCredentials: Partial<RegisterRequest> = {};

  brandColors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#34495E'];

  planes = [
    { id: 'basic', name: 'Emprendedor', price: '$0', features: ['5 Empleados', 'Nómina Básica'] },
    { id: 'pro', name: 'Pyme', price: '$29', features: ['25 Empleados', 'IA Incluida', 'Soporte VIP'] },
    { id: 'enterprise', name: 'Corporativo', price: '$89', features: ['Ilimitado', 'API', 'Gestor Dedicado'] }
  ];

  // Estructura del Formulario (Stepper)
  companyForm = this.fb.group({
    identity: this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nombreAdmin: ['', [Validators.required]],
      apellidoAdmin: ['', [Validators.required]],
      color: ['#E74C3C', Validators.required],
      logoUrl: ['']
    }),
    subscription: this.fb.group({
      planSuscripcion: ['basic', Validators.required]
    })
  });

  // Getters para el HTML
  get identityForm(): FormGroup { return this.companyForm.get('identity') as FormGroup; }
  get subscriptionForm(): FormGroup { return this.companyForm.get('subscription') as FormGroup; }

  get previewName() { return this.identityForm?.get('nombre')?.value || 'Tu Empresa'; }
  get previewColor() { return this.identityForm?.get('color')?.value || '#E74C3C'; }
  get previewPlan() {
    const planId = this.subscriptionForm?.get('planSuscripcion')?.value;
    return this.planes.find(p => p.id === planId);
  }

  ngOnInit(): void {
    // 1. DETECTAR MODO: ¿Ya existe un usuario logueado?
    this.currentUser = this.authService.getUser();

    if (this.currentUser) {
      // 🟢 MODO A: AGREGAR EMPRESA (Usuario existente)
      this.isLoggedInMode = true;
      console.log('Modo: Usuario existente agregando empresa');

      // Pre-llenamos datos del usuario y los deshabilitamos (ya sabemos quién es)
      this.identityForm.patchValue({
        nombreAdmin: this.currentUser.nombre || 'Usuario', // Ajusta según tu token
        apellidoAdmin: this.currentUser.apellido || 'Actual'
      });
      this.identityForm.get('nombreAdmin')?.disable();
      this.identityForm.get('apellidoAdmin')?.disable();

    } else {
      // 🔵 MODO B: REGISTRO NUEVO (Paso 2 del registro)
      this.isLoggedInMode = false;
      this.tempRegisterCredentials = this.authService.getRegistrationData();

      // Validación de seguridad: Si no hay email/pass previos, volver al inicio
      if (!this.tempRegisterCredentials.email || !this.tempRegisterCredentials.password) {
        this.router.navigate(['/auth/register']);
      }
    }
  }

  selectColor(color: string) {
    this.identityForm?.get('color')?.setValue(color);
  }

  selectPlan(planId: string) {
    this.subscriptionForm?.get('planSuscripcion')?.setValue(planId);
  }

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Preview
      const reader = new FileReader();
      reader.onload = () => { this.logoPreview = reader.result as string; };
      reader.readAsDataURL(file);

      // Upload
      this.isLoading = true;
      this.authService.uploadLogo(file).subscribe({
        next: (res) => {
          this.identityForm.get('logoUrl')?.setValue(res.url);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error subiendo logo', err);
          this.snackBar.open('Error al subir logo. Intenta con otra imagen.', 'Cerrar');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.companyForm.invalid) return;

    this.isLoading = true;

    // Usamos getRawValue() para incluir campos deshabilitados
    const formValue = this.companyForm.getRawValue();

    // 🛠️ Preparamos los datos asegurando que sean strings
    const companyData = {
      nombreEmpresa: formValue.identity?.nombre || '',
      nombreAdmin: formValue.identity?.nombreAdmin || '',
      apellidoAdmin: formValue.identity?.apellidoAdmin || '',
      logoUrl: formValue.identity?.logoUrl || '',
      colorCorporativo: formValue.identity?.color || '',
      planSuscripcion: formValue.subscription?.planSuscripcion || '',
    };

    // ======================================================
    // 🔀 LÓGICA DE ENVÍO
    // ======================================================

    if (this.isLoggedInMode) {
      // 🟢 CASO A: Usuario Logueado (Agregando nueva empresa)
      console.log('🚀 Creando nueva organización...');

      this.authService.createCompany(companyData).subscribe({
        next: (res) => {
          // 👇 CAMBIO IMPORTANTE: 
          // Ya no llamamos al backend para refrescar (evita el 404).
          // Agregamos la empresa nueva a la caché local manualmente.
          // Se asume que 'res.data' trae el objeto de la empresa creada.
          this.authService.addCompanyToLocalCache(res.data);

          this.isLoading = false;
          this.snackBar.open('¡Organización creada! Redirigiendo...', 'OK', { duration: 2000 });
          this.router.navigate(['/auth/select-company']);
        },
        error: (err) => {
          console.error('Error creando empresa:', err);
          this.isLoading = false;
          this.snackBar.open('Error al crear la organización.', 'Cerrar');
        }
      });

    } else {
      // 🔵 CASO B: Usuario Nuevo (Registro por primera vez)
      console.log('🚀 Finalizando registro...');

      const fullRegisterData: RegisterRequest = {
        email: this.tempRegisterCredentials.email!,
        password: this.tempRegisterCredentials.password!,
        ...companyData
      };

      this.authService.register(fullRegisterData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.authService.clearRegistrationData();
          this.snackBar.open('¡Cuenta creada! Por favor inicia sesión.', 'OK', { duration: 5000 });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error registro:', err);
          this.isLoading = false;
          this.snackBar.open(err.error?.message || 'Error en el registro.', 'Cerrar');
        }
      });
    }
  }
}