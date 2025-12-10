import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

// Asegúrate que esta ruta es correcta
import { FilterByTypePipe } from '../../../../shared/pipes/filter-by-type-pipe';
// Asegúrate que apunte a payroll.service.ts
import { ConceptoNomina } from '../../services/payroll';

interface DialogData {
  employeeName?: string;
  selectedCount?: number;
  availableItems: ConceptoNomina[];
}

@Component({
  selector: 'app-add-payroll-item-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule, FilterByTypePipe
  ],
  templateUrl: './add-payroll-item-dialog.html',
  styleUrls: ['./add-payroll-item-dialog.scss']
})
export class AddPayrollItemDialog implements OnInit {
  itemForm: FormGroup;

  employeeName: string = '';
  selectedCount: number = 0;
  availableItems: ConceptoNomina[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPayrollItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.employeeName = data.employeeName || '';
    this.selectedCount = data.selectedCount || 0;
    this.availableItems = data.availableItems || [];

    // 👇 DEBUG: Esto te dirá en la consola del navegador qué está llegando
    console.log('Conceptos recibidos en el diálogo:', this.availableItems);

    this.itemForm = this.fb.group({
      concepto: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      applicationDate: [new Date(), Validators.required],
      comments: ['']
    });
  }

  ngOnInit() { }

  onSave() {
    if (this.itemForm.valid) {
      const val = this.itemForm.value;

      const result = {
        item: val.concepto, // Devuelve el objeto completo (id, nombre, tipo)
        amount: val.amount,
        applicationDate: this.formatDate(val.applicationDate),
        comments: val.comments
      };

      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }
}