import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../services/employees'; // Asegúrate de importar la interfaz correcta

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './edit-employee-dialog.html',
  styleUrls: ['./edit-employee-dialog.scss']
})
export class EditEmployeeDialog implements OnInit {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) {
    const emp = data.employee;

    // Inicializamos el formulario SOLO con los datos personales básicos
    this.editForm = this.fb.group({
      nombre: [emp.nombre, Validators.required],
      apellido: [emp.apellido, Validators.required],

      // Email personal (Editable por si hubo error de dedo al crear)
      emailPersonal: [emp.emailPersonal, [Validators.required, Validators.email]],

      telefono: [emp.telefono || ''],

      // Si tu interfaz Employee tiene dirección, agrégala aquí. Si no, quítala.
      // direccion: [emp.direccion || ''] 
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      // Devolvemos solo los valores editados
      this.dialogRef.close(this.editForm.value);
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}