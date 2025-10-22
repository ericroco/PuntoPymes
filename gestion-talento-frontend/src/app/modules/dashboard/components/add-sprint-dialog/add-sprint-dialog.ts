import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-sprint-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-sprint-dialog.html',
  styleUrls: ['./add-sprint-dialog.scss']
})
export class AddSprintDialog {
  sprintForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSprintDialog>,
    private fb: FormBuilder
  ) {
    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required], // Add Start Date
      endDate: [null, Validators.required]    // Add End Date
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.sprintForm.valid) {
      const formData = this.sprintForm.value;
      // Format dates before sending
      const formatDt = (date: Date | null) => date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

      this.dialogRef.close({
        name: formData.name,
        description: formData.description,
        startDate: formatDt(formData.startDate),
        endDate: formatDt(formData.endDate)
      });
    }
  }
}