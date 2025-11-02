import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Reactive Forms Modules
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'; // For days checkboxes

// Interface for the data passed in and returned
interface ScheduleData {
    type: 'Estándar' | 'Personalizado';
    days: string[]; // Array of day codes ('L', 'M', 'X', 'J', 'V', 'S', 'D')
    startTime: string; // HH:mm format
    endTime: string;   // HH:mm format
}

@Component({
  selector: 'app-edit-schedule-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Ensure ReactiveFormsModule is imported
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule // Ensure MatCheckboxModule is imported
  ],
  templateUrl: './edit-schedule-dialog.html',
  styleUrls: ['./edit-schedule-dialog.scss']
})
export class EditScheduleDialog implements OnInit {
  scheduleForm: FormGroup;
  scheduleTypes = ['Estándar', 'Personalizado'];
  // Define days of the week with labels and values
  daysOfWeek = [
    { label: 'Lunes', value: 'L' }, { label: 'Martes', value: 'M' },
    { label: 'Miércoles', value: 'X' }, { label: 'Jueves', value: 'J' },
    { label: 'Viernes', value: 'V' }, { label: 'Sábado', value: 'S' },
    { label: 'Domingo', value: 'D' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditScheduleDialog>,
    private fb: FormBuilder,
    // Inject the current schedule data
    @Inject(MAT_DIALOG_DATA) public data: { currentSchedule: ScheduleData }
  ) {
    // Initialize the form group with current data
    this.scheduleForm = this.fb.group({
      type: [this.data.currentSchedule?.type || 'Estándar', Validators.required], // Default to 'Estándar'
      startTime: [this.data.currentSchedule?.startTime || '09:00', Validators.required], // Default start time
      endTime: [this.data.currentSchedule?.endTime || '18:00', Validators.required],   // Default end time
      // Build the FormArray for checkboxes, pre-selecting based on current schedule
      selectedDays: this.buildDaysArray(this.data.currentSchedule?.days || ['L', 'M', 'X', 'J', 'V']) // Default standard days
    });

    // Initial check to enable/disable days based on type
    this.toggleDaysEnabled(this.scheduleForm.get('type')?.value);
  }

  ngOnInit(): void {
    // Listen for changes in the 'type' dropdown
    this.scheduleForm.get('type')?.valueChanges.subscribe(typeValue => {
      this.toggleDaysEnabled(typeValue);
    });
  }

  // Helper function to create the FormArray for day checkboxes
  private buildDaysArray(selectedDays: string[]): FormArray {
    // Create an array of FormControls (one for each day)
    const controls = this.daysOfWeek.map(day => {
      // Set the control's initial value to true if the day is in selectedDays, false otherwise
      return this.fb.control(selectedDays.includes(day.value));
    });
    // Return a FormArray containing these controls
    return this.fb.array(controls);
  }

  // Getter to easily access the FormArray in the template
  get selectedDaysFormArray(): FormArray {
    return this.scheduleForm.get('selectedDays') as FormArray;
  }

  // Function to enable or disable the day checkboxes based on the selected schedule type
  private toggleDaysEnabled(type: string | null): void {
    const daysControl = this.scheduleForm.get('selectedDays');
    if (type === 'Estándar') {
      // If 'Estándar', disable the checkboxes
      daysControl?.disable();
      // Optionally reset standard days visually (though disabled prevents changes)
      // this.selectedDaysFormArray.controls.forEach((control, index) => {
      //    control.setValue(['L','M','X','J','V'].includes(this.daysOfWeek[index].value));
      // });
    } else {
      // If 'Personalizado', enable the checkboxes
      daysControl?.enable();
    }
  }

  // Close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }

  // Process and save the schedule
  onSave(): void {
    if (this.scheduleForm.valid) {
      const formData = this.scheduleForm.value;
      let finalSelectedDayValues: string[] = [];

      if (formData.type === 'Personalizado') {
          // If custom, get the values from the FormArray
          finalSelectedDayValues = this.selectedDaysFormArray.controls
              // Map each checkbox state (true/false) to its corresponding day value ('L', 'M', etc.) or null
              .map((control, index) => control.value ? this.daysOfWeek[index].value : null)
              // Filter out the null values and ensure TypeScript knows the result is an array of strings
              .filter((value): value is string => value !== null);
      } else {
          // If standard, use the default Monday-Friday
          finalSelectedDayValues = ['L', 'M', 'X', 'J', 'V'];
      }

      // Prepare the final schedule object to return
      const resultData: ScheduleData = {
        type: formData.type,
        startTime: formData.startTime,
        endTime: formData.endTime,
        days: finalSelectedDayValues
      };
      this.dialogRef.close(resultData); // Close and return the data
    } else {
      this.scheduleForm.markAllAsTouched(); // Mark fields if invalid on save attempt
    }
  }
}