import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaremos más cosas aquí después

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-profile.html',
  styleUrls: ['./employee-profile.scss']
})
export class EmployeeProfile {
  employee = {
    name: 'Jeimy Torres',
    role: 'Desarrolladora Frontend',
    department: 'Tecnología',
    avatar: 'https://i.pravatar.cc/100?u=jeimytorres'
  };

  kpis = [
    { label: 'Tareas Completadas (Q4)', value: '38/45' },
    { label: 'Progreso de Metas', value: '82%' },
    { label: 'Asistencia', value: '98%' }
  ];

  goals = [
    { title: 'Refactorizar Módulo de Autenticación', progress: 90, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Obtener Certificación en Angular', progress: 60, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Mentorear a nuevo integrante del equipo', progress: 100, status: 'completada', statusColor: '#2ECC71' }
  ];

  achievements = [
    { title: 'Certificado de Scrum Master', date: '2025-08-15' },
    { title: 'Reconocimiento "Empleado del Mes"', date: '2025-07-01' }
  ];
}