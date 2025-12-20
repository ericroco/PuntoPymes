import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Tu servicio (Asegúrate de que la ruta sea correcta)
import { EmployeesService } from '../../services/employees';

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  link?: string;
  isComplete: boolean;
}

@Component({
  selector: 'app-onboarding-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './onboarding-dashboard.html',
  styleUrls: ['./onboarding-dashboard.scss']
})
export class OnboardingDashboard implements OnInit {

  // Variables de estado
  onboardingTasks: OnboardingTask[] = [];
  isLoading = true;

  // Inyección del servicio
  private employeeService = inject(EmployeesService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.employeeService.getMyOnboardingTasks().subscribe({
      next: (tasks) => {
        this.onboardingTasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando tareas:', err);
        this.isLoading = false;
      }
    });
  }

  toggleTaskCompletion(task: OnboardingTask): void {
    // Llamada al Backend para guardar el estado
    this.employeeService.toggleOnboardingTask(task.id, task.isComplete).subscribe({
      next: () => {
        console.log(`Tarea "${task.title}" actualizada a: ${task.isComplete}`);
      },
      error: (err) => {
        console.error('Error actualizando tarea:', err);
        // Si falla la API, revertimos el checkbox visualmente para que no mienta
        task.isComplete = !task.isComplete;
        alert('Hubo un error al guardar el estado de la tarea. Inténtalo de nuevo.');
      }
    });
  }
}