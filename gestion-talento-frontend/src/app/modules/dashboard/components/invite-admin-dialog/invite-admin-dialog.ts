import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Interface simple para rol (ajusta si tienes una más compleja)
interface AdminRole { id: string; name: string; }

@Component({
  selector: 'app-invite-admin-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './invite-admin-dialog.html',
  styleUrls: ['./invite-admin-dialog.scss'] // Puedes reutilizar estilos de otros modales
})
export class InviteAdminDialog {
  inviteForm: FormGroup;
  availableRoles: AdminRole[] = [];

  constructor(
    public dialogRef: MatDialogRef<InviteAdminDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { availableRoles: AdminRole[] }
  ) {
    this.availableRoles = data.availableRoles || [];
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      roleId: [null, Validators.required] // Guardará el ID del rol seleccionado
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInvite(): void {
    if (this.inviteForm.valid) {
      this.dialogRef.close(this.inviteForm.value); // Devuelve { email, roleId }
    }
  }
}