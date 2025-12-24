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

// Importamos constantes e interfaces
import { PERMISSION_GROUPS } from '../../../../shared/constants/permissions';
import { Rol } from '../../services/roles'; // 👈 Asegúrate que la ruta sea correcta (roles.service)

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
  permissionGroups = PERMISSION_GROUPS;

  // Mapa visual para los checkboxes: { 'gastos.reportar': true, 'rrhh.ver': false }
  permissionsMap: Record<string, boolean> = {};

  constructor(
    public dialogRef: MatDialogRef<AddRoleDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { role?: Rol }
  ) {
    const rol = data?.role;

    // 1. Inicializar el Mapa de Permisos
    this.initializePermissions(rol);

    // 2. Crear el Formulario
    this.roleForm = this.fb.group({
      name: [rol?.nombre || '', [Validators.required, Validators.maxLength(100)]],
      // 👇 AGREGADO: El campo descripción faltaba en tu definició
      esDefecto: [rol?.esDefecto || false]
    });
  }

  ngOnInit(): void { }

  /**
   * Convierte el Array de permisos del Backend a un Mapa Booleano para la UI
   */
  private initializePermissions(rol?: Rol) {
    // Primero limpiamos/iniciamos en falso
    this.permissionsMap = {};

    if (rol && rol.permisos) {
      // Caso A: El backend envía un Array de strings (Lo estándar ahora)
      if (Array.isArray(rol.permisos)) {

        // Si tiene el comodín '*', marcamos TODO
        if (rol.permisos.includes('*')) {
          this.markAllAsTrue();
        } else {
          // Marcamos solo los que vienen en la lista
          rol.permisos.forEach((perm: string) => {
            this.permissionsMap[perm] = true;
          });
        }
      }
      // Caso B: Compatibilidad si por alguna razón llega un objeto (Legacy)
      else if (typeof rol.permisos === 'object') {
        this.permissionsMap = { ...rol.permisos as any };
      }
    }
  }

  private markAllAsTrue() {
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(p => this.permissionsMap[p.key] = true);
    });
  }

  // --- LÓGICA DE CHECKBOXES ---

  // 1. Clic en un permiso individual
  togglePermission(key: string, isChecked: boolean) {
    this.permissionsMap[key] = isChecked;
  }

  // 2. Clic en "Seleccionar todos" del grupo (UX Friendly)
  toggleGroup(groupIndex: number, isChecked: boolean) {
    const group = this.permissionGroups[groupIndex];
    group.permissions.forEach(p => {
      this.permissionsMap[p.key] = isChecked;
    });
  }

  // 3. Helper para saber si un grupo entero está marcado
  isGroupChecked(groupPermissions: any[]): boolean {
    if (!groupPermissions || groupPermissions.length === 0) return false;
    return groupPermissions.every(p => this.permissionsMap[p.key]);
  }

  isGroupIndeterminate(groupPermissions: any[]): boolean {
    if (!groupPermissions || groupPermissions.length === 0) return false;
    const checkedCount = groupPermissions.filter(p => this.permissionsMap[p.key]).length;
    return checkedCount > 0 && checkedCount < groupPermissions.length;
  }

  // --- ACCIONES ---

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roleForm.valid) {

      // PASO 1: Filtrar solo las llaves que están en 'true' para enviar un Array limpio
      const permissionsArray = Object.keys(this.permissionsMap)
        .filter(key => this.permissionsMap[key] === true);

      // PASO 2: Construir objeto LIMPIO (DTO Compatible)
      // ⚠️ IMPORTANTE: No usamos spread operator (...this.data.role) aquí.
      // Evitamos enviar ID, fechas o campos basura que provoquen error 400.
      const result = {
        nombre: this.roleForm.value.name,
        descripcion: this.roleForm.value.description, // Ahora sí lo lee del form
        esDefecto: this.roleForm.value.esDefecto,
        permisos: permissionsArray // Array de strings []
      };

      this.dialogRef.close(result);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}