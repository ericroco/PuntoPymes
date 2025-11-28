import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes
import { AddTaskDialog } from '../../components/add-task-dialog/add-task-dialog';
import { AssignEmployeeDialog } from '../../components/assign-employee-dialog/assign-employee-dialog';
import { EditTaskDialog } from '../../components/edit-task-dialog/edit-task-dialog';
import { UpdateProgressDialog } from '../../components/update-progress-dialog/update-progress-dialog';
import { UploadEvidenceDialog } from '../../components/upload-evidence-dialog/upload-evidence-dialog';

// Servicios Reales
import { AuthService } from '../../../auth/services/auth';
import { ProductivityService, Task, Sprint } from '../../services/productivity';
import { EmployeesService, Employee } from '../../services/employees';
import { PerformanceService } from '../../services/performance';

// Interfaces Locales
interface Goal { id: string; title: string; description: string; progress: number; status: string; dueDate: string; }

@Component({
  selector: 'app-sprint-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './sprint-board.html',
  styleUrls: ['./sprint-board.scss'],
  animations: [
    trigger('taskAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          stagger('50ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0, padding: '0 1rem' })),
      state('expanded', style({ height: '*', opacity: 1, padding: '1rem 1rem 0 1rem' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SprintBoard implements OnInit {
  private route = inject(ActivatedRoute);
  public dialog = inject(MatDialog);
  private productivityService = inject(ProductivityService);
  private employeesService = inject(EmployeesService);
  private performanceService = inject(PerformanceService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  // Datos Reales
  myGoals: Goal[] = []; // Objetivos del usuario (para vincular)

  // Listas del Kanban (Tipadas con la interfaz real Task)
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  assignedEmployees: Employee[] = []; // Empleados del equipo (si aplica) o todos

  // Propiedades del Sprint
  sprintId: string | null = null;
  sprintName: string = 'Cargando...';
  sprintDescription: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  sprintStatus: string | null = null; // 'Activo', 'Planificado'

  expandedTaskId: string | null = null; // ID es string ahora

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    if (this.sprintId) {
      this.loadSprintData(this.sprintId);
    }
  }

  loadSprintData(id: string) {
    // 1. Obtener info del Sprint (no tenemos endpoint getSprintById, así que buscamos en la lista o asumimos datos)
    // Para simplificar, cargamos tareas directo. Si quisieras info del sprint, deberías implementar getSprintById en backend.
    // Simulamos nombre por ahora o lo sacamos de un servicio compartido si existiera.
    this.sprintName = 'Sprint Actual';

    // 2. Cargar Tareas
    this.productivityService.getTasksBySprint(id).subscribe({
      next: (tasks) => {
        console.log('Tareas cargadas:', tasks);
        // Clasificar por estado
        this.pendingTasks = tasks.filter(t => t.estado === 'PENDIENTE');
        this.inProgressTasks = tasks.filter(t => t.estado === 'EN_PROGRESO');
        this.completedTasks = tasks.filter(t => t.estado === 'COMPLETADA');
      },
      error: (err) => console.error('Error cargando tareas', err)
    });

    // 3. Cargar Empleados (para asignar)
    this.employeesService.getEmployees().subscribe(emps => this.assignedEmployees = emps);

    // 4. Cargar Mis Objetivos (para vincular)
    const user = this.authService.getUser();
    if (user?.empleadoId) {
      this.performanceService.getActiveCycle().subscribe(cycle => {
        if (cycle) {
          this.performanceService.getEmployeeGoals(cycle.id, user.empleadoId).subscribe(goals => {
            this.myGoals = goals.map(g => ({
              id: g.id,
              title: g.descripcion,
              description: g.descripcion,
              progress: g.progreso,
              status: g.progreso === 100 ? 'Completada' : 'En Progreso',
              dueDate: ''
            }));
          });
        }
      });
    }
  }

  // --- Drag & Drop (Motor del Kanban) ---
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newContainerId = event.container.id;

      // SI SE MUEVE A "COMPLETADA" -> Flujo especial con Evidencia
      if (newContainerId === 'completedList') {
        this.handleTaskCompletion(task, event);
      } else {
        // MOVIMIENTO NORMAL
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        // Calcular nuevo estado
        const newState: 'PENDIENTE' | 'EN_PROGRESO' =
          (newContainerId === 'inProgressList') ? 'EN_PROGRESO' : 'PENDIENTE';

        // Actualizar localmente para feedback inmediato
        task.estado = newState;

        // Guardar en Backend
        this.productivityService.updateTask(task.id, { estado: newState }).subscribe();
      }
    }
  }

  // --- Flujo de Completar Tarea ---
  handleTaskCompletion(task: Task, event: CdkDragDrop<Task[]>) {
    const dialogRef = this.dialog.open(UploadEvidenceDialog, {
      width: '500px',
      disableClose: true,
      data: { taskTitle: task.titulo } // Usamos 'titulo' (español)
    });

    dialogRef.afterClosed().subscribe(evidenceResult => {
      if (evidenceResult) {
        // 1. Mover visualmente
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        task.estado = 'COMPLETADA';

        // 2. Guardar en Backend
        this.productivityService.updateTask(task.id, { estado: 'COMPLETADA' }).subscribe(() => {
          this.snackBar.open('Tarea completada', 'Cerrar', { duration: 3000 });

          // 3. SUGERIR ACTUALIZAR META (Si la tarea tiene objetivo vinculado)
          if (task.objetivoId) { // Asegúrate que el backend devuelva este campo
            setTimeout(() => this.triggerGoalUpdate(task), 500);
          }
        });

      } else {
        console.log('Cancelado. La tarea no se mueve.');
      }
    });
  }

  // --- Actualizar Meta Vinculada ---
  triggerGoalUpdate(completedTask: Task): void {
    // Buscar el objetivo en la lista local
    const linkedGoal = this.myGoals.find(g => g.id === completedTask.objetivoId); // Ojo con los nombres de propiedad

    if (!linkedGoal) return;

    const dialogRef = this.dialog.open(UpdateProgressDialog, {
      width: '450px',
      data: {
        currentProgress: linkedGoal.progress,
        goalTitle: linkedGoal.title,
        completedTaskTitle: completedTask.titulo
      }
    });

    dialogRef.afterClosed().subscribe(newProgress => {
      if (typeof newProgress === 'number') {
        this.performanceService.updateGoalProgress(linkedGoal.id, newProgress).subscribe(() => {
          this.snackBar.open('Meta actualizada', 'Cerrar', { duration: 3000 });
          linkedGoal.progress = newProgress; // Update local
        });
      }
    });
  }

  // --- Crear Tarea ---
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '600px',
      disableClose: true,
      data: {
        sprintId: this.sprintId,
        // availableAssignees: this.assignedEmployees, // Si el diálogo soporta asignación
        // availableGoals: this.myGoals
      }
    });

    dialogRef.afterClosed().subscribe(newTaskData => {
      if (newTaskData) {
        // Mapeo de datos del diálogo al DTO del backend
        const dto = {
          ...newTaskData,
          sprintId: this.sprintId
          // Asegúrate de que los nombres coincidan (titulo, descripcion, etc.)
        };

        this.productivityService.createTask(this.sprintId!, dto).subscribe(task => {
          this.pendingTasks.unshift(task); // Añadir al principio
          this.snackBar.open('Tarea creada', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }

  // --- UI Helpers ---
  toggleTaskDetails(taskId: string): void {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  // --- Ciclo de Vida Sprint (Placeholders) ---
  startSprint() {
    this.sprintStatus = 'Activo';
    this.productivityService.updateSprint(this.sprintId!, { estado: 'Activo' }).subscribe();
  }

  completeSprint() {
    this.sprintStatus = 'Completado';
    // TODO: Lógica de cierre de sprint
  }

  // Otros métodos placeholder
  openEditTaskDialog(task: Task) { }
  openAssignEmployeeDialog() { }
}