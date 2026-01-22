import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    templateUrl: './reset-password.html',
    styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);

    token: string | null = null;
    isLoading = false;
    hidePassword = true;
    hideConfirmPassword = true;

    // Validador personalizado para confirmar que las contraseñas coinciden
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword) return null;

        return password.value === confirmPassword.value ? null : { mismatch: true };
    }

    form = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    ngOnInit(): void {
        // Capturamos el token de la URL (ej: /auth/reset-password?token=XYZ)
        this.token = this.route.snapshot.queryParamMap.get('token');

        if (!this.token) {
            this.snackBar.open('Enlace inválido o incompleto.', 'Cerrar', { duration: 5000 });
            this.router.navigate(['/auth/login']);
        }
    }

    onSubmit() {
        if (this.form.invalid || !this.token) return;

        this.isLoading = true;
        const newPassword = this.form.get('password')?.value;

        if (!newPassword) return;

        this.authService.resetPassword(this.token, newPassword).subscribe({
            next: () => {
                this.isLoading = false;
                this.snackBar.open('¡Contraseña restablecida! Ahora puedes iniciar sesión.', 'OK', {
                    duration: 5000,
                    panelClass: ['success-snackbar'] // Asegúrate de tener este estilo o usa el default
                });
                this.router.navigate(['/auth/login']);
            },
            error: (err) => {
                this.isLoading = false;
                console.error(err);
                this.snackBar.open(err.error?.message || 'El enlace ha expirado o es inválido.', 'Cerrar', {
                    duration: 5000
                });
            }
        });
    }
}