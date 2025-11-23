import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Department } from '../../services/catalog';

interface DialogData {
  department?: Department; // Si viene, es edición
}

@Component({
  selector: 'app-add-department-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-department-dialog.html',
  styles: [`
    .full-width { width: 100%; }
    .dialog-instruction { margin-bottom: 20px; color: #666; }
  `]
})
export class AddDepartmentDialog implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDepartmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      nombre: [data.department?.nombre || '', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void { }

  onSave(): void {
    if (this.form.valid) {
      // Devolvemos el valor del formulario
      this.dialogRef.close(this.form.value);
    }
  }
}