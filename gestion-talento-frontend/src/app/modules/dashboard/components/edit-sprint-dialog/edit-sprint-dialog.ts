import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Re-use Sprint interface if defined globally, or define locally
interface Sprint { id: string; name: string; description: string; startDate: string; endDate: string; status: string; /* ... */ }

@Component({
  selector: 'app-edit-sprint-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './edit-sprint-dialog.html',
  styleUrls: ['./edit-sprint-dialog.scss'] // Can reuse add-sprint-dialog styles
})
export class EditSprintDialog implements OnInit {
  sprintForm: FormGroup;
  existingSprintData: Sprint;

  constructor(
    public dialogRef: MatDialogRef<EditSprintDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Sprint // Receive the full Sprint object
  ) {
    this.existingSprintData = data;

    // Helper to convert YYYY-MM-DD string to Date object
    const parseDate = (dateString: string | null): Date | null => {
        return dateString ? new Date(dateString + 'T00:00:00') : null; // Add time to avoid timezone issues
    };

    this.sprintForm = this.fb.group({
      name: [this.existingSprintData.name, Validators.required],
      description: [this.existingSprintData.description || ''],
      startDate: [parseDate(this.existingSprintData.startDate), Validators.required],
      endDate: [parseDate(this.existingSprintData.endDate), Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.sprintForm.valid) {
      const formData = this.sprintForm.value;
      const formatDt = (date: Date | null): string | null => date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

      // Return only the updated fields
      this.dialogRef.close({
        name: formData.name,
        description: formData.description,
        startDate: formatDt(formData.startDate),
        endDate: formatDt(formData.endDate)
        // Do not return id or status from here
      });
    }
  }
}