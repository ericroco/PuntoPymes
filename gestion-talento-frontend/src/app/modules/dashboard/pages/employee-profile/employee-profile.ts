import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddDocumentDialog } from '../../components/add-document-dialog/add-document-dialog'
import { EditContactInfoDialog } from '../../components/edit-contact-info-dialog/edit-contact-info-dialog';
import { EditEmployeeDialog } from '../../components/edit-employee-dialog/edit-employee-dialog';
import { EditScheduleDialog } from '../../components/edit-schedule-dialog/edit-schedule-dialog';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email?: string;
  phone?: string;
  hireDate?: string;
  reportsTo?: string;
  address?: string;
  emergencyContact?: string;
  dateOfBirth?: string;
  customFields?: { [key: string]: any };
}

interface Goal {
  title: string;
  progress: number;
  status: string;
  statusColor: string;
}

interface Document {
  name: string;
  type: string;
  origin: 'Empresa' | 'Empleado';
  date: string;
  canDelete: boolean;
}

interface SalaryHistoryItem {
  date: string;
  type: string;
  amount: number;
  comments: string;
}

interface CustomFieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string;
}


@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './employee-profile.html',
  styleUrls: ['./employee-profile.scss']
})
export class EmployeeProfile implements OnInit {

  viewingAsAdmin: boolean = true;
  evaluationNotes: string = '';
  recommendation: string = 'Mantener Posición';
  employee: Employee | null = null;
  kpis = [
    { label: 'Tareas Completadas (Q4)', value: '38/45' },
    { label: 'Progreso de Metas', value: '82%' },
    { label: 'Asistencia', value: '98%' }
  ];

  goals: Goal[] = [
    { title: 'Refactorizar Módulo de Autenticación', progress: 90, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Obtener Certificación en Angular', progress: 60, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Mentorear a nuevo integrante del equipo', progress: 100, status: 'completada', statusColor: '#2ECC71' }
  ];

  unifiedDocuments: Document[] = [
    { name: 'Contrato Firmado.pdf', type: 'Documento Legal', origin: 'Empresa', date: '2024-01-15', canDelete: false }, // canDelete should adjust based on role
    { name: 'Certificado de Scrum Master', type: 'Certificación Externa', origin: 'Empleado', date: '2025-08-15', canDelete: true },
    { name: 'Certificado AWS Cloud Practitioner.pdf', type: 'Certificación Externa', origin: 'Empresa', date: '2025-09-20', canDelete: false },
    { name: 'Reconocimiento "Empleado del Mes"', type: 'Reconocimiento Interno', origin: 'Empleado', date: '2025-07-01', canDelete: true }
  ];

  // Salary History - Should be fetched based on employee ID (likely admin only)
  salaryHistory: SalaryHistoryItem[] = [
    { date: '2025-01-15', type: 'Aumento Anual', amount: 1800, comments: 'Ajuste por inflación y desempeño.' },
    { date: '2024-07-01', type: 'Bono de Desempeño', amount: 500, comments: 'Bono por Q2.' },
    { date: '2024-01-15', type: 'Salario Inicial', amount: 1600, comments: 'Contratación inicial.' }
  ];

  definedCustomFields: CustomFieldDefinition[] = [
    { key: 'talla_camisa', label: 'Talla de Camisa', type: 'select', options: 'S, M, L, XL, XXL' },
    { key: 'licencia_numero', label: 'Número de Licencia', type: 'text' },
    { key: 'fecha_examen_medico', label: 'Fecha Último Examen Médico', type: 'date' }
  ];
  assignedSchedule = { // Sample data - Load with employee
    type: 'Estándar', // 'Estándar', 'Personalizado'
    days: ['L', 'M', 'X', 'J', 'V'],
    startTime: '09:00',
    endTime: '18:00'
  };

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Escucha cambios en los parámetros de la ruta (útil si navegas de un perfil a otro)
    this.route.paramMap.subscribe(params => {
      // Comprueba si el parámetro 'id' existe en la URL
      const employeeIdParam = params.get('id');

      if (employeeIdParam) {
        // --- VISTA DE ADMIN ---
        // Estamos en /employee/:id
        this.viewingAsAdmin = true;
        const employeeId = parseInt(employeeIdParam, 10);
        console.log("Cargando perfil (Admin) para ID:", employeeId);
        // Carga los datos del empleado solicitado
        this.loadEmployeeData(employeeId);

      } else {
        // --- VISTA DE EMPLEADO (MI PERFIL) ---
        // Estamos en /my-profile (no hay 'id' param)
        this.viewingAsAdmin = false;

        // --- TODO: Obtener el ID del usuario logueado desde un servicio de autenticación ---
        // Ejemplo: const myId = this.authService.getLoggedInUserId();

        // --- Simulación: Asumimos que el empleado logueado es Jeimy (ID 1) ---
        const myId = 1;
        console.log("Cargando Mi Perfil (Empleado) para ID:", myId);

        // Carga los datos del propio empleado
        this.loadEmployeeData(myId);
      }

      // Ajusta la capacidad de borrar documentos basado en la vista
      this.updateDocumentPermissions();
    });
  }


  updateDocumentPermissions(): void {
    this.unifiedDocuments.forEach(doc => {
      doc.canDelete = this.viewingAsAdmin || (!this.viewingAsAdmin && doc.origin === 'Empleado');
    });
  }

  // --- Data Loading Simulation ---
  loadEmployeeData(id: number): void {
    const sampleData: { [key: number]: Employee } = {
      1: {
        id: 1, name: 'Jeimy Torres', role: 'Desarrolladora Frontend', department: 'Tecnología',
        avatar: 'https://i.pravatar.cc/100?u=jeimytorres', email: 'jtorres@empresa.com', phone: '0987654321',
        hireDate: '2024-01-15', reportsTo: 'Erick Rodas', address: 'Calle Falsa 123, Loja', emergencyContact: 'Mamá - 0911111111',
        customFields: { talla_camisa: 'M', fecha_examen_medico: '2025-05-10' }
      },
      2: {
        id: 2, name: 'Valentina Samaniego', role: 'Diseñadora UX/UI', department: 'Diseño',
        avatar: 'https://i.pravatar.cc/100?u=valentinasamaniego', email: 'vsamaniego@empresa.com', phone: '0912345678',
        hireDate: '2024-03-01', reportsTo: 'Erick Rodas',
        customFields: { talla_camisa: 'S', licencia_numero: 'L00-123' }
      },
      4: {
        id: 4, name: 'Erick Rodas', role: 'Líder de Proyecto', department: 'Tecnología',
        avatar: 'https://i.pravatar.cc/100?u=erickrodas', email: 'erodas@empresa.com', phone: '0999999999',
        hireDate: '2023-11-01', reportsTo: 'Gerencia General',
        customFields: { talla_camisa: 'L' }
      },
    };
    this.employee = sampleData[id] || null;
    // TODO: Load goals, documents, kpis, salary history
  }

  openAddDocumentDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentDialog, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Documento a añadir:', result);
        const newDoc: Document = {
          name: result.fileName || 'Nuevo Documento.pdf',
          type: result.documentType || 'General',
          origin: this.viewingAsAdmin ? 'Empresa' : 'Empleado',
          date: new Date().toISOString().split('T')[0],
          canDelete: true
        };
        this.unifiedDocuments = [...this.unifiedDocuments, newDoc];
      } else {
        console.log('Modal cerrado sin guardar');
      }
    });
  }

  openEditContactInfoDialog(): void {
    if (this.viewingAsAdmin || !this.employee) {
      console.warn('Edit contact info only available for employee self-view or specific admin action.');
      return;
    }

    console.log('Opening modal to edit contact info for:', this.employee.name);
    const dialogRef = this.dialog.open(EditContactInfoDialog, {
      width: '500px', // Adjust width as needed
      disableClose: true,
      data: { // Pass current contact info to pre-fill the form later
        email: this.employee.email,
        phone: this.employee.phone,
        address: this.employee.address,
        emergencyContact: this.employee.emergencyContact
        // Pass any other editable fields
      }
    });

    dialogRef.afterClosed().subscribe(updatedInfo => {
      if (updatedInfo) {
        console.log('Contact info update received (placeholder):', updatedInfo);
        // --- TODO: Update employee object locally ---
        // Example: this.employee = { ...this.employee, ...updatedInfo };
        // --- TODO: Call API to save updated contact info ---
      } else {
        console.log('Edit contact info dialog closed without saving.');
      }
    });
  }

  // Placeholder for deleting a document (would need confirmation)
  deleteDocument(docToDelete: Document): void {
    console.log('Attempting to delete:', docToDelete.name);

    // Permission check (redundant if button *ngIf is correct, but good practice)
    if (!this.viewingAsAdmin && docToDelete.origin !== 'Empleado') {
      console.error("Permission denied to delete company document.");
      // Optionally show a user-facing error message (e.g., Snackbar)
      return;
    }

    // --- Open Confirmation Dialog ---
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar el documento "${docToDelete.name}"? Esta acción no se puede deshacer.`,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }
    });

    // --- Handle Dialog Result ---
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Deletion confirmed for:', docToDelete.name);
        // --- TODO: Call API to delete document record (and potentially file) ---
        // Example: this.documentService.deleteDocument(employeeId, documentId).subscribe(...)

        // --- Simulate removal from the list ---
        this.unifiedDocuments = this.unifiedDocuments.filter(doc =>
          // Filter based on a unique identifier if possible, otherwise use name/date combo
          !(doc.name === docToDelete.name && doc.date === docToDelete.date)
        );
        console.log('Document removed locally (simulation).');
        // Optionally show success message (e.g., Snackbar)

      } else {
        console.log('Deletion cancelled for:', docToDelete.name);
      }
    });
  }
  openEditProfileDialog(): void {
    // Guard clause: Only Admins can use this
    if (!this.viewingAsAdmin || !this.employee) {
      console.warn('Edit profile (Admin) requires admin privileges.');
      return;
    }

    console.log('Opening modal to edit employee profile (Admin) for:', this.employee.name);
    const dialogRef = this.dialog.open(EditEmployeeDialog, {
      width: '600px', // Wider modal for more fields
      disableClose: true,
      data: {
        employeeData: { ...this.employee } // Pass a *copy* of current employee data
        // TODO: Pass lists needed for dropdowns (e.g., all departments, all potential managers)
        // availableDepartments: ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'],
        // availableManagers: [{id: 4, name: 'Erick Rodas'}, {id: 10, name: 'Gerencia General'}]
      }
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData && this.employee) {
        console.log('Profile update received (Admin):', updatedData);
        // --- Update employee object locally ---
        this.employee = {
          ...this.employee, // Keep existing properties
          ...updatedData    // Overwrite with updated values
        };
        // --- TODO: Call API to save updated employee profile ---
        console.log('Employee object updated locally (Admin simulation)');
      } else {
        console.log('Edit profile (Admin) dialog closed without saving.');
      }
    });
  }
  openEditScheduleDialog(): void {
    if (!this.viewingAsAdmin || !this.employee) return;
    console.log('Opening edit schedule dialog for:', this.employee.name);
    const dialogRef = this.dialog.open(EditScheduleDialog, { // Create this component next
      width: '550px',
      data: { currentSchedule: { ...this.assignedSchedule } } // Pass current schedule
    });
    dialogRef.afterClosed().subscribe(newSchedule => {
      if (newSchedule) {
        console.log('New schedule saved:', newSchedule);
        this.assignedSchedule = newSchedule; // Update locally
        //         // --- TODO: Call API to save schedule for employee ---
      }
    });
  }
  saveEvaluation(): void {
    if (!this.viewingAsAdmin || !this.employee) return; // Guard clause

    const evaluationData = {
      employeeId: this.employee.id,
      notes: this.evaluationNotes,
      recommendation: this.recommendation,
      evaluationDate: new Date().toISOString() // Add timestamp
    };

    console.log('Saving Evaluation:', evaluationData);
    // --- TODO: Call API Service to save the evaluation data ---
    // Example: this.evaluationService.saveEvaluation(evaluationData).subscribe(() => { ... });
    // Show a success message (e.g., using MatSnackBar)
    alert('Evaluación guardada (simulación)'); // Simple feedback for now
  }
}