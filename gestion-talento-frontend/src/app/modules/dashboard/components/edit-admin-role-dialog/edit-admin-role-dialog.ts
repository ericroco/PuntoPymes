import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Usaremos ngModel simple aquí
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio'; // Alternativa: Radio buttons

// Interfaces
interface AdminUser { id: number; name: string; email: string; role: string; avatar: string; }
interface AdminRole { id: string; name: string; }

@Component({
  selector: 'app-edit-admin-role-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule, MatRadioModule // Añade MatRadioModule si lo usas
  ],
  templateUrl: './edit-admin-role-dialog.html',
  styleUrls: ['./edit-admin-role-dialog.scss']
})
export class EditAdminRoleDialog implements OnInit {
  user: AdminUser;
  availableRoles: AdminRole[] = [];
  selectedRoleId: string | null = null; // Para ngModel

  constructor(
    public dialogRef: MatDialogRef<EditAdminRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { user: AdminUser, availableRoles: AdminRole[] }
  ) {
    this.user = data.user;
    this.availableRoles = data.availableRoles || [];

    // Encuentra el ID del rol actual para preseleccionar
    const currentRole = this.availableRoles.find(r => r.name === this.user.role);
    this.selectedRoleId = currentRole ? currentRole.id : null;
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.selectedRoleId) {
      this.dialogRef.close(this.selectedRoleId); // Devuelve solo el ID del rol seleccionado
    }
  }
}