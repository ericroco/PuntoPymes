import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // For potential links
// Material
import { MatStepperModule } from '@angular/material/stepper'; // Use Stepper for visual progress
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; // If tasks are manually checkable
import { FormsModule } from '@angular/forms'; // For ngModel if needed

// Interface for an onboarding task
interface OnboardingTask {
  id: number;
  title: string;
  description: string;
  link?: string; // Optional link (e.g., to profile edit)
  isComplete: boolean;
  // Could add 'responsible' (e.g., Empleado, RRHH, TI)
}

@Component({
  selector: 'app-onboarding-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // Add
    MatStepperModule, // Add Stepper
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule // Add Checkbox
  ],
  templateUrl: './onboarding-dashboard.html',
  styleUrls: ['./onboarding-dashboard.scss']
})
export class OnboardingDashboard implements OnInit {

  // Sample tasks - In reality, fetch based on assigned Onboarding Plan (RF-39-02)
  onboardingTasks: OnboardingTask[] = [
    { id: 1, title: 'Completa tu Información de Contacto', description: 'Ve a tu perfil y asegúrate de que tu teléfono y contacto de emergencia estén actualizados.', link: '/dashboard/employee/me', isComplete: false }, // Link to 'My Profile'
    { id: 2, title: 'Sube tu Foto de Perfil', description: 'Ayuda a tus compañeros a reconocerte.', link: '/dashboard/employee/me', isComplete: false },
    { id: 3, title: 'Lee el Manual del Empleado', description: 'Encuéntralo en la Biblioteca de Políticas y marca como leído.', link: '/dashboard/policies', isComplete: false },
    { id: 4, title: 'Configura tu Contraseña Inicial', description: 'Por seguridad, cambia tu contraseña temporal.', link: '/dashboard/settings/account', isComplete: false }, // Example link
    { id: 5, title: 'Confirma Recepción de Equipo (TI)', description: 'Marca esta tarea cuando TI te entregue tu laptop/equipo.', isComplete: false } // Manual check
  ];

  constructor() {}

  ngOnInit(): void {
    // TODO: Fetch the specific onboarding tasks for the logged-in user
  }

  // Placeholder function to simulate completing a task
  toggleTaskCompletion(task: OnboardingTask): void {
     // In a real app, clicking might navigate or open a modal.
     // For simple checkboxes, the [(ngModel)] handles the state.
     // We might need an API call here to mark the task complete in the backend.
     console.log(`Task '${task.title}' completion toggled to: ${task.isComplete}`);
     // TODO: Call API to update task status
  }
}