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

  unifiedDocuments = [
    { name: 'Contrato Firmado.pdf', type: 'Documento Legal', origin: 'Empresa', date: '2024-01-15', canDelete: false },
    { name: 'Certificado de Scrum Master', type: 'Certificación Externa', origin: 'Empleado', date: '2025-08-15', canDelete: true },
    { name: 'Certificado AWS Cloud Practitioner.pdf', type: 'Certificación Externa', origin: 'Empresa', date: '2025-09-20', canDelete: false },
    { name: 'Reconocimiento "Empleado del Mes"', type: 'Reconocimiento Interno', origin: 'Empleado', date: '2025-07-01', canDelete: true }
  ];
}