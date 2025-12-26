import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-expense-item-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatIconModule
  ],
  templateUrl: './add-expense-item-dialog.html',
  styleUrls: ['./add-expense-item-dialog.scss']
})
export class AddExpenseItemDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddExpenseItemDialogComponent>);

  form: FormGroup;
  categorias = ['Alimentación', 'Transporte', 'Hospedaje', 'Materiales', 'Otros'];

  // Variable para guardar el archivo seleccionado
  selectedFile: File | null = null;

  constructor() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      concepto: ['', Validators.required],
      categoria: ['', Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  // Detectar cuando el usuario elige un archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Devolvemos un objeto con DOS propiedades: los datos y el archivo
      this.dialogRef.close({
        itemData: this.form.value,
        file: this.selectedFile
      });
    }
  }
}