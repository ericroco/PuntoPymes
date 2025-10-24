import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InviteAdminDialog } from '../../../components/invite-admin-dialog/invite-admin-dialog';
import { EditAdminRoleDialog } from '../../../components/edit-admin-role-dialog/edit-admin-role-dialog';
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
    SubpageHeader,
    MatDialogModule, // Asegúrate de importar MatDialogModule
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
  availableRoles = [ // Esto debería venir de la configuración de roles eventualmente
    { id: 'hr_admin', name: 'Admin de RRHH' },
    { id: 'payroll_admin', name: 'Admin de Nómina' },
    { id: 'manager', name: 'Jefe de Equipo/Área' },
    // Añade otros roles administrativos
  ];

  constructor(public dialog: MatDialog) { }

  // Placeholder functions
  inviteAdminUser(): void {
    console.log('Opening invite admin dialog...');
    const dialogRef = this.dialog.open(InviteAdminDialog, {
      width: '450px',
      disableClose: true,
      data: {
        availableRoles: this.availableRoles // Pasa los roles al modal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // result tendrá { email: '...', roleId: '...' } si se guardó
      if (result) {
        console.log('Invitar usuario con datos:', result);
        // --- Simulación de añadir usuario ---
        const newUser: AdminUser = {
          id: Date.now(), // ID Temporal
          name: `Usuario ${result.email.split('@')[0]} (Pendiente)`, // Nombre temporal
          email: result.email,
          role: this.availableRoles.find(r => r.id === result.roleId)?.name || 'Desconocido', // Busca el nombre del rol
          avatar: `https://i.pravatar.cc/40?u=${result.email}` // Avatar genérico
        };
        this.adminUsers = [...this.adminUsers, newUser];
        // --- TODO: Llamar API para enviar invitación y crear usuario admin ---
      } else {
        console.log('Invite dialog closed without saving.');
      }
    });
  }

  editAdminUserRole(user: AdminUser): void {
    console.log('Opening edit role dialog for:', user.name);
    const dialogRef = this.dialog.open(EditAdminRoleDialog, {
      width: '400px',
      disableClose: true,
      data: {
        user: user, // Pasa el objeto usuario completo
        availableRoles: this.availableRoles // Pasa los roles disponibles
      }
    });

    dialogRef.afterClosed().subscribe(newRoleId => {
      // newRoleId será el ID del nuevo rol seleccionado si se guardó
      if (newRoleId) {
        console.log(`Actualizar rol de ${user.name} a ${newRoleId}`);
        // --- Simulación de actualizar rol ---
        const roleName = this.availableRoles.find(r => r.id === newRoleId)?.name || 'Desconocido';
        const userIndex = this.adminUsers.findIndex(u => u.id === user.id);
        if (userIndex > -1) {
          this.adminUsers[userIndex].role = roleName;
          this.adminUsers = [...this.adminUsers]; // Forzar actualización de vista
        }
        // --- TODO: Llamar API para guardar el cambio de rol del usuario ---
      } else {
        console.log('Edit role dialog closed without saving.');
      }
    });
  }

  removeAdminAccess(user: AdminUser): void {
    console.log('Confirm removal of admin access for:', user.name);
    // TODO: Implement Confirmation Dialog + API Call
  }
}