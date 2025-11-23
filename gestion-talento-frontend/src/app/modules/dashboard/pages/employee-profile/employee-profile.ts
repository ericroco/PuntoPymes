import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

// Componentes de diálogo
import { AddDocumentDialog } from '../../components/add-document-dialog/add-document-dialog';
import { EditContactInfoDialog } from '../../components/edit-contact-info-dialog/edit-contact-info-dialog';
import { EditEmployeeDialog } from '../../components/edit-employee-dialog/edit-employee-dialog';
import { EditScheduleDialog } from '../../components/edit-schedule-dialog/edit-schedule-dialog';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EditProfilePictureDialog } from '../../components/edit-profile-picture-dialog/edit-profile-picture-dialog';

// Servicios
import { AuthService } from '../../../auth/services/auth';
import { EmployeesService, Employee, EmployeeDocument } from '../../services/employees';
import { PerformanceService } from '../../services/performance';
import { PayrollService } from '../../services/payroll';
import { AttendanceService } from '../../services/attendance';


// Interfaces Locales para datos aún no conectados al backend
interface Goal { title: string; progress: number; status: string; statusColor: string; }
interface SalaryHistoryItem { date: string; type: string; amount: number; comments: string; }
interface CustomFieldDefinition { key: string; label: string; type: 'text' | 'number' | 'date' | 'select'; options?: string; }

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, RouterModule, MatIconModule,
    MatButtonModule, FormsModule, MatProgressSpinnerModule
  ],
  templateUrl: './employee-profile.html',
  styleUrls: ['./employee-profile.scss']
})
export class EmployeeProfile implements OnInit {
  private authService = inject(AuthService);
  private employeesService = inject(EmployeesService);
  private route = inject(ActivatedRoute);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private performanceService = inject(PerformanceService);
  private payrollService = inject(PayrollService);
  private attendanceService = inject(AttendanceService);
  private cdr = inject(ChangeDetectorRef);

  viewingAsAdmin: boolean = true;
  evaluationNotes: string = '';
  recommendation: string = 'Mantener Posición';

  // Datos Reales
  employee: Employee | null = null;
  isLoading = true;

  // Datos Simulados (Placeholders para futuras integraciones)
  kpis = [
    { label: 'Tareas Completadas (Q4)', value: '38/45' },
    { label: 'Progreso de Metas', value: '82%' },
    { label: 'Asistencia', value: '98%' }
  ];
  goals: Goal[] = [];
  unifiedDocuments: EmployeeDocument[] = [];
  salaryHistory: SalaryHistoryItem[] = [];
  definedCustomFields: CustomFieldDefinition[] = [];
  assignedSchedule = { type: 'Estándar', days: ['L', 'M', 'X', 'J', 'V'], startTime: '09:00', endTime: '18:00' };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const currentUser = this.authService.getUser();

      if (idParam) {
        // CASO 1: Viendo un empleado específico (Ruta /employee/:id)
        // Si soy Admin, tengo permisos de edición completa.
        this.viewingAsAdmin = this.authService.isAdmin();
        console.log("Cargando perfil (ID URL):", idParam);
        this.loadEmployeeData(idParam);

      } else {
        // CASO 2: Viendo MI propio perfil (Ruta /my-profile)
        this.viewingAsAdmin = false;

        if (currentUser && currentUser.empleadoId) {
          console.log("Cargando Mi Perfil (ID Token):", currentUser.empleadoId);
          this.loadEmployeeData(currentUser.empleadoId);
        } else {
          console.error('No se encontró ID de empleado en el usuario logueado');
          this.isLoading = false;
        }
      }
    });
  }

  // Cargar datos reales del Backend
  loadEmployeeData(id: string): void {
    this.isLoading = true;
    this.employeesService.getEmployeeById(id).subscribe({
      next: (data) => {
        console.log('Perfil cargado:', data);
        this.employee = data;
        this.isLoading = false;
        this.loadDocuments(id);
        this.loadGoals(id);
        this.loadSalaryHistory(id);
        this.loadAttendanceSummary(id);
        // Aquí podrías llamar a otros servicios para cargar documentos o metas reales
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.isLoading = false;
      }
    });
  }
  loadDocuments(id: string): void {
    this.employeesService.getEmployeeDocuments(id).subscribe({
      next: (docs) => {
        console.log('📄 Documentos actualizados:', docs);
        this.unifiedDocuments = docs;
        this.cdr.markForCheck(); // Forzar actualización de la vista
      }
    });
  }


  // Helper para iniciales
  getInitials(nombre: string, apellido: string): string {
    return (nombre.charAt(0) + (apellido ? apellido.charAt(0) : '')).toUpperCase();
  }

  // --- LÓGICA DE DOCUMENTOS (Simulada por ahora) ---
  updateDocumentPermissions(): void {
    this.unifiedDocuments.forEach(doc => {
      doc.canDelete = this.viewingAsAdmin || (!this.viewingAsAdmin && doc.origin === 'Empleado');
    });
  }

  // --- SUBIR DOCUMENTO (ARREGLADO) ---
  openAddDocumentDialog(): void {
    if (!this.employee) return;

    const dialogRef = this.dialog.open(AddDocumentDialog, { width: '450px', disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.file) {
        // 1. Llamar al servicio
        this.employeesService.uploadDocument(
          this.employee!.id,
          result.file,
          result.fileName,
          result.documentType
        ).subscribe({
          next: (res) => {
            this.snackBar.open('Documento subido con éxito', 'Cerrar', { duration: 3000 });

            // 2. RECARGAR LA LISTA INMEDIATAMENTE
            this.loadDocuments(this.employee!.id);
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Error al subir documento', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  // Para descargar (abrir en nueva pestaña)
  downloadDocument(doc: EmployeeDocument): void {
    if (doc.url) {
      // Abre la URL del archivo en una nueva pestaña
      window.open(doc.url, '_blank');
    } else {
      this.snackBar.open('Este documento no tiene archivo adjunto', 'Cerrar', { duration: 3000 });
    }
  }

  deleteDocument(docToDelete: EmployeeDocument): void {
    // 1. Validar si es un documento real con ID (el CV no tiene ID, por ejemplo)
    if (!docToDelete.id) {
      this.snackBar.open('Este documento no se puede eliminar (es de sistema).', 'Cerrar', { duration: 3000 });
      return;
    }

    // 2. Abrir el Modal de Confirmación
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de eliminar "${docToDelete.name}"?`,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }
    });

    // 3. Al cerrar el modal...
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // 4. Llamar al Backend para borrar
        this.employeesService.deleteDocument(docToDelete.id!).subscribe({
          next: () => {
            this.snackBar.open('Documento eliminado correctamente', 'Cerrar', { duration: 3000 });

            // 5. Recargar la lista para ver los cambios
            if (this.employee) {
              this.loadDocuments(this.employee.id);
            }
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            this.snackBar.open('Error al eliminar el documento', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  // --- EDICIÓN DE CONTACTO (Empleado) ---
  openEditContactInfoDialog(): void {
    if (!this.employee) return;

    const dialogRef = this.dialog.open(EditContactInfoDialog, {
      width: '500px',
      data: {
        email: this.employee.emailPersonal,
        phone: this.employee.telefono,
        address: this.employee.direccion || '', // Mapeo seguro
        emergencyContact: '' // Si tu backend no lo devuelve aún, pon vacío
      }
    });

    dialogRef.afterClosed().subscribe(updatedInfo => {
      if (updatedInfo && this.employee) {
        // Llamada real al backend para actualizar
        this.employeesService.updateEmployee(this.employee.id, {
          emailPersonal: updatedInfo.email,
          telefono: updatedInfo.phone
          // Agrega más campos si tu DTO de update lo soporta
        }).subscribe(() => {
          this.snackBar.open('Información actualizada', 'Cerrar', { duration: 3000 });
          this.loadEmployeeData(this.employee!.id); // Recargar datos frescos
        });
      }
    });
  }

  // --- EDICIÓN DE PERFIL (Admin) ---
  openEditProfileDialog(): void {
    if (!this.employee) return;

    const dialogRef = this.dialog.open(EditEmployeeDialog, {
      width: '600px',
      data: { employeeData: { ...this.employee } }
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData && this.employee) {
        // Mapear los datos del diálogo al DTO de actualización
        // (Asegúrate de que los nombres de campos coincidan con UpdateEmployeeDto)
        this.employeesService.updateEmployee(this.employee.id, updatedData).subscribe(() => {
          this.snackBar.open('Perfil actualizado', 'Cerrar', { duration: 3000 });
          this.loadEmployeeData(this.employee!.id);
        });
      }
    });
  }

  // --- PLACEHOLDERS (Horario y Evaluación) ---
  openEditScheduleDialog(): void {
    const dialogRef = this.dialog.open(EditScheduleDialog, { width: '550px', data: { currentSchedule: { ...this.assignedSchedule } } });
    dialogRef.afterClosed().subscribe(newSchedule => {
      if (newSchedule) this.assignedSchedule = newSchedule;
    });
  }

  saveEvaluation(): void {
    console.log('Guardando evaluación...', { notes: this.evaluationNotes, rec: this.recommendation });
    alert('Evaluación guardada (simulación)');
  }
  // --- DESEMPEÑO (Objetivos) ---
  loadGoals(employeeId: string): void {
    this.performanceService.getActiveCycle().subscribe(ciclo => {
      if (ciclo && ciclo.id) {
        this.performanceService.getEmployeeGoals(ciclo.id, employeeId).subscribe({
          next: (objetivos) => {
            console.log('Objetivos cargados:', objetivos);
            // Mapeo a la interfaz visual de tu HTML
            this.goals = objetivos.map(obj => ({
              title: obj.descripcion,
              progress: obj.progreso,
              status: obj.progreso === 100 ? 'Completada' : 'En Progreso',
              statusColor: obj.progreso === 100 ? '#2ECC71' : '#3498DB'
            }));
          },
          error: (err) => console.error('Error cargando objetivos:', err)
        });
      } else {
        console.log('No hay ciclo de evaluación activo.');
        this.goals = [];
      }
    });
  }

  // --- NÓMINA (Historial Salarial) ---
  loadSalaryHistory(employeeId: string): void {
    this.payrollService.getEmployeeContracts(employeeId).subscribe({
      next: (contratos) => {
        console.log('Contratos cargados:', contratos);
        this.salaryHistory = contratos.map(c => ({
          date: c.fechaInicio,
          type: `Contrato ${c.tipo}`, // Ej: "Contrato Indefinido"
          amount: c.salario,
          comments: c.estado // Ej: "Vigente"
        }));
      },
      error: (err) => console.error('Error cargando historial salarial:', err)
    });
  }
  loadAttendanceSummary(employeeId: string) {
    this.attendanceService.getSummary(employeeId).subscribe(summary => {
      // Actualizar KPIs
      const kpiAsistencia = this.kpis.find(k => k.label === 'Asistencia');
      if (kpiAsistencia) {
        kpiAsistencia.value = `${summary.asistenciaPercentage}%`;
      }
    });
  }
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Validar tamaño/tipo si quieres (opcional en front)
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Solo se permiten imágenes', 'Cerrar', { duration: 3000 });
        return;
      }

      this.isLoading = true; // Mostrar spinner o feedback visual

      this.employeesService.uploadProfilePhoto(this.employee!.id, file).subscribe({
        next: (res) => {
          console.log('Foto actualizada:', res);
          this.snackBar.open('Foto de perfil actualizada', 'Cerrar', { duration: 3000 });

          // Truco para refrescar la imagen inmediatamente sin recargar la página:
          // Agregamos un timestamp al final de la URL para romper la caché del navegador
          if (this.employee) {
            // Asumimos que el backend devuelve el objeto empleado actualizado o construimos la URL
            // Si tu backend devuelve { ...empleado, fotoUrl: '...' }
            this.employee.fotoUrl = res.fotoUrl + '?t=' + new Date().getTime();
          }

          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al subir la foto', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
  openEditAvatarDialog(): void {
    // Verificación de permisos básica
    if (!this.employee) return;
    if (!this.viewingAsAdmin && this.employee.id !== this.authService.getUser()?.empleadoId) {
      // Si no soy admin y no es mi perfil, no puedo editar
      return;
    }

    const dialogRef = this.dialog.open(EditProfilePictureDialog, {
      width: '500px',
      disableClose: true // Obligar a usar botones
    });

    dialogRef.afterClosed().subscribe(resultFile => {
      if (resultFile) {
        // 'resultFile' es el objeto File ya recortado que nos devolvió el modal
        this.uploadPhoto(resultFile);
      }
    });
  }

  // Método de subida (refactorizado del anterior onPhotoSelected)
  uploadPhoto(file: File): void {
    this.isLoading = true;
    this.employeesService.uploadProfilePhoto(this.employee!.id, file).subscribe({
      next: (res) => {
        this.snackBar.open('Foto actualizada correctamente', 'Cerrar', { duration: 3000 });
        const nuevaUrl = res.fotoUrl + '?t=' + new Date().getTime();
        if (this.employee) {
          this.employee.fotoUrl = nuevaUrl;
        }

        // 2. 👇 ACTUALIZAR EL USUARIO EN LOCALSTORAGE (Para el Sidebar/Header)
        // Solo si estoy editando MI propio perfil
        const currentUser = this.authService.getUser();
        if (currentUser && currentUser.empleadoId === this.employee?.id) {
          currentUser.fotoUrl = nuevaUrl; // Actualizamos la foto en el objeto local
          localStorage.setItem('user', JSON.stringify(currentUser)); // Guardamos
          // Opcional: Si tienes un Subject en AuthService, emítelo aquí para que el Sidebar se entere al instante
        }
        // Refrescar imagen (cache busting)
        if (this.employee) {
          this.employee.fotoUrl = res.fotoUrl + '?t=' + new Date().getTime();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al subir la foto', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

}