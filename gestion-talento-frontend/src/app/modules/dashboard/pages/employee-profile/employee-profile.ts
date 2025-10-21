import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDocumentDialog } from '../../components/add-document-dialog/add-document-dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterModule],
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
  salaryHistory = [
    { date: '2025-01-15', type: 'Aumento Anual', amount: 1800, comments: 'Ajuste por inflación y desempeño.' },
    { date: '2024-07-01', type: 'Bono de Desempeño', amount: 500, comments: 'Bono por Q2.' },
    { date: '2024-01-15', type: 'Salario Inicial', amount: 1600, comments: 'Contratación inicial.' }
  ];
  constructor(public dialog: MatDialog) { }

  // Función para abrir el modal
  openAddDocumentDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentDialog, {
      width: '450px', // Ancho del modal
      disableClose: true // Opcional: evita cerrar al hacer clic fuera
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Documento a añadir:', result);
        // Aquí iría la lógica para añadir el documento a la lista 'unifiedDocuments'
        // (cuando implementemos el backend, aquí llamaríamos a la API)
        // Por ahora, simulamos añadirlo:
        const newDoc = {
          name: result.fileName || 'Nuevo Documento.pdf', // Usamos el nombre del archivo
          type: result.documentType || 'General',
          origin: 'Empleado', // O 'Empresa' si lo abre un admin
          date: new Date().toISOString().split('T')[0], // Fecha actual
          canDelete: true
        };
        this.unifiedDocuments = [...this.unifiedDocuments, newDoc];
      } else {
        console.log('Modal cerrado sin guardar');
      }
    });
  }
}