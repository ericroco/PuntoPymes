import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-forgot-password-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './forgot-password-dialog.html',
    styleUrls: ['./forgot-password-dialog.scss']
})
export class ForgotPasswordDialogComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private dialogRef = inject(MatDialogRef<ForgotPasswordDialogComponent>);
    private snackBar = inject(MatSnackBar);

    isLoading = false;

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    submit() {
        if (this.form.invalid) return;

        this.isLoading = true;
        const email = this.form.get('email')?.value || '';

        this.authService.requestPasswordReset(email).subscribe({
            next: (res) => {
                this.isLoading = false;
                this.snackBar.open('Correo enviado. Revisa tu bandeja de entrada.', 'Cerrar', {
                    duration: 5000,
                    panelClass: ['success-snackbar']
                });
                this.dialogRef.close();
            },
            error: (err) => {
                this.isLoading = false;
                this.snackBar.open('Error al procesar la solicitud.', 'Cerrar', {
                    duration: 3000
                });
            }
        });
    }

    close() {
        this.dialogRef.close();
    }
}