import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

// Importamos las constantes y la interfaz
import { PERMISSION_GROUPS } from '../../../../shared/constants/permissions'; // Ajusta la ruta si es necesario
import { Rol } from '../../services/roles';

@Component({
  selector: 'app-add-role-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatIconModule,
    MatDividerModule, MatCheckboxModule, MatTooltipModule
  ],
  templateUrl: './add-role-dialog.html',
  styleUrls: ['./add-role-dialog.scss']
})
export class AddRoleDialog implements OnInit {
  roleForm: FormGroup;
  permissionGroups = PERMISSION_GROUPS; // Los grupos de checkboxes

  // Mapa de estado: { 'nomina.leer': true, 'empleados.borrar': false }
  permissionsMap: Record<string, boolean> = {};

  constructor(
    public dialogRef: MatDialogRef<AddRoleDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { role?: Rol } // Recibimos data opcional para editar
  ) {
    const rol = data?.role;

    // Si estamos editando, cargamos los permisos existentes
    if (rol && rol.permisos) {
      this.permissionsMap = { ...rol.permisos };
    }

    this.roleForm = this.fb.group({
      name: [rol?.nombre || '', Validators.required],
      description: [''], // Opcional, si quieres mantenerlo
      esDefecto: [rol?.esDefecto || false] // La bandera "Rol Automático"
    });
  }

  ngOnInit(): void { }

  // Se ejecuta al hacer clic en un permiso
  togglePermission(key: string, isChecked: boolean) {
    this.permissionsMap[key] = isChecked;
  }

  // Helper para saber si un grupo entero está marcado (Opcional visualmente)
  isGroupChecked(groupPermissions: any[]): boolean {
    return groupPermissions.every(p => this.permissionsMap[p.key]);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roleForm.valid) {
      // Devolvemos el objeto listo para el Backend
      const result = {
        nombre: this.roleForm.value.name,
        esDefecto: this.roleForm.value.esDefecto,
        permisos: this.permissionsMap
      };
      this.dialogRef.close(result);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}