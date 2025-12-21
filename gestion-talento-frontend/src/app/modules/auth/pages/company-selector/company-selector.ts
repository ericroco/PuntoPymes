import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-company-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
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
    // 1. Verificar Token
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // 2. Recuperar empresas (Directamente del localStorage actualizado)
    this.memberships = this.authService.getStoredMemberships();
    console.log('🏢 Empresas disponibles:', this.memberships);

    // 3. Validación de seguridad
    if (this.memberships.length === 0) {
      // Si llegamos aquí, es raro, pero mejor mandarlo al login para que recargue todo limpio
      this.router.navigate(['/auth/login']);
      return;
    }

    // 4. Obtener nombre del usuario para el saludo
    const user = this.authService.getUser();
    this.userName = (user as any)?.nombre || user?.email || 'Usuario';
  }

  selectCompany(membership: any) {
    this.isLoading = true;
    console.log(`🚀 Entrando a: ${membership.empresa.nombre}`);

    this.authService.switchCompany(membership.empresa.id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/overview']);
      },
      error: (err) => {
        console.error('Error switching company:', err);
        this.isLoading = false;
        this.snackBar.open('No se pudo acceder a esta organización.', 'Cerrar');
      }
    });
  }

  goToCreateCompany() {
    this.router.navigate(['/auth/create-company']);
  }

  logout() {
    this.authService.logout();
  }
}