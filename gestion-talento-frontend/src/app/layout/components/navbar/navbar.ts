import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../modules/auth/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);

  currentUser: User | null = null;
  notificationCount = 3; // Ejemplo, luego conectarás esto a un servicio de notificaciones

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }

  // Helper para mostrar un nombre amigable
  // (Como el token suele tener email, intentamos sacar el nombre del email si no hay nombre propio)
  get displayName(): string {
    if (!this.currentUser) return 'Invitado';
    // Si tuvieras un campo nombre en el token, úsalo. Si no, usa el email.
    return this.currentUser.email.split('@')[0];
  }

  get userRole(): string {
    return this.currentUser?.role || 'Usuario';
  }

  get userAvatar(): string {
    // Usa la foto del token, o una por defecto si no tiene
    return this.currentUser?.fotoUrl || 'assets/images/default-avatar.png';
  }
}