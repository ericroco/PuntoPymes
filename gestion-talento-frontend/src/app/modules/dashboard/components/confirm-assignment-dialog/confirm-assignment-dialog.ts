import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaciones de Formularios
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importaciones de Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

// Interface para los datos que recibe
interface ConfirmationData {
  benefitName: string;
  totalAssignedCount: number;
}

@Component({
  selector: 'app-confirm-assignment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './confirm-assignment-dialog.html',
  styleUrls: ['./confirm-assignment-dialog.scss']
})
export class ConfirmAssignmentDialog implements OnInit {
  confirmationForm: FormGroup;
  data: ConfirmationData;

  constructor(
    public dialogRef: MatDialogRef<ConfirmAssignmentDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: ConfirmationData
  ) {
    this.data = data;
    this.confirmationForm = this.fb.group({
      // Fecha de aplicación, obligatoria, con hoy por defecto
      applicationDate: [new Date(), Validators.required] 
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(); // Cierra sin devolver nada
  }

  onSave(): void {
    if (this.confirmationForm.valid) {
      // Devuelve la fecha seleccionada y formateada
      const selectedDate = this.confirmationForm.value.applicationDate;
      this.dialogRef.close(this.formatDate(selectedDate)); // Devuelve YYYY-MM-DD
    }
  }

  // Helper para formatear la fecha (evita problemas de zona horaria)
  private formatDate(date: Date | null): string | null {
    if (!date) {
      return null;
    }
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}