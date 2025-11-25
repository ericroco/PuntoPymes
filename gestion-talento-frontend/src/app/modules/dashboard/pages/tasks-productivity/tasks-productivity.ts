import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Componentes de Diálogo
import { AddSprintDialog } from '../../components/add-sprint-dialog/add-sprint-dialog';
import { EditSprintDialog } from '../../components/edit-sprint-dialog/edit-sprint-dialog';

// Servicios e Interfaces Reales
import { ProductivityService, Sprint, Project } from '../../services/productivity';

@Component({
  selector: 'app-tasks-productivity',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule, // Necesario para el selector de proyectos
    MatSelectModule,    // Necesario para el selector de proyectos
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './tasks-productivity.html',
  styleUrls: ['./tasks-productivity.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class TasksProductivity implements OnInit {
  private productivityService = inject(ProductivityService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // Datos Reales
  projects: Project[] = [];
  sprints: Sprint[] = [];

  // Estado de la vista
  selectedProjectId: string = '';
  isLoading = true;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  // --- 1. Carga Inicial: Obtener Proyectos ---
  loadProjects() {
    this.isLoading = true;
    this.productivityService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;

        if (this.projects.length > 0) {
          // Lógica inteligente para seleccionar proyecto inicial:
          // 1. Si viene por URL (?projectId=...), usar ese.
          // 2. Si no, usar el primero de la lista.
          const paramId = this.route.snapshot.queryParamMap.get('projectId');

          if (paramId && this.projects.find(p => p.id === paramId)) {
            this.selectedProjectId = paramId;
          } else {
            this.selectedProjectId = this.projects[0].id;
          }

          // Cargar los sprints del proyecto seleccionado
          this.loadSprints(this.selectedProjectId);
        } else {
          this.isLoading = false;
          // Aquí podrías mostrar un mensaje de "Crea tu primer proyecto"
        }
      },
      error: (err) => {
        console.error('Error cargando proyectos:', err);
        this.isLoading = false;
        this.snackBar.open('Error al conectar con el servidor', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // --- 2. Cargar Sprints del Proyecto Activo ---
  loadSprints(projectId: string) {
    this.isLoading = true;
    console.log(`Cargando sprints para proyecto: ${projectId}`);

    this.productivityService.getSprintsByProject(projectId).subscribe({
      next: (data) => {
        this.sprints = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando sprints:', err);
        this.isLoading = false;
      }
    });
  }

  // Evento al cambiar el dropdown
  onProjectChange(newProjectId: string) {
    this.selectedProjectId = newProjectId;
    this.loadSprints(newProjectId);
  }

  // --- 3. Crear Sprint (Backend Real) ---
  openAddSprintDialog(): void {
    // Validación: No se puede crear sprint sin proyecto padre
    if (!this.selectedProjectId) {
      this.snackBar.open('Selecciona un proyecto primero', 'Cerrar', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(AddSprintDialog, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        // Llamada al servicio
        this.productivityService.createSprint(this.selectedProjectId, result).subscribe({
          next: (newSprint) => {
            console.log('Sprint creado:', newSprint);
            this.snackBar.open('Sprint creado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadSprints(this.selectedProjectId); // Recargar lista
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.snackBar.open('Error al crear sprint', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  // --- 4. Editar Sprint (Backend Real) ---
  openEditSprintDialog(sprint: Sprint): void {
    const dialogRef = this.dialog.open(EditSprintDialog, {
      width: '500px',
      disableClose: true,
      data: { ...sprint } // Pasamos copia para no afectar vista si cancela
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData) {
        this.isLoading = true;
        this.productivityService.updateSprint(sprint.id, updatedData).subscribe({
          next: () => {
            this.snackBar.open('Sprint actualizado', 'Cerrar', { duration: 3000 });
            this.loadSprints(this.selectedProjectId);
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  // --- Helpers Visuales ---

  // Calcular progreso real si el backend no lo manda
  // (Idealmente el backend debería mandar 'progress' calculado)
  getProgress(sprint: any): number {
    // Si el objeto sprint ya trae propiedades de conteo (gracias al seed o DTO avanzado)
    if (sprint.totalTasks && sprint.totalTasks > 0) {
      return Math.round((sprint.completedTasks / sprint.totalTasks) * 100);
    }
    // Fallback: Si no hay datos de tareas, devolvemos 0 o un random para demo visual si prefieres
    return 0;
  }

  getStatusClass(status: string): string {
    // Mapear estados del backend a clases CSS
    switch (status?.toLowerCase()) {
      case 'activo': return 'status-active';
      case 'completado': return 'status-completed';
      default: return 'status-planned';
    }
  }
  getProjectName(id: string): string {
    const project = this.projects.find(p => p.id === id);
    return project ? project.nombre : 'Seleccionar Proyecto';
  }
}