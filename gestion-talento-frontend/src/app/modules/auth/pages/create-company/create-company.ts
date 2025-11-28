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
import { AuthService, RegisterRequest } from '../../services/auth';

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
  private authService = inject(AuthService); // <--- 1. INYECTAR SERVICIO
  private snackBar = inject(MatSnackBar);

  logoPreview: string | null = null;
  isLoading = false;

  // Datos del Paso 1 (Email/Pass)
  private userCredentials: Partial<RegisterRequest> = {};

  brandColors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#34495E'];

  planes = [
    { id: 'basic', name: 'Emprendedor', price: '$0', features: ['5 Empleados', 'Nómina Básica'] }, // 'basic' coincide con backend default
    { id: 'pro', name: 'Pyme', price: '$29', features: ['25 Empleados', 'IA Incluida', 'Soporte VIP'] },
    { id: 'enterprise', name: 'Corporativo', price: '$89', features: ['Ilimitado', 'API', 'Gestor Dedicado'] }
  ];

  companyForm = this.fb.group({
    identity: this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nombreAdmin: ['', [Validators.required]], // Nuevo campo requerido por backend
      apellidoAdmin: ['', [Validators.required]], // Nuevo campo requerido por backend
      color: ['#E74C3C', Validators.required],
      logoUrl: ['']
    }),
    subscription: this.fb.group({
      planSuscripcion: ['pro', Validators.required]
    })
  });

  get identityForm(): FormGroup { return this.companyForm.get('identity') as FormGroup; }
  get subscriptionForm(): FormGroup { return this.companyForm.get('subscription') as FormGroup; }

  get previewName() { return this.identityForm?.get('nombre')?.value || 'Tu Empresa'; }
  get previewColor() { return this.identityForm?.get('color')?.value || '#E74C3C'; }
  get previewPlan() {
    const planId = this.subscriptionForm?.get('planSuscripcion')?.value;
    return this.planes.find(p => p.id === planId);
  }

  ngOnInit(): void {
    // 2. RECUPERAR DATOS DEL PASO 1
    this.userCredentials = this.authService.getRegistrationData();

    // Validación de seguridad: Si no hay datos (recargó página), volver al inicio
    if (!this.userCredentials.email || !this.userCredentials.password) {
      this.router.navigate(['/auth/register']);
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
      // 1. Previsualización Local (Para que el usuario lo vea ya)
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // 2. Subida al Servidor (Para obtener la URL real)
      this.isLoading = true; // Opcional: mostrar spinner pequeño
      this.authService.uploadLogo(file).subscribe({
        next: (res) => {
          console.log('Logo subido:', res.url);
          // ¡AQUÍ ESTÁ LA MAGIA! Guardamos la URL del servidor, no el archivo
          this.identityForm.get('logoUrl')?.setValue(res.url);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error subiendo logo', err);
          this.snackBar.open('Error al subir el logo. Intenta con una imagen más pequeña.', 'Cerrar');
          this.isLoading = false;
        }
      });
    }
  }

  // ========================================================
  // ENVÍO AL BACKEND (FINAL)
  // ========================================================
  onSubmit() {
    if (this.companyForm.valid) {
      this.isLoading = true;
      const formValue = this.companyForm.value;

      // 3. CONSTRUIR EL DTO COMPLETO (RegisterDto del Backend)
      const fullRegisterData: RegisterRequest = {
        // Datos del Paso 1 (Memoria)
        email: this.userCredentials.email!,
        password: this.userCredentials.password!,

        // Datos del Paso 2 (Formulario Actual)
        nombreEmpresa: formValue.identity?.nombre!,
        nombreAdmin: formValue.identity?.nombreAdmin!,
        apellidoAdmin: formValue.identity?.apellidoAdmin!,
        logoUrl: formValue.identity?.logoUrl!,
        colorCorporativo: formValue.identity?.color!,
        planSuscripcion: formValue.subscription?.planSuscripcion!,
        // Nota: El backend aún no guarda 'plan' ni 'color' en la tabla Empresa directamente, 
        // pero la entidad Empresa tiene 'planSuscripcion'.
        // El color y logo irían en un campo JSONB si lo agregas al backend, o se pierden.
        // Por ahora mandamos lo esencial que pide el DTO 'RegisterDto'.
      };

      console.log('🚀 Enviando registro completo:', fullRegisterData);

      // 4. LLAMADA AL SERVICIO
      this.authService.register(fullRegisterData).subscribe({
        next: (res) => {
          console.log('✅ Empresa y Usuario creados:', res);
          this.isLoading = false;
          this.authService.clearRegistrationData(); // Limpiar memoria

          this.snackBar.open('¡Cuenta creada con éxito! Inicia sesión.', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('❌ Error registro:', err);
          this.isLoading = false;
          this.snackBar.open(err.error?.message || 'Error al crear la cuenta.', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}