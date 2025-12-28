import { Component, OnInit, inject } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { UpdateProgressDialog } from '../../components/update-progress-dialog/update-progress-dialog';
import { AddGoalDialog } from '../../components/add-goal-dialog/add-goal-dialog';
import { AuthService } from '../../../auth/services/auth';
import { PerformanceService, Objetivo } from '../../services/performance';
import { EmployeesService, Employee } from '../../services/employees';
import { CatalogService, Department } from '../../services/catalog';
import { PERMISSIONS } from '../../../../shared/constants/permissions';
import { CreateCycleDialogComponent } from '../../components/create-cycle-dialog/create-cycle-dialog';

// Interfaces Locales
interface AdminGoal {
  id: string;
  title: string;
  assigneeName: string;
  progress: number;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatCardModule, MatProgressBarModule,
    MatTabsModule, MatTableModule, MatMenuModule,
    NgxChartsModule, MatDividerModule, SubpageHeader, MatSnackBarModule
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
export class Goals implements OnInit {
  private authService = inject(AuthService);
  private performanceService = inject(PerformanceService);
  private employeesService = inject(EmployeesService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private catalogService = inject(CatalogService);
  P = PERMISSIONS;

  viewingAsAdmin: boolean = false;
  activeCycleId: string | null = null;
  isLoading = true;
  employeesList: Employee[] = [];
  departmentsList: Department[] = [];

  // --- Datos ---
  myGoals: Objetivo[] = [];
  adminDeptGoals: Objetivo[] = []; // Metas de departamento (Vista Admin)
  deptGoals: Objetivo[] = [];      // Metas de mi departamento (Vista Empleado)

  // --- Datos Admin ---
  allGoalsTable = { dataSource: [] as AdminGoal[] };
  teamGoalProgress = { total: 0, onTrack: 0, atRisk: 0, completed: 0 };
  performanceDistributionData = [
    { "name": "Bajo Desempeño", "value": 0 },
    { "name": "Cumple Expectativas", "value": 0 },
    { "name": "Alto Potencial", "value": 0 }
  ];

  chartColorScheme: Color = {
    name: 'puntopymesGoals',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#e57373', '#64b5f6', '#81c784', '#ffb74d']
  };

  ngOnInit(): void {
    this.viewingAsAdmin = this.can(this.P.PERFORMANCE_MANAGE);
    this.loadData();
    if (this.viewingAsAdmin) {
      this.loadEmployeesForAdmin();
      this.catalogService.getDepartments().subscribe(data => this.departmentsList = data);
    }
  }

  loadData() {
    this.isLoading = true;
    const user = this.authService.getUser();
    this.loadActiveCycle();

    this.performanceService.getActiveCycle().subscribe({
      next: (cycle) => {
        if (cycle) {
          this.activeCycleId = cycle.id;

          // 1. Vista de Empleado (Cargar sus cosas)
          if (!this.viewingAsAdmin && user?.empleadoId) {
            this.loadEmployeeView(cycle.id, user.empleadoId);
          }

          // 2. Vista de Admin (Cargar todo)
          if (this.viewingAsAdmin) {
            this.loadAdminView(cycle.id);
          }

        } else {
          this.isLoading = false;
        }
      },
      error: () => this.isLoading = false
    });
  }

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
  // --- MÉTODO NUEVO: Cargar Vista Empleado ---
  loadEmployeeView(cycleId: string, employeeId: string) {
    // Mis Metas
    this.performanceService.getEmployeeGoals(cycleId, employeeId).subscribe(data => {
      this.myGoals = data;
      this.isLoading = false;
    });

    // Metas de mi Departamento
    this.employeesService.getEmployeeById(employeeId).subscribe(emp => {
      const depto = emp.cargo?.departamento as any;
      if (depto && depto.id) {
        this.performanceService.getDepartmentGoals(cycleId, depto.id).subscribe(data => {
          this.deptGoals = data;
        });
      }
    });
  }

  // --- MÉTODO NUEVO: Cargar Vista Admin ---
  loadAdminView(cycleId: string) {
    this.performanceService.getAllGoals(cycleId).subscribe({
      next: (allGoals) => {
        console.log('Admin Data:', allGoals);

        // Calcular KPIs
        this.teamGoalProgress.total = allGoals.length;
        this.teamGoalProgress.completed = allGoals.filter(g => g.progreso === 100).length;
        this.teamGoalProgress.onTrack = allGoals.filter(g => g.progreso > 0 && g.progreso < 100).length;
        this.teamGoalProgress.atRisk = allGoals.filter(g => g.progreso === 0).length;

        // Filtrar Metas de Departamento
        this.adminDeptGoals = allGoals.filter(g => g.tipo === 'DEPARTAMENTO');

        // Llenar Tabla Global
        this.allGoalsTable.dataSource = allGoals.map(g => ({
          id: g.id,
          title: g.descripcion,
          assigneeName: g.empleado
            ? `${g.empleado.nombre} ${g.empleado.apellido}`
            : (g.departamento ? `Depto. ${g.departamento.nombre}` : 'Sin asignar'),
          progress: g.progreso,
          status: g.progreso === 100 ? 'Completada' : 'En Progreso',
          dueDate: ''
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadEmployeesForAdmin() {
    this.employeesService.getEmployees().subscribe(emps => this.employeesList = emps);
  }

  // --- Funciones de Interacción ---

  openUpdateProgressDialog(goal: Objetivo): void {
    if (goal.progreso === 100) return;

    const dialogRef = this.dialog.open(UpdateProgressDialog, {
      width: '600px',
      disableClose: true,
      data: {
        currentProgress: goal.progreso,
        goalTitle: goal.descripcion
      }
    });

    dialogRef.afterClosed().subscribe(newProgress => {
      if (typeof newProgress === 'number') {
        this.performanceService.updateGoalProgress(goal.id, newProgress).subscribe({
          next: (updated) => {
            this.snackBar.open('Progreso actualizado', 'Cerrar', { duration: 3000 });
            goal.progreso = updated.progreso;
            // Si es admin, recargamos todo para actualizar KPIs
            if (this.viewingAsAdmin && this.activeCycleId) this.loadAdminView(this.activeCycleId);
          },
          error: () => this.snackBar.open('Error al actualizar', 'Cerrar')
        });
      }
    });
  }

  openCreateGoalDialog(): void {
    if (!this.activeCycleId) {
      this.snackBar.open('No hay ciclo activo.', 'Cerrar');
      return;
    }

    const user = this.authService.getUser();
    const dialogRef = this.dialog.open(AddGoalDialog, {
      width: '500px',
      disableClose: true,
      data: {
        isAdmin: this.viewingAsAdmin,
        employees: this.employeesList,
        departments: this.departmentsList,
        currentUserId: user?.empleadoId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.performanceService.createGoal(this.activeCycleId!, result).subscribe({
          next: () => {
            this.snackBar.open('Objetivo creado', 'Cerrar', { duration: 3000 });
            this.loadData();
          },
          error: () => {
            this.snackBar.open('Error al crear objetivo', 'Cerrar');
            this.isLoading = false;
          }
        });
      }
    });
  }

  // Placeholders
  editGoal(goal: any) { } deleteGoal(goal: any): void {
    // Usamos confirm nativo o tu ConfirmationDialog si prefieres
    if (confirm(`¿Estás seguro de eliminar la meta "${goal.title}"?`)) {
      this.performanceService.deleteGoal(goal.id).subscribe({
        next: () => {
          this.snackBar.open('Objetivo eliminado', 'Cerrar', { duration: 3000 });
          // Recargar la tabla
          this.loadData();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al eliminar', 'Cerrar');
        }
      });
    }
  }
  // Helper para editar desde la tabla de admin (Reutilizamos el diálogo de progreso)
  openAdminEdit(adminGoal: AdminGoal) {
    // Mapeamos AdminGoal -> Objetivo (formato que espera el diálogo)
    const goal: any = {
      id: adminGoal.id,
      descripcion: adminGoal.title,
      progreso: adminGoal.progress
    };
    this.openUpdateProgressDialog(goal);
  }

  openCreateCycleDialog() {
    // Aquí abriremos el modal para crear { nombre, fechaInicio, fechaFin }
    const dialogRef = this.dialog.open(CreateCycleDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActiveCycle(); // Recargar para detectar el nuevo ciclo
      }
    });
  }

  loadActiveCycle() {
    this.performanceService.getActiveCycle().subscribe({
      next: (cycle) => {
        if (cycle && cycle.id) {
          console.log('Ciclo activo encontrado:', cycle.nombre);
          this.activeCycleId = cycle.id;

          // Opcional: Si ya tenías lógica para cargar metas, 
          // puedes llamarla aquí ahora que sabes que hay un ciclo.
          // Ej: this.loadMyGoals(); 
        } else {
          console.warn('No hay ciclo activo.');
          this.activeCycleId = null;
        }
      },
      error: (err) => {
        console.error('Error buscando ciclo activo:', err);
        this.activeCycleId = null;
      }
    });
  }
}