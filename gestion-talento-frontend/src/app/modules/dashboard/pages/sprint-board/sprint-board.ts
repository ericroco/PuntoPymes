import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AddTaskDialog } from '../../components/add-task-dialog/add-task-dialog';
import { AssignEmployeeDialog } from '../../components/assign-employee-dialog/assign-employee-dialog';
import { EditTaskDialog } from '../../components/edit-task-dialog/edit-task-dialog';
import { UpdateProgressDialog } from '../../components/update-progress-dialog/update-progress-dialog';
import { UploadEvidenceDialog } from '../../components/upload-evidence-dialog/upload-evidence-dialog';

// --- Definición de Interfaces ---

// Interface para Tarea
interface Task {
  id: number;
  title: string;
  description?: string; // Descripción opcional
  assignedTo: string;
  dueDate: string | null; // Puede ser nulo
  priority: 'alta' | 'media' | 'baja';
  status: 'pendiente' | 'en-progreso' | 'completada';
  metaId?: number | null; // ID de la meta vinculada
  metaTitle?: string | null; // Nombre de la meta (para mostrar)
  assigneeId?: number; // Opcional: ID del asignado
}

// Interface para Empleado
interface Employee {
  id: number;
  name: string;
  avatar: string; // URL to avatar image
}

// Interface para Meta (necesaria para triggerGoalUpdate)
interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'pendiente' | 'en-progreso' | 'completada';
  dueDate: string;
}

@Component({
  selector: 'app-sprint-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,    // <-- Añadido
    MatButtonModule   // <-- Añadido
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
export class SprintBoard implements OnInit { // Nombre de clase corregido a SprintBoardComponent

  // --- Datos de Ejemplo ---
  // (Estos datos se cargarán en ngOnInit basado en el sprintId)
  myGoals: Goal[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  assignedEmployees: Employee[] = [];

  // --- Propiedades del Sprint ---
  sprintId: string | null = null;
  sprintName: string = 'Cargando...';
  sprintDescription: string = 'Cargando...';
  startDate: string | null = null;
  endDate: string | null = null;
  sprintStatus: 'Activo' | 'Planificado' | 'Completado' | null = null;

  // --- Estado de UI ---
  expandedTaskId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    console.log("Mostrando tablero para Sprint ID:", this.sprintId);

    // --- TODO: Reemplazar esto con llamadas a la API ---
    // Simulación de carga de datos basada en el ID
    if (this.sprintId === 'sprint-oct-25') {
      this.sprintName = 'Sprint Octubre 2025';
      this.sprintDescription = 'Enfoque en refactorización del módulo de autenticación y diseño del nuevo dashboard.';
      this.startDate = '2025-10-01';
      this.endDate = '2025-10-31';
      this.sprintStatus = 'Activo';
      this.assignedEmployees = [
        { id: 1, name: 'Jeimy Torres', avatar: 'https://i.pravatar.cc/30?u=jeimytorres' },
        { id: 2, name: 'Valentina Samaniego', avatar: 'https://i.pravatar.cc/30?u=valentinasamaniego' }
      ];
      this.pendingTasks = [
        { id: 2, title: 'Desarrollar API de autenticación', description: 'Crear endpoints...', assignedTo: 'Jeimy Torres', dueDate: '2025-10-22', priority: 'alta', status: 'pendiente', metaId: 101, metaTitle: 'Refactor Módulo Auth' },
        { id: 5, title: 'Crear componentes reutilizables', description: 'Desarrollar componentes...', assignedTo: 'Jeimy Torres', dueDate: '2025-10-28', priority: 'media', status: 'pendiente', metaId: 102, metaTitle: 'Optimizar UI' },
      ];
      this.inProgressTasks = [
        { id: 1, title: 'Diseñar la nueva pantalla de login', description: 'Crear mockups...', assignedTo: 'Valentina Samaniego', dueDate: '2025-10-20', priority: 'alta', status: 'en-progreso', metaId: 101 },
      ];
      this.completedTasks = [];
      this.myGoals = [ // Metas simuladas para este sprint/empleado
        { id: 101, title: 'Refactor Módulo Auth', description: '...', progress: 50, status: 'en-progreso', dueDate: '2025-10-31' },
        { id: 102, title: 'Optimizar UI', description: '...', progress: 10, status: 'en-progreso', dueDate: '2025-10-31' }
      ];

    } else if (this.sprintId && this.sprintId.startsWith('sprint-')) {
      this.sprintName = `Sprint (ID: ${this.sprintId.substring(7, 13)})`;
      this.sprintDescription = 'Sprint recién creado. ¡Añade tareas y asigna empleados!';
      this.sprintStatus = 'Planificado';
      // Mantenemos las listas vacías
    } else {
      this.sprintName = `Sprint Desconocido`;
      this.sprintDescription = 'No se encontraron detalles para este sprint.';
      this.sprintStatus = null;
    }
  }

  // --- Lógica de Drag and Drop ---
  drop(event: CdkDragDrop<Task[]>) {
    // Si se mueve en la misma lista (solo reordenar)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Si se mueve a una lista DIFERENTE
      const task = event.previousContainer.data[event.previousIndex];
      const newContainerId = event.container.id;

      // --- ¡LÓGICA CLAVE! ---
      // Si el destino es "Completada"
      if (newContainerId === 'completedList') {
        // NO movemos la tarea todavía. Primero llamamos al "peaje de evidencia".
        // Le pasamos la tarea y el evento de drop original.
        this.handleTaskCompletion(task, event);
      } else {
        // --- Movimiento normal (a "Pendiente" o "En Progreso") ---

        // 1. Mueve la tarea
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        // 2. Actualiza el estado
        const newStatus: Task['status'] = (newContainerId === 'inProgressList') ? 'en-progreso' : 'pendiente';
        task.status = newStatus;

        console.log(`Task ${task.id} moved to status '${newStatus}' in Sprint ${this.sprintId}`);
        // --- TODO: Llamar API para guardar el nuevo estado (en-progreso o pendiente) ---
      }
    }
  }

  // --- Lógica de Modales ---
  handleTaskCompletion(task: Task, event: CdkDragDrop<Task[]>) {

    const dialogRef = this.dialog.open(UploadEvidenceDialog, {
      width: '500px',
      disableClose: true,
      data: { taskTitle: task.title }
    });

    dialogRef.afterClosed().subscribe(evidenceResult => {
      // Si el usuario subió la evidencia (evidenceResult no es null)
      if (evidenceResult) {
        console.log('Evidencia subida:', evidenceResult.fileName);

        // --- 1. Mover la Tarea (AHORA SÍ) ---
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        task.status = 'completada';
        console.log(`Task ${task.id} moved to status 'completada'`);

        // --- TODO: Llamar API para: ---
        // 1. Subir el archivo (evidenceResult.file)
        // 2. Guardar el nuevo estado 'completada' de la tarea, vinculando la evidencia.

        // --- 2. Disparar Modal de Progreso de Meta (si está vinculada) ---
        if (task.metaId) {
          setTimeout(() => {
            this.triggerGoalUpdate(task);
          }, 300);
        }

      } else {
        // Si el usuario canceló el modal de evidencia (evidenceResult es null)
        console.log('Completitud de tarea cancelada. La tarea no se mueve.');
        // La tarea visualmente vuelve a su lugar original
        // (porque nunca llamamos a transferArrayItem)
      }
    });
  }
  // Dispara el modal de actualización de meta
  triggerGoalUpdate(completedTask: Task): void {
    const linkedGoal = this.myGoals.find(g => g.id === completedTask.metaId);
    if (!linkedGoal) {
      console.warn(`Tarea completada, pero Meta con ID ${completedTask.metaId} no encontrada.`);
      return;
    }
    const dialogRef = this.dialog.open(UpdateProgressDialog, {
      width: '450px',
      disableClose: true,
      data: {
        currentProgress: linkedGoal.progress,
        goalTitle: linkedGoal.title,
        completedTaskTitle: completedTask.title
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Actualizando Meta ${linkedGoal.id} a ${result.progress}%`);
        // --- TODO: Llamar API para guardar el progreso de la META ---
        // Simulación local
        linkedGoal.progress = result.progress;
        linkedGoal.status = result.progress === 100 ? 'completada' : 'en-progreso';
        this.myGoals = [...this.myGoals];
      }
    });
  }

  // Abre el modal para crear una nueva tarea
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '600px',
      disableClose: true,
      data: {
        sprintId: this.sprintId,
        availableAssignees: this.assignedEmployees,
        availableGoals: this.myGoals
      }
    });
    dialogRef.afterClosed().subscribe(newTaskData => {
      if (newTaskData) {
        console.log('Nueva tarea creada:', newTaskData);
        // Simulación local
        const newTask: Task = {
          id: Date.now(), // ID Temporal
          status: 'pendiente',
          title: newTaskData.title,
          description: newTaskData.description,
          assignedTo: newTaskData.assigneeName,
          dueDate: newTaskData.dueDate,
          priority: newTaskData.priority,
          metaId: newTaskData.metaId,
          metaTitle: newTaskData.metaTitle
        };
        this.pendingTasks = [newTask, ...this.pendingTasks]; // Añade al inicio
        // --- TODO: Llamar API para guardar la nueva tarea ---
      }
    });
  }

  // Abre el modal para editar una tarea existente
  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialog, {
      width: '600px',
      disableClose: true,
      data: {
        taskData: { ...task }, // Pasa una copia
        availableAssignees: this.assignedEmployees
      }
    });
    dialogRef.afterClosed().subscribe(updatedTaskData => {
      if (updatedTaskData) {
        console.log('Tarea actualizada:', updatedTaskData);
        // Simulación local
        const updateList = (list: Task[]): Task[] => {
          const index = list.findIndex(t => t.id === task.id);
          if (index > -1) {
            list[index] = { ...list[index], ...updatedTaskData }; // Sobrescribe datos
            return [...list]; // Retorna nuevo array
          }
          return list;
        };
        this.pendingTasks = updateList(this.pendingTasks);
        this.inProgressTasks = updateList(this.inProgressTasks);
        this.completedTasks = updateList(this.completedTasks);
        // --- TODO: Llamar API para guardar cambios ---
      }
    });
  }

  // Abre el modal para asignar empleados a este sprint
  openAssignEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AssignEmployeeDialog, {
      width: '600px', // Ancho ajustado
      disableClose: true,
      data: {
        sprintId: this.sprintId,
        currentlyAssignedIds: this.assignedEmployees.map(emp => emp.id)
      }
    });
    dialogRef.afterClosed().subscribe(selectedEmployees => {
      if (selectedEmployees) {
        console.log('Asignaciones actualizadas:', selectedEmployees);
        this.assignedEmployees = selectedEmployees; // Actualiza lista local
        // --- TODO: Llamar API para guardar asignaciones ---
      }
    });
  }

  // --- Lógica de UI ---

  // Expande/Colapsa la descripción de la tarea
  toggleTaskDetails(taskId: number): void {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  // --- Lógica de Ciclo de Vida del Sprint ---

  // Inicia el sprint (si está 'Planificado')
  startSprint(): void {
    if (this.sprintStatus !== 'Planificado') return;
    console.log(`Iniciando Sprint: ${this.sprintId}`);
    // --- TODO: Llamar API para actualizar estado a 'Activo' ---
    this.sprintStatus = 'Activo'; // Simulación local
  }

  // Completa el sprint (si está 'Activo')
  completeSprint(): void {
    if (this.sprintStatus !== 'Activo') return;
    console.log(`Completando Sprint: ${this.sprintId}`);
    // --- TODO: Añadir confirmación ---
    // --- TODO: Añadir lógica para tareas pendientes (mover a backlog?) ---
    // --- TODO: Llamar API para actualizar estado a 'Completado' ---
    this.sprintStatus = 'Completado'; // Simulación local
  }
}