import { Component, Inject, OnInit } from '@angular/core'; // Añade OnInit
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

// Re-use Task and Employee interfaces
interface Task { id: number; title: string; assignedTo: string; dueDate: string; priority: 'alta' | 'media' | 'baja'; status: string; description?: string; /* Add assigneeId if needed */ }
interface Employee { id: number; name: string; avatar: string; }

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatIcon
  ],
  templateUrl: './edit-task-dialog.html',
  styleUrls: ['./edit-task-dialog.scss'] // Puedes reutilizar los estilos de add-task-dialog.scss si quieres
})
export class EditTaskDialog implements OnInit { // Implementa OnInit
  taskForm: FormGroup;
  availableAssignees: Employee[] = [];
  priorities: Array<'alta' | 'media' | 'baja'> = ['alta', 'media', 'baja'];
  existingTaskData: Task;
  compareEmployees(e1: Employee, e2: Employee): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { taskData: Task, availableAssignees: Employee[] }
  ) {
    this.existingTaskData = data.taskData; // Guarda la tarea recibida
    this.availableAssignees = data.availableAssignees || [];

    // Encuentra el objeto Employee completo basado en el nombre asignado (o ID si lo tuvieras)
    const currentAssignee = this.availableAssignees.find(emp => emp.name === this.existingTaskData.assignedTo);

    // Inicializa el formulario
    this.taskForm = this.fb.group({
      title: [this.existingTaskData.title, Validators.required],
      description: [this.existingTaskData.description || ''],
      assignee: [currentAssignee, Validators.required], // Preselecciona el objeto empleado
      // Convierte la fecha string a objeto Date para el datepicker
      dueDate: [this.existingTaskData.dueDate ? new Date(this.existingTaskData.dueDate + 'T00:00:00') : null], // Asegura zona horaria local
      priority: [this.existingTaskData.priority, Validators.required]
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const dueDateFormatted = formData.dueDate
        ? new Date(formData.dueDate.getTime() - (formData.dueDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] // Ajusta timezone y formatea
        : null;

      // Prepara los datos actualizados para devolver
      const resultData = {
        title: formData.title,
        description: formData.description,
        assigneeId: formData.assignee.id,
        assigneeName: formData.assignee.name,
        dueDate: dueDateFormatted,
        priority: formData.priority
        // No devolvemos 'status' ni 'id', esos no se editan aquí
      };
      this.dialogRef.close(resultData);
    }
  }
}