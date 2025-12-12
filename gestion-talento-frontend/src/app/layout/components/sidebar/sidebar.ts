import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importar CommonModule para *ngIf
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth';
import { MatIconModule } from '@angular/material/icon';
import { PERMISSIONS } from '../../../shared/constants/permissions';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  public authService = inject(AuthService);

  // Exponemos las constantes al HTML
  P = PERMISSIONS;

  companyName = 'Mi Empresa';
  companyLogo = 'assets/logo.svg';

  ngOnInit(): void {
    this.companyName = this.authService.getCompanyName();
    this.companyLogo = this.authService.getCompanyLogo();
  }

  // Helper corto para el HTML
  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  // Helper para Admin Global (Configuraciones sensibles)
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}