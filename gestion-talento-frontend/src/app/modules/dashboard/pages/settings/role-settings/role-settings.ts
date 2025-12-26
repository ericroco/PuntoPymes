import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

// Componentes y Servicios Propios
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { AddRoleDialog } from '../../../components/add-role-dialog/add-role-dialog';
import { RolesService, Rol } from '../../../services/roles';
import { AuthService } from '../../../../auth/services/auth';
import { PERMISSIONS } from '../../../../../shared/constants/permissions';

@Component({
  selector: 'app-role-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    SubpageHeader
  ],
  templateUrl: './role-settings.html',
  styleUrls: ['./role-settings.scss']
})
export class RoleSettings implements OnInit {
  private rolesService = inject(RolesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  P = PERMISSIONS;

  roles: Rol[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadRoles();
  }

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  loadRoles() {
    this.isLoading = true;
    this.rolesService.getRoles().subscribe({
      next: (data) => {
        // Ordenamos: primero el por defecto, luego alfabético
        this.roles = data.sort((a, b) => (a.esDefecto === b.esDefecto) ? 0 : a.esDefecto ? -1 : 1);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando roles:', err);
        this.isLoading = false;
      }
    });
  }

  // Helper para contar permisos activos (Solo visual)
  // Helper HÍBRIDO para contar permisos
  countActivePermissions(permisos: any): number {
    if (!permisos) return 0;

    // CASO A: Es un Array (Formato del Backend / Seed inicial)
    if (Array.isArray(permisos)) {
      // Si tiene '*', visualmente mostramos un número alto o lo manejamos en el HTML
      if (permisos.includes('*')) return 999; // Código para "Todos"
      return permisos.length;
    }

    // CASO B: Es un Objeto (Formato antiguo o temporal del frontend)
    return Object.values(permisos).filter(val => val === true).length;
  }

  // Opcional: Un helper para el texto en el HTML
  getPermissionLabel(count: number): string {
    return count === 999 ? 'Acceso Total (Super Admin)' : `${count} permisos activos`;
  }

  // --- CREAR NUEVO ROL ---
  createNewRole(): void {
    const dialogRef = this.dialog.open(AddRoleDialog, {
      width: '800px', // Un poco más ancho para los permisos
      disableClose: true,
      // No pasamos data porque es nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.rolesService.createRol(result).subscribe({
          next: () => {
            this.snackBar.open('Rol creado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadRoles();
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            const msg = err.error?.message || 'Error al crear el rol';
            this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
          }
        });
      }
    });
  }

  // --- EDITAR ROL (Nombre y Permisos) ---
  editRole(role: Rol): void {
    const dialogRef = this.dialog.open(AddRoleDialog, {
      width: '600px',
      disableClose: true,
      data: { role } // Pasamos el rol existente para editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.rolesService.updateRol(role.id, result).subscribe({
          next: () => {
            this.snackBar.open('Rol actualizado correctamente', 'Cerrar', { duration: 3000 });
            this.loadRoles();
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.snackBar.open('Error al actualizar rol', 'Cerrar');
          }
        });
      }
    });
  }

  // --- ELIMINAR ROL ---
  deleteRole(role: Rol): void {
    if (role.esDefecto) {
      this.snackBar.open('No puedes eliminar el Rol por Defecto. Asigna otro primero.', 'Cerrar', { duration: 4000 });
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar el rol "${role.nombre}"? \nEsta acción no se puede deshacer.`)) {
      return;
    }

    this.isLoading = true;
    this.rolesService.deleteRol(role.id).subscribe({
      next: () => {
        this.snackBar.open('Rol eliminado', 'Cerrar', { duration: 3000 });
        this.loadRoles();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        // Mostramos si el backend dice que hay usuarios asignados
        const msg = err.error?.message || 'Error al eliminar rol';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
      }
    });
  }
}