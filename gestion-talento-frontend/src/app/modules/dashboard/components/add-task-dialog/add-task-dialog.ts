import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Servicios
import { PerformanceService, Objetivo } from '../../services/performance';
import { AuthService } from '../../../auth/services/auth';

// Interface de datos del diálogo
interface DialogData {
  sprintId: string;
  projectId: string; // Útil si quisieras filtrar objetivos por proyecto (si existiera esa relación)
}

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-task-dialog.html',
  styleUrls: ['./add-task-dialog.scss']
})
export class AddTaskDialog implements OnInit {
  private performanceService = inject(PerformanceService);
  private authService = inject(AuthService);

  taskForm: FormGroup;

  // Lista de objetivos disponibles para vincular
  myGoals: Objetivo[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.taskForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      puntosHistoria: [1, [Validators.required, Validators.min(1)]],
      prioridad: ['MEDIA', Validators.required],
      objetivoId: [null] // <--- NUEVO CAMPO
    });
  }

  ngOnInit(): void {
    this.loadMyGoals();
  }

  loadMyGoals() {
    // 1. Obtener usuario actual
    const user = this.authService.getUser();
    if (!user?.empleadoId) return;

    // 2. Obtener Ciclo Activo
    this.performanceService.getActiveCycle().subscribe(cycle => {
      if (cycle) {
        // 3. Obtener Objetivos de este ciclo
        this.performanceService.getEmployeeGoals(cycle.id, user.empleadoId).subscribe(goals => {
          // Filtramos solo los que no están completados al 100%
          this.myGoals = goals.filter(g => g.progreso < 100);
        });
      }
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}