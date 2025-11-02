import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; // For Date Picker
import { MatNativeDateModule } from '@angular/material/core';     // Required by Date Picker

// Re-use Employee interface
interface Employee { id: number; name: string; avatar: string; }
interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'pendiente' | 'en-progreso' | 'completada';
  dueDate: string;
}

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule, // Add Datepicker
    MatNativeDateModule  // Add NativeDate
  ],
  templateUrl: './add-task-dialog.html',
  styleUrls: ['./add-task-dialog.scss']
})
export class AddTaskDialog implements OnInit {
  taskForm: FormGroup;
  availableAssignees: Employee[] = []; // To store employees passed from parent
  availableGoals: Goal[] = []; // <-- Nueva propiedad
  priorities: Array<'alta' | 'media' | 'baja'> = ['alta', 'media', 'baja'];

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    private fb: FormBuilder,
    // Inject data (availableAssignees) from SprintBoardComponent
    @Inject(MAT_DIALOG_DATA) public data: { sprintId: string | null, availableAssignees: Employee[], availableGoals: Goal[] }
  ) {
    this.availableAssignees = data.availableAssignees || [];
    this.availableGoals = data.availableGoals || [];
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignee: [null, Validators.required],
      dueDate: [null],
      priority: ['media', Validators.required],
      linkedGoal: [null] // <-- Nuevo control (opcional)
    });

    // Set the assignees passed from the parent component
    this.availableAssignees = data.availableAssignees || [];
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close(); // Close without data
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      // Format the date if selected
      const dueDateFormatted = formData.dueDate
        ? new Date(formData.dueDate).toISOString().split('T')[0] // Format as YYYY-MM-DD
        : null;

      // Prepare data to return (including assignee name for display)
      const resultData = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        assigneeId: this.taskForm.value.assignee.id,
        assigneeName: this.taskForm.value.assignee.name,
        dueDate: dueDateFormatted, // (tu lógica de formato de fecha)
        priority: this.taskForm.value.priority,
        metaId: this.taskForm.value.linkedGoal ? this.taskForm.value.linkedGoal.id : null,
        metaTitle: this.taskForm.value.linkedGoal ? this.taskForm.value.linkedGoal.title : null
      };
      this.dialogRef.close(resultData); // Close and return formatted data
    }
  }
}