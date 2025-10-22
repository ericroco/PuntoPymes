import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Added ActivatedRoute
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialog } from '../../components/add-task-dialog/add-task-dialog';
import { AssignEmployeeDialog } from '../../components/assign-employee-dialog/assign-employee-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditTaskDialog } from '../../components/edit-task-dialog/edit-task-dialog';

// Interface for Task data structure
interface Task {
  id: number;
  title: string;
  description?: string; // Add optional description
  assignedTo: string;
  dueDate: string;
  priority: 'alta' | 'media' | 'baja';
  status: 'pendiente' | 'en-progreso' | 'completada';
}

// Interface for Employee (simplified)
interface Employee {
  id: number;
  name: string;
  avatar: string; // URL to avatar image
}

@Component({
  selector: 'app-sprint-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule,
    MatDialogModule,
    MatTooltipModule // Needed for opening dialogs
  ],
  templateUrl: './sprint-board.html',
  styleUrls: ['./sprint-board.scss'],
  animations: [
    trigger('taskAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          stagger('50ms', [ // Delay each item's animation
            animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]), trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0, padding: '0 1rem' })),
      state('expanded', style({ height: '*', opacity: 1, padding: '1rem 1rem 0 1rem' })), // Use padding top
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SprintBoard implements OnInit {
  sprintStatus: 'Activo' | 'Planificado' | 'Completado' | null = null;
  // --- Sample Task Data ---
  pendingTasks: Task[] = [
    { id: 2, title: 'Desarrollar API de autenticación', description: 'Crear endpoints para login, registro y validación de token JWT.', assignedTo: 'Jeimy Torres', dueDate: '2025-10-22', priority: 'alta', status: 'pendiente' },
    { id: 5, title: 'Crear componentes reutilizables', description: 'Desarrollar componentes genéricos para botones, tablas y modales en Angular Material.', assignedTo: 'Jeimy Torres', dueDate: '2025-10-28', priority: 'media', status: 'pendiente' },
  ];
  inProgressTasks: Task[] = [
    { id: 1, title: 'Diseñar la nueva pantalla de login', description: 'Crear mockups en Figma y prototipo interactivo.', assignedTo: 'Valentina Samaniego', dueDate: '2025-10-20', priority: 'alta', status: 'en-progreso' },
  ];
  completedTasks: Task[] = [];
  expandedTaskId: number | null = null;
  sprintId: string | null = null;
  sprintName: string = 'Cargando...';
  sprintDescription: string = 'Cargando...';
  startDate: string | null = null; // Add Start Date
  endDate: string | null = null;   // Add End Date
  assignedEmployees: Employee[] = [];

  // Inject ActivatedRoute to read URL parameters and MatDialog to open modals
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Read the sprintId from the URL parameter
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    console.log("Displaying board for Sprint ID:", this.sprintId);

    // --- TODO: Fetch Real Data ---
    // Here you would typically call services to get:
    // 1. Sprint details (name, description, dates) based on sprintId.
    // 2. Assigned employees for this sprint based on sprintId.
    // 3. Tasks for this sprint, already grouped by status, based on sprintId.
    // --- End TODO ---
    if (this.sprintId === 'sprint-oct-25') {
      this.sprintStatus = 'Activo';
      this.sprintName = 'Sprint Octubre 2025';
      this.sprintDescription = 'Enfoque en refactorización del módulo de autenticación y diseño del nuevo dashboard.';
      // Use the sample task data defined above for this sprint
      this.startDate = '2025-10-01'; // Sample date
      this.endDate = '2025-10-31';
      this.assignedEmployees = [ // Sample assigned team
        { id: 1, name: 'Jeimy Torres', avatar: 'https://i.pravatar.cc/30?u=jeimytorres' },
        { id: 2, name: 'Valentina Samaniego', avatar: 'https://i.pravatar.cc/30?u=valentinasamaniego' }
      ];
    } else if (this.sprintId && this.sprintId.startsWith('sprint-')) { // Handle newly created sprints
      this.sprintName = `Sprint ${this.sprintId.split('-')[1]}`; // Basic name from ID
      this.sprintDescription = 'Sprint recién creado. ¡Añade tareas y asigna empleados!';
      // Start with empty task lists for new sprints
      this.pendingTasks = [];
      this.inProgressTasks = [];
      this.completedTasks = [];
      this.assignedEmployees = [];
      this.sprintStatus = 'Planificado';
    } else {
      // Default/Fallback case
      this.sprintName = `Sprint Desconocido`;
      this.sprintDescription = 'No se encontraron detalles para este sprint.';
      this.pendingTasks = [];
      this.inProgressTasks = [];
      this.completedTasks = [];
      this.assignedEmployees = [];
      this.sprintStatus = 'Planificado';
    }
  }

  // Handles dropping tasks between or within columns
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer item to a different list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // --- Update Task Status (Locally and TODO: Backend) ---
      const movedTask = event.container.data[event.currentIndex];
      let newStatus: Task['status'] = movedTask.status; // Default to current

      if (event.container.id === 'inProgressList') {
        newStatus = 'en-progreso';
      } else if (event.container.id === 'completedList') {
        newStatus = 'completada';
      } else if (event.container.id === 'pendingList') {
        newStatus = 'pendiente';
      }

      movedTask.status = newStatus; // Update status locally
      console.log(`Task ${movedTask.id} moved to status '${newStatus}' in Sprint ${this.sprintId}`);
    }
  }

  // --- Placeholder Functions for Opening Modals ---

  // Opens the dialog to create a new task within this sprint
  openAddTaskDialog(): void {
    console.log('Open modal to create task in sprint:', this.sprintId);
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '600px', // Adjust width as needed
      disableClose: true,
      data: {
        sprintId: this.sprintId,
        // Pass the list of employees assigned to *this sprint* to the modal
        availableAssignees: this.assignedEmployees
      }
    });

    dialogRef.afterClosed().subscribe(newTaskData => {
      // Check if the dialog returned data (Save was clicked)
      if (newTaskData) {
        console.log('Nueva tarea creada:', newTaskData);

        // --- Simulate adding the task locally ---
        // 1. Create a new Task object (needs a unique ID in a real app)
        const newTask: Task = {
          id: Date.now(), // Temporary unique ID for frontend
          title: newTaskData.title,
          assignedTo: newTaskData.assigneeName, // Get the name from the selected assignee object
          dueDate: newTaskData.dueDate,
          priority: newTaskData.priority,
          status: 'pendiente' // New tasks always start as pending
        };

        // 2. Add the new task to the beginning of the pendingTasks array
        this.pendingTasks = [newTask, ...this.pendingTasks];

        // --- TODO: Call Backend API ---
        // Here you would call your service to save the newTask object to the database,
        // associated with this.sprintId.
        // Example: this.taskService.createTask(this.sprintId, newTask).subscribe(savedTask => { ... });
        // --- End TODO ---

      } else {
        console.log('Add Task dialog closed without saving.');
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    console.log('Abrir modal para editar tarea:', task);
    const dialogRef = this.dialog.open(EditTaskDialog, {
      width: '600px', // Mismo ancho que el de añadir
      disableClose: true,
      data: {
        // Pasamos una copia de la tarea para evitar modificaciones accidentales
        taskData: { ...task },
        // Pasamos también los empleados asignados al sprint para el dropdown
        availableAssignees: this.assignedEmployees
      }
    });

    dialogRef.afterClosed().subscribe(updatedTaskData => {
      // Si el modal devolvió datos (se guardaron cambios)
      if (updatedTaskData) {
        console.log('Tarea actualizada:', updatedTaskData);

        // --- Simular Actualización Local ---
        // 1. Encuentra la tarea original en la lista correcta (pendiente, en progreso, completada)
        const updateTaskInList = (list: Task[], updatedData: any) => {
          const index = list.findIndex(t => t.id === task.id);
          if (index > -1) {
            // Actualiza el objeto en la lista con los nuevos datos
            list[index] = { ...list[index], ...updatedData };
            // Forzamos la re-renderización clonando el array (importante para la detección de cambios)
            return [...list];
          }
          return list; // Devuelve la lista sin cambios si no se encontró
        };

        this.pendingTasks = updateTaskInList(this.pendingTasks, updatedTaskData);
        this.inProgressTasks = updateTaskInList(this.inProgressTasks, updatedTaskData);
        this.completedTasks = updateTaskInList(this.completedTasks, updatedTaskData);

        // --- TODO: Llamar API para guardar los cambios en el backend ---
        // Ejemplo: this.taskService.updateTask(task.id, updatedTaskData).subscribe(...);
        // --- End TODO ---

      } else {
        console.log('Edit Task dialog cerrado sin guardar.');
      }
    });
  }

  // Opens the dialog to assign/manage employees assigned to this sprint
  openAssignEmployeeDialog(): void {
    console.log('Open modal to assign employees to sprint:', this.sprintId);
    const dialogRef = this.dialog.open(AssignEmployeeDialog, {
      width: '700px',
      data: {
        sprintId: this.sprintId,
        currentlyAssignedIds: this.assignedEmployees.map(emp => emp.id)
      }
    });

    dialogRef.afterClosed().subscribe(selectedEmployees => {
      if (selectedEmployees) {
        console.log('Asignaciones actualizadas:', selectedEmployees);
        this.assignedEmployees = selectedEmployees; // Update the local list
        // --- TODO: Call API to save new assignments ---
      }
    });
  }
  toggleTaskDetails(taskId: number): void {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }
  startSprint(): void {
    if (this.sprintStatus !== 'Planificado') return; // Basic validation
    console.log(`Starting Sprint: ${this.sprintId}`);
    // --- TODO: Call API to update sprint status to 'Activo' ---
    // Example: this.sprintService.updateSprintStatus(this.sprintId, 'Activo').subscribe(() => { ... });
    // --- Simulate local update ---
    this.sprintStatus = 'Activo';
    // You might want to update the status in the main sprint list too if possible,
    // or just rely on refetching data when navigating back.
  }

  completeSprint(): void {
    if (this.sprintStatus !== 'Activo') return; // Basic validation
    console.log(`Completing Sprint: ${this.sprintId}`);
    // Optional: Add confirmation dialog here
    // Optional: Logic to handle unfinished tasks (move to backlog?)
    // --- TODO: Call API to update sprint status to 'Completado' ---
    // Example: this.sprintService.updateSprintStatus(this.sprintId, 'Completado').subscribe(() => { ... });
    // --- Simulate local update ---
    this.sprintStatus = 'Completado';
  }
}