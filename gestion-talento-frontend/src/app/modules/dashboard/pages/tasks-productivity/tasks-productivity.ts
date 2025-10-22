import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSprintDialog } from '../../components/add-sprint-dialog/add-sprint-dialog';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { EditSprintDialog } from '../../components/edit-sprint-dialog/edit-sprint-dialog';

interface Sprint {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Activo' | 'Planificado' | 'Completado';
  tasks: number;
  completedTasks: number;
}

@Component({
  selector: 'app-tasks-productivity', // Mantenemos el selector que corresponde a la página de lista de Sprints
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Necesario para [routerLink] en el HTML
    MatDialogModule // Necesario para usar MatDialog
  ],
  templateUrl: './tasks-productivity.html', // El HTML que muestra la lista de Sprints
  styleUrls: ['./tasks-productivity.scss'],
  animations: [
    // Animación para la aparición de las tarjetas de sprint en la lista
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms',
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class TasksProductivity {
  // Lista de sprints (datos de ejemplo actualizados con fechas)
  sprints: Sprint[] = [
    { id: 'sprint-oct-25', name: 'Sprint Octubre 2025', description: 'Enfoque en refactorización del módulo de autenticación y diseño del nuevo dashboard.', startDate: '2025-10-01', endDate: '2025-10-31', status: 'Activo', tasks: 15, completedTasks: 8 },
    { id: 'sprint-nov-25', name: 'Sprint Noviembre 2025', description: 'Desarrollo de funcionalidades del módulo de nómina y pruebas iniciales.', startDate: '2025-11-01', endDate: '2025-11-30', status: 'Planificado', tasks: 0, completedTasks: 0 },
    { id: 'sprint-sep-25', name: 'Sprint Septiembre 2025', description: 'Lanzamiento inicial de la plataforma (MVP).', startDate: '2025-09-01', endDate: '2025-09-30', status: 'Completado', tasks: 22, completedTasks: 22 }
  ];

  // Inyecta MatDialog (para abrir modales) y Router (para navegar)
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  // Función para abrir el modal de "Crear Nuevo Sprint"
  openAddSprintDialog(): void {
    const dialogRef = this.dialog.open(AddSprintDialog, {
      width: '500px', // Ancho del modal
      disableClose: true // Evita que se cierre al hacer clic fuera
    });

    // Escucha el resultado cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      // Si el modal devolvió datos (el usuario hizo clic en "Crear y Abrir Sprint")
      if (result && result.name && result.startDate && result.endDate) {
        console.log('Nuevo Sprint a crear:', result); // Muestra datos: { name, description, startDate, endDate }

        // --- Lógica de Creación (Simulada por ahora) ---
        // 1. En una aplicación real: Llamarías a tu servicio/API aquí para guardar el sprint.
        //    Ej: this.sprintService.createSprint(result).subscribe(response => { ... });
        // 2. La API debería devolver el ID real del sprint recién creado (ej., response.id).

        // --- Simulación para el frontend ---
        // Generamos un ID temporal único para poder navegar
        const newSprintId = `sprint-${Date.now()}`;
        console.log('Sprint simulado creado con ID:', newSprintId);

        // Creamos el objeto del nuevo sprint con todos los datos (incluyendo fechas)
        const newSprintData: Sprint = {
          id: newSprintId,
          name: result.name,
          description: result.description || '', // Asegura que la descripción sea string
          startDate: result.startDate,          // Fecha ya formateada desde el modal
          endDate: result.endDate,              // Fecha ya formateada desde el modal
          status: 'Planificado',                // Estado inicial por defecto
          tasks: 0,                             // Inicialmente sin tareas
          completedTasks: 0
        };

        // Opcional: Añadir el nuevo sprint a la lista visible inmediatamente
        // Descomenta la siguiente línea para verlo sin recargar (mejor si la API lo devuelve)
        this.sprints = [...this.sprints, newSprintData];

        // --- NAVEGACIÓN ---
        // Navega a la página de detalle (Kanban) del nuevo sprint usando el ID generado
        this.router.navigate(['/dashboard/sprints', newSprintId]);
        // Esto activará la ruta 'sprints/:sprintId' que carga SprintBoardComponent

      } else if (result) {
        // Si el resultado existe pero le faltan datos requeridos (ej. fechas)
        console.warn('Datos incompletos desde el modal:', result);
        // Podrías mostrar un mensaje de error al usuario aquí
      }
      else {
        // Si el modal se cerró con "Cancelar" (result será null o undefined)
        console.log('Modal cerrado sin guardar');
      }
    });
  }

  // Función para calcular el progreso (usada en el HTML)
  getProgress(sprint: Sprint): number {
    if (!sprint.tasks || sprint.tasks === 0) {
      return 0; // Evita división por cero
    }
    return Math.round((sprint.completedTasks / sprint.tasks) * 100);
  }
  openEditSprintDialog(sprint: Sprint): void {
    console.log("Editing sprint:", sprint);
    const dialogRef = this.dialog.open(EditSprintDialog, {
      width: '500px', // Same width as add dialog
      disableClose: true,
      data: { ...sprint } // Pass a copy of the current sprint data
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData) {
        console.log('Sprint updated:', updatedData);
        // --- Simulate Update Locally ---
        const index = this.sprints.findIndex(s => s.id === sprint.id);
        if (index > -1) {
          // Merge existing data with updated data
          this.sprints[index] = { ...this.sprints[index], ...updatedData };
          // Trigger change detection
          this.sprints = [...this.sprints];
        }
        // --- TODO: Call API to save changes ---
        // Example: this.sprintService.updateSprint(sprint.id, updatedData).subscribe();
      } else {
        console.log('Edit Sprint dialog closed without saving.');
      }
    });
  }
}