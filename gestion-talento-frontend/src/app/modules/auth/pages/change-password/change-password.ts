import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicios
import { AuthService } from '../../services/auth';

// Validador personalizado
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('nuevaPassword')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (password && confirm && password !== confirm) {
        return { mismatch: true };
    }
    return null;
}

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule,
        MatFormFieldModule, MatInputModule, MatButtonModule,
        MatIconModule, MatProgressSpinnerModule, MatSnackBarModule
    ],
    templateUrl: './change-password.html',
    styleUrls: ['./change-password.scss']
})
export class ChangePasswordComponent {
    // Inyecciones (Estilo moderno Angular 16+)
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
    private location = inject(Location);

    changePassForm: FormGroup;
    isLoading = false;

    // Toggles visuales
    hideCurrent = true;
    hideNew = true;
    hideConfirm = true;

    constructor() {
        this.changePassForm = this.fb.group({
            passwordActual: ['', [Validators.required]],
            nuevaPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: passwordsMatchValidator });
    }

    onSubmit() {
        if (this.changePassForm.invalid) return;

        this.isLoading = true;
        // Deshabilitar el formulario para que no editen mientras carga
        this.changePassForm.disable();

        const { passwordActual, nuevaPassword } = this.changePassForm.value;

        this.authService.changePassword({ passwordActual, nuevaPassword }).subscribe({
            next: (res) => {
                this.isLoading = false;

                // 1. Mostrar éxito
                this.snackBar.open('¡Contraseña actualizada con éxito!', 'Entendido', {
                    duration: 5000,
                    panelClass: ['success-snackbar'] // Opcional si tienes estilos
                });

                // 2. LOGOUT DE SEGURIDAD
                // Es mejor cerrar sesión para asegurar que el token viejo no se use mal
                // y para confirmar que el usuario sabe su nueva clave.
                this.authService.logout();
                this.router.navigate(['/auth/login']);
            },
            error: (err) => {
                this.isLoading = false;
                this.changePassForm.enable();
                console.error(err);

                // Manejo de errores comunes
                let errorMsg = 'Error al actualizar la contraseña.';

                if (err.status === 400 || err.status === 401) {
                    // Generalmente aquí cae "Contraseña actual incorrecta"
                    errorMsg = err.error?.message || 'La contraseña actual es incorrecta.';
                }

                this.snackBar.open(errorMsg, 'Cerrar', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }
}