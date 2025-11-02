import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Employee { id: number; name: string; role: string; department: string; hireDate?: string; reportsTo?: string; email?: string; phone?: string; /* ... */ }
interface Manager { id: number | string; name: string; }

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-employee-dialog.html',
  styleUrls: ['./edit-employee-dialog.scss'] // Can reuse styles
})
export class EditEmployeeDialog implements OnInit {
  profileForm: FormGroup;
  existingData: Employee;
  // TODO: Populate these from MAT_DIALOG_DATA or fetch from a service
  availableDepartments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];
  availableRoles: string[] = ['Desarrollador Frontend', 'Diseñador UX/UI', 'Contador', 'Líder de Proyecto', 'Especialista Marketing']; // Load dynamically
  availableManagers: Manager[] = [{id: 4, name: 'Erick Rodas'}, {id: 'GG', name: 'Gerencia General'}]; // Load dynamically

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { employeeData: Employee /*, availableDepartments?, availableManagers? */ }
  ) {
    this.existingData = data.employeeData;
    // Populate lists if passed via data
    // this.availableDepartments = data.availableDepartments || [];
    // this.availableManagers = data.availableManagers || [];

    const parseDate = (dateString?: string): Date | null => dateString ? new Date(dateString + 'T00:00:00') : null;

    this.profileForm = this.fb.group({
      name: [this.existingData.name, Validators.required],
      role: [this.existingData.role, Validators.required],
      department: [this.existingData.department, Validators.required],
      hireDate: [parseDate(this.existingData.hireDate)], // Parse to Date
      reportsTo: [this.existingData.reportsTo], // Store manager's name for simplicity, or ID if using objects
      email: [this.existingData.email || '', [Validators.required, Validators.email]], // Admins likely can edit email
      phone: [this.existingData.phone || ''] // Admins likely can edit phone
      // Add other CORE fields admin should edit (DO NOT add custom fields here)
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      const formatDt = (date: Date | null): string | null => date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

      // Return only the fields that were potentially changed
      this.dialogRef.close({
        name: formData.name,
        role: formData.role,
        department: formData.department,
        hireDate: formatDt(formData.hireDate),
        reportsTo: formData.reportsTo,
        email: formData.email,
        phone: formData.phone
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}