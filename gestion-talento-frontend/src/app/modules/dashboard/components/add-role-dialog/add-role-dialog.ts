import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-role-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './add-role-dialog.html',
  styleUrls: ['./add-role-dialog.scss'] // Puedes reutilizar estilos
})
export class AddRoleDialog {
  roleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRoleDialog>,
    private fb: FormBuilder
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required] // Hacemos descripción requerida para roles
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roleForm.valid) {
      this.dialogRef.close(this.roleForm.value); // Devuelve { name, description }
    }
  }
}