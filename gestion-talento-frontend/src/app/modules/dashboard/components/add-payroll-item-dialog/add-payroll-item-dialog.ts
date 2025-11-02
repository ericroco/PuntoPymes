import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FilterByTypePipe } from '../../../../shared/pipes/filter-by-type-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface PayrollItem {
  id: number;
  name: string;
  type: 'Ingreso' | 'Descuento';
}

interface DialogData {
  employeeName?: string; // <-- Opcional
  employeeId?: number; // <-- Opcional
  selectedCount?: number; // <-- Opcional
  availableItems: PayrollItem[];
}

@Component({
  selector: 'app-add-payroll-item-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatDatepickerModule,
    MatNativeDateModule, FilterByTypePipe
  ],
  templateUrl: './add-payroll-item-dialog.html',
  styleUrls: ['./add-payroll-item-dialog.scss']
})
export class AddPayrollItemDialog implements OnInit {
  itemForm: FormGroup;
  employeeName: string | null = null;
  selectedCount: number = 0;
  availableItems: PayrollItem[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddPayrollItemDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Comprueba qué datos se recibieron
    if (data.employeeName) {
      this.employeeName = data.employeeName;
    } else if (data.selectedCount) {
      this.selectedCount = data.selectedCount;
    }

    this.availableItems = data.availableItems || [];

    this.itemForm = this.fb.group({
      item: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      applicationDate: [new Date(), Validators.required], // <-- CAMPO AÑADIDO
      comments: ['']
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;

      const finalAmount = formData.item.type === 'Descuento'
        ? -Math.abs(formData.amount)
        : formData.amount;

      // --- CORRECCIÓN AQUÍ ---
      // Nueva función formatDt más simple y robusta
      const formatDt = (date: Date | null): string | null => {
        if (!date) {
          return null; // Si la fecha es nula, devuelve nulo
        }

        // Extraemos los componentes de la fecha local
        let year = date.getFullYear();
        // getMonth() es 0-11, por eso +1. padStart asegura dos dígitos (ej. 05)
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        // Devolvemos el formato YYYY-MM-DD
        return `${year}-${month}-${day}`;
      };
      // --- FIN DE LA CORRECCIÓN ---

      // Objeto de resultado (ahora usará la nueva formatDt)
      const resultData = {
        item: formData.item,
        amount: formData.amount,
        comments: formData.comments,
        applicationDate: formatDt(formData.applicationDate) // Formateamos la fecha
      };

      // Si es modo individual, añade el employeeId
      if (this.data.employeeId) {
        this.dialogRef.close({
          ...resultData,
          employeeId: this.data.employeeId,
          amount: finalAmount
        });
      } else {
        // Modo Masivo
        this.dialogRef.close(resultData);
      }
    } else {
      // Si el formulario no es válido, marca todos los campos como tocados
      this.itemForm.markAllAsTouched();
    }
  }
}