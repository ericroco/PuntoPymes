import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// Shared Header
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Adjust path

// Simple interface for Admin User
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string; // Role within the Settings/Admin context
  avatar: string;
}

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SubpageHeader
  ],
  templateUrl: './user-settings.html',
  styleUrls: ['./user-settings.scss']
})
export class UserSettings {
  adminUsers: AdminUser[] = [ // Sample Data
    { id: 101, name: 'Erick Rodas (Tú)', email: 'erick.admin@puntopymes.com', role: 'Superadministrador', avatar: 'https://i.pravatar.cc/40?u=erickrodas' },
    { id: 102, name: 'Admin RRHH', email: 'rrhh.admin@puntopymes.com', role: 'Admin de RRHH', avatar: 'https://i.pravatar.cc/40?u=adminrrhh' },
    { id: 103, name: 'Admin Nómina', email: 'nomina.admin@puntopymes.com', role: 'Admin de Nómina', avatar: 'https://i.pravatar.cc/40?u=adminnomina' }
  ];

  constructor() {}

  // Placeholder functions
  inviteAdminUser(): void {
    console.log('Open modal to invite/add new admin user...');
    // TODO: Implement MatDialog logic
  }

  editAdminUserRole(user: AdminUser): void {
    console.log('Open modal to edit role for:', user.name);
    // TODO: Implement MatDialog logic
  }

  removeAdminAccess(user: AdminUser): void {
    console.log('Confirm removal of admin access for:', user.name);
    // TODO: Implement Confirmation Dialog + API Call
  }
}