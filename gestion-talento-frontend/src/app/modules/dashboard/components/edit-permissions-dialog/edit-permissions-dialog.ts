import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para checkboxes
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider'; // Para separar grupos
import { MatTabsModule } from '@angular/material/tabs'; // Opcional: usar Tabs

interface Permission { id: string; label: string; group: string; }
interface Role { id: string; name: string; /* ... */ }

@Component({
  selector: 'app-edit-permissions-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule,
    MatCheckboxModule, MatDividerModule, MatTabsModule // Añade módulos de Material
  ],
  templateUrl: './edit-permissions-dialog.html',
  styleUrls: ['./edit-permissions-dialog.scss']
})
export class EditPermissionsDialog implements OnInit {
  role: Role;
  allPermissions: Permission[] = [];
  permissionGroups: string[] = [];
  // Usamos un objeto para vincular fácilmente los checkboxes con ngModel
  selectedPermissions: { [key: string]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<EditPermissionsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      role: Role,
      allPermissions: Permission[],
      currentPermissionIds: string[]
    }
  ) {
    this.role = data.role;
    this.allPermissions = data.allPermissions || [];
    // Inicializa el objeto selectedPermissions basado en los permisos actuales
    data.currentPermissionIds.forEach(id => {
      this.selectedPermissions[id] = true;
    });
    // Agrupa los permisos por categoría para mostrarlos mejor
    this.permissionGroups = [...new Set(this.allPermissions.map(p => p.group))].sort();
  }

  ngOnInit(): void {}

  // Función helper para obtener permisos de un grupo específico
  getPermissionsByGroup(group: string): Permission[] {
    return this.allPermissions.filter(p => p.group === group);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Convierte el objeto selectedPermissions de nuevo a un array de IDs seleccionados
    const updatedPermissionIds = Object.keys(this.selectedPermissions)
                                      .filter(id => this.selectedPermissions[id]);
    this.dialogRef.close(updatedPermissionIds);
  }
}