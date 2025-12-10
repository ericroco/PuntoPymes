import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { Employee } from '../../services/employees';

interface DialogData {
  employees: Employee[]; // Lista para el selector
}

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-project-dialog.html',
  styles: [`.full-width { width: 100%; margin-bottom: 10px; } .hint-text { color: #666; margin-bottom: 15px; }`]
})
export class AddProjectDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      liderId: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}