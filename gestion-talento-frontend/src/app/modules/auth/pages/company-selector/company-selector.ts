import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicio de Autenticación
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-company-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './company-selector.html',
  styleUrls: ['./company-selector.scss']
})
export class CompanySelectorComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  memberships: any[] = [];
  userName: string = '';
  isLoading = false;



  ngOnInit() {
    // 1. Recuperar lista de empresas desde el servicio (guardada en el login)
    this.memberships = this.authService.getStoredMemberships();

    // 2. Si no hay membresías (ej: recargó la página), verificar sesión
    if (this.memberships.length === 0) {
      const token = this.authService.getToken();
      if (token) {
        // Si tiene token, asumimos que ya eligió empresa o que debe volver a loguearse
        // para recargar la lista. Por seguridad, mandamos al login.
        this.router.navigate(['/auth/login']);
      } else {
        this.router.navigate(['/auth/login']);
      }
      return;
    }

    // 3. Obtener nombre del usuario para el saludo
    // Usamos el primer registro como referencia, ya que el usuario es el mismo
    if (this.memberships.length > 0) {
      // Asumimos que el backend devuelve { usuario: { email... } } dentro de la membresía
      // O usamos el email del token decodificado si ya existe
      const user = this.authService.getUser();
      this.userName = user?.email || 'Usuario';
    }
  }

  selectCompany(membership: any) {
    this.isLoading = true;
    console.log('Cambiando a empresa:', membership.empresa.nombre);
    console.log('👤 Usuario actual:', this.authService.getUser());
    console.log('🏢 Membresía seleccionada:', membership);
    console.log('📝 EmpresaId a enviar:', membership.empresa.id);

    // Llamar al backend para obtener el token específico de esa empresa
    this.authService.switchCompany(membership.empresa.id).subscribe({
      next: (res) => {
        console.log('Cambio de empresa exitoso');
        this.isLoading = false;
        // Redirigir al Dashboard principal
        this.router.navigate(['/dashboard/overview']);
      },
      error: (err) => {
        console.error('Error al cambiar de empresa:', err);
        this.isLoading = false;
        this.snackBar.open('Error al acceder a la empresa. Intenta nuevamente.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  goToCreateCompany() {
    this.router.navigate(['/auth/create-company']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}