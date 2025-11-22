import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// 1. Importamos lo necesario para notificaciones y el servicio
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth'; // Asegúrate de que la ruta coincida con tu archivo creado

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule // Necesario para mostrar mensajes de error
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void => *', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false; // Para deshabilitar el botón mientras carga

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // 2. Inyectamos el Servicio de Auth y el SnackBar
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true; // Activar estado de carga
    const credentials = this.loginForm.value;

    // 3. Llamada al Backend
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        // El token ya se guardó en el AuthService (si seguiste el paso anterior),
        // así que solo redirigimos.
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.isLoading = false;

        // 4. Mostrar error al usuario
        this.snackBar.open('Credenciales incorrectas o error de servidor', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
}