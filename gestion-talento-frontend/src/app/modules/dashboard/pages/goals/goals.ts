import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
// --- CORRECCIÓN 1: Importar el MÓDULO, no el componente ---
import { MatDividerModule } from '@angular/material/divider'; 
import { MatMenuModule } from '@angular/material/menu';
// --- NUEVO: Importar NGX Charts ---
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
// Animaciones
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
// Cabecera y Modal
// --- CORRECCIÓN 2: Importar el COMPONENTE standalone (asumiendo que se llama SubpageHeaderComponent) ---
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header'; 
import { UpdateProgressDialog } from '../../components/update-progress-dialog/update-progress-dialog';
// import { CreateGoalDialog } from '../../components/create-goal-dialog/create-goal-dialog'; // (Futuro)

// Interface para Meta
interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'pendiente' | 'en-progreso' | 'completada';
  dueDate: string;
}
// Interface para Empleado (necesaria para la 9-Box)
interface Employee { id: number, name: string };
// Interface para 9-Box (necesaria para el tooltip)
interface NineBoxCell {
  label: string;
  count: number;
  employees: Employee[];
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatCardModule, MatProgressBarModule,
    MatTabsModule, MatTableModule, MatMenuModule,
    NgxChartsModule,
    MatDividerModule, // <-- CORRECCIÓN 3: Usar el Módulo
    SubpageHeader // <-- CORRECCIÓN 4: Usar el Componente Standalone
  ],
  templateUrl: './goals.html',
  styleUrls: ['./goals.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          stagger('100ms', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Goals implements OnInit { // Nombre de clase corregido

  // --- Simulación de Rol ---
  viewingAsAdmin: boolean = false; // Cambia a 'true' para ver la vista de Admin

  // --- Datos de Empleado ---
  myGoals: Goal[] = [
    { id: 1, title: 'Refactorizar Módulo Auth', description: '...', progress: 90, status: 'en-progreso', dueDate: '2025-11-15' },
    { id: 2, title: 'Certificación Angular', description: '...', progress: 60, status: 'en-progreso', dueDate: '2025-12-31' },
  ];

  // --- Datos de Admin ---
  teamGoalProgress = {
    total: 120,
    onTrack: 85,
    atRisk: 15,
    completed: 20
  };
  
  // Datos para el gráfico de barras de Desempeño
  performanceDistributionData = [
    { "name": "Bajo Desempeño", "value": 3 },
    { "name": "Cumple Expectativas", "value": 28 },
    { "name": "Supera Expectativas", "value": 15 },
    { "name": "Alto Potencial", "value": 7 }
  ];

  // Esquema de color para gráficos
  chartColorScheme: Color = {
    name: 'puntopymesGoals',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
        'var(--color-danger-light)', 'var(--color-info)', 
        'var(--color-success)', 'var(--color-accent)'
      ]
  };
  
  // Datos para la Tabla de "Gestión de Metas"
  allGoalsTable = {
    displayedColumns: ['title', 'assignee', 'progress', 'dueDate', 'status', 'actions'],
    dataSource: [
      { id: 1, title: 'Refactorizar Módulo Auth', assigneeName: 'Jeimy Torres', progress: 90, status: 'en-progreso', dueDate: '2025-11-15' },
      { id: 4, title: 'Optimizar LCP Página de Inicio', assigneeName: 'Valentina Samaniego', progress: 0, status: 'pendiente', dueDate: '2025-11-10' },
      // ... (más metas)
    ]
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.viewingAsAdmin) {
      // Cargar datos admin
    } else {
      // Cargar this.myGoals
    }
  }

  // --- Funciones de Empleado ---
  // --- CORRECCIÓN 5: Implementación completa de la función ---
  openUpdateProgressDialog(goal: Goal): void {
    // No permitir actualizar metas completadas
    if (goal.status === 'completada') return; 

    const dialogRef = this.dialog.open(UpdateProgressDialog, {
      width: '450px',
      disableClose: true,
      data: { 
        currentProgress: goal.progress,
        goalTitle: goal.title 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // result = { progress: 85, comment: '...' }
      if (result) {
        console.log(`Actualizando meta ${goal.id}:`, result);
        // --- TODO: Llamar API para guardar el progreso y el comentario ---
        
        // --- Simulación local ---
        const index = this.myGoals.findIndex(g => g.id === goal.id);
        if (index > -1) {
          this.myGoals[index].progress = result.progress;
          if (result.progress === 100) {
            this.myGoals[index].status = 'completada';
          } else if (result.progress > 0) {
            this.myGoals[index].status = 'en-progreso';
          } else {
            this.myGoals[index].status = 'pendiente';
          }
          this.myGoals = [...this.myGoals]; // Forzar detección de cambios
        }
      }
    });
  }

  // --- Funciones de Admin ---
  openCreateGoalDialog(): void {
    console.log('Abrir modal para crear nueva meta...');
  }
  
  editGoal(goal: any): void {
    console.log('Abrir modal para editar meta:', goal);
  }

  deleteGoal(goal: any): void {
    console.log('Eliminar meta:', goal);
  }
  
  // Función para el Tooltip (ya no usa 9-Box)
  // (Si la necesitas para otra cosa, defínela aquí)
  // getEmployeeTooltip(cell: any): string { ... }
}