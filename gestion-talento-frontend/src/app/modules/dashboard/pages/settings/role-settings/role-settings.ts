import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddRoleDialog } from '../../../components/add-role-dialog/add-role-dialog';
import { EditPermissionsDialog } from '../../../components/edit-permissions-dialog/edit-permissions-dialog';
import { ViewRoleUsersDialog } from '../../../components/view-role-users-dialog/view-role-users-dialog';
// Interface for Role
interface Role {
  id: string; // e.g., 'admin', 'hr', 'manager', 'employee'
  name: string; // Display name
  description: string;
  userCount: number; // How many users have this role
  isCustom: boolean; // Is it a default role or custom-created?
}

@Component({
  selector: 'app-role-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SubpageHeader,
    MatDialogModule
  ],
  templateUrl: './role-settings.html',
  styleUrls: ['./role-settings.scss']
})
export class RoleSettings {
  roles: Role[] = [ // Sample Data
    { id: 'superadmin', name: 'Superadministrador', description: 'Acceso completo a toda la configuración.', userCount: 1, isCustom: false },
    { id: 'hr_admin', name: 'Admin de RRHH', description: 'Gestiona empleados, reclutamiento, onboarding.', userCount: 1, isCustom: false },
    { id: 'payroll_admin', name: 'Admin de Nómina', description: 'Gestiona salarios, beneficios y novedades.', userCount: 1, isCustom: false },
    { id: 'manager', name: 'Jefe de Equipo/Área', description: 'Aprueba solicitudes, asigna tareas, evalúa.', userCount: 5, isCustom: false },
    { id: 'employee', name: 'Empleado Estándar', description: 'Acceso a autoservicio (perfil, solicitudes, etc.).', userCount: 85, isCustom: false },
    // Example custom role
    { id: 'recruiter_jr', name: 'Reclutador Junior', description: 'Acceso limitado al módulo ATS.', userCount: 2, isCustom: true }
  ];

  constructor(public dialog: MatDialog) { }

  createNewRole(): void {
    console.log('Opening add new role dialog...');
    const dialogRef = this.dialog.open(AddRoleDialog, {
      width: '450px',
      disableClose: true,
      // No necesitamos pasar datos para crear uno nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      // result tendrá { name: '...', description: '...' } si se guardó
      if (result) {
        console.log('Nuevo rol a crear:', result);
        // --- Simulación de añadir rol ---
        const newRole: Role = {
          id: `custom-${result.name.toLowerCase().replace(/\s+/g, '-')}`, // ID generado
          name: result.name,
          description: result.description,
          userCount: 0, // Nuevo rol empieza sin usuarios
          isCustom: true // Es personalizado
        };
        this.roles = [...this.roles, newRole];
        // --- TODO: Llamar API para guardar el nuevo rol ---
        // Después de guardar, probablemente querrías abrir el modal de edición de permisos para este nuevo rol
        // this.editRolePermissions(newRole);
      } else {
        console.log('Add Role dialog closed without saving.');
      }
    });
  }

  editRolePermissions(role: Role): void {
    // Idealmente, aquí obtendrías los permisos ACTUALES de este rol desde el backend
    console.log('Opening permissions dialog for:', role.name);

    // Lista de TODOS los permisos posibles en el sistema (esto vendría del backend o una constante)
    const allPermissions = [
      { id: 'view_employee_list', label: 'Ver Lista de Empleados', group: 'Personal' },
      { id: 'edit_employee_profile', label: 'Editar Perfil Empleado', group: 'Personal' },
      { id: 'view_employee_salary', label: 'Ver Salario Empleado', group: 'Nómina' },
      { id: 'approve_leave_request', label: 'Aprobar Solicitud Vacaciones', group: 'Asistencia' },
      { id: 'manage_sprints', label: 'Crear/Editar Sprints', group: 'Productividad' },
      { id: 'assign_tasks', label: 'Asignar Tareas', group: 'Productividad' },
      { id: 'manage_settings', label: 'Gestionar Configuración Empresa', group: 'Admin' },
      // ... ¡MUCHOS MÁS PERMISOS! ...
    ];

    // Simula los permisos que este rol ya tiene (debería venir del backend)
    const currentPermissions = (role.id === 'superadmin') ? allPermissions.map(p => p.id) :
      (role.id === 'hr_admin') ? ['view_employee_list', 'edit_employee_profile', 'approve_leave_request'] :
        []; // Ejemplo

    const dialogRef = this.dialog.open(EditPermissionsDialog, {
      width: '700px', // Más ancho para mostrar permisos
      disableClose: true,
      data: {
        role: role, // Pasamos el rol que estamos editando
        allPermissions: allPermissions, // Pasamos la lista completa de permisos
        currentPermissionIds: currentPermissions // Pasamos los IDs de los permisos actuales
      }
    });

    dialogRef.afterClosed().subscribe(updatedPermissionIds => {
      // updatedPermissionIds será un array con los IDs de los permisos seleccionados si se guardó
      if (updatedPermissionIds) {
        console.log(`Permisos actualizados para ${role.name}:`, updatedPermissionIds);
        // --- TODO: Llamar API para guardar la nueva lista de permisos para este rol ---
      } else {
        console.log('Edit Permissions dialog closed without saving.');
      }
    });
  }
  // -

  viewAssignedUsers(role: Role): void {
    console.log('Viewing users assigned to role:', role.name);
    // --- TODO: En una app real, aquí podrías pasar el role.id para que el modal
    //           haga una llamada API y obtenga solo los usuarios de ESE rol. ---

    // --- Simulación: Pasamos el nombre del rol para mostrarlo y datos de ejemplo ---
    const dialogRef = this.dialog.open(ViewRoleUsersDialog, {
      width: '500px', // Ancho ajustable
      data: {
        roleName: role.name
        // En el futuro: roleId: role.id
      }
    });

    // No necesitamos hacer nada cuando se cierre este modal (es solo informativo)
    dialogRef.afterClosed().subscribe(() => { });
  }
  deleteRole(role: Role): void {
    if (!role.isCustom) return; // No borrar roles del sistema
    console.log('Confirmar eliminación del rol:', role.name);
    // TODO: Implementar diálogo de confirmación + API Call
    // Simulación:
    // this.roles = this.roles.filter(r => r.id !== role.id);
  }
}