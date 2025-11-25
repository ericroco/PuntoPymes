import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Servicios
import { DashboardService, DashboardKPIs } from '../../services/dashboard';
import { AuthService } from '../../../auth/services/auth';
import { VacationService } from '../../services/vacation';

// Interfaces
interface AdminKPI { title: string; value: string; trend: string; isPositive: boolean; color: string; }
interface Approval { id: number; type: 'Vacaciones' | 'Gastos'; description: string; }
interface EmployeeKPI { title: string; value: number; unit: '%' | 'cursos' | 'días'; }
interface EmployeeTask { id: number; title: string; priority: 'alta' | 'media' | 'baja'; }
interface Holiday { date: string; name: string; }

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule, // Importante para notificaciones
    NgxChartsModule
  ],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
  animations: [
    trigger('widgetAnimation', [
      transition(':enter', [
        query('.overview-widget', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms',
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class Overview implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);
  private vacationService = inject(VacationService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  viewingAsAdmin: boolean = false;
  isLoading: boolean = true;
  leaveRequestForm: FormGroup;

  // Datos
  adminKPIs: AdminKPI[] = [];
  pendingApprovals: Approval[] = [];
  employeeKPIs: EmployeeKPI[] = [
    { title: 'Progreso de Metas (Q4)', value: 0, unit: '%' },
    { title: 'Cursos Completados', value: 0, unit: 'cursos' },
    { title: 'Días de Vacaciones Restantes', value: 15, unit: 'días' }
  ];

  upcomingHolidays: Holiday[] = [
    { date: '2025-11-03', name: 'Independencia de Cuenca' },
    { date: '2025-12-25', name: 'Navidad' }
  ];
  employeePendingTasks: EmployeeTask[] = [
    { id: 1, title: 'Completar perfil', priority: 'alta' }
  ];

  chartColorScheme: Color = {
    name: 'puntopymesCharts',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#ff4081', '#ff9800', '#4caf50', '#9c27b0']
  };
  employeeDistribution = [
    { name: 'Tecnología', value: 25 }, { name: 'Diseño', value: 15 },
    { name: 'Contabilidad', value: 12 }, { name: 'RRHH', value: 8 }
  ];
  turnoverTrend = [{ name: 'Rotación', series: [] }];

  // Simulación de datos (se reemplazarían con backend real de encuestas/eventos)
  surveySummary = { latestSurvey: 'Clima Laboral Q4 2025', participationRate: 78, overallSatisfaction: 4.2 };
  upcomingEvents = [
    { date: '2025-10-31', description: 'Finaliza Sprint Octubre 2025' },
    { date: '2025-11-05', description: 'Revisión Política Teletrabajo' }
  ];

  get availableLeaveDays(): number {
    const kpi = this.employeeKPIs.find(k => k.title.includes('Vacaciones'));
    return kpi ? kpi.value : 0;
  }

  constructor(private fb: FormBuilder) {
    this.leaveRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.viewingAsAdmin = this.authService.isAdmin();
    console.log('¿Es Admin?', this.viewingAsAdmin);

    if (this.viewingAsAdmin) {
      this.loadDashboardData();
      this.loadPendingApprovals();
    } else {
      // Aquí podrías cargar datos específicos del empleado
      this.isLoading = false;
    }
  }

  loadDashboardData() {
    this.isLoading = true;
    this.dashboardService.getKPIs().subscribe({
      next: (data: DashboardKPIs) => {
        // Si no hay datos, simulamos para demo
        if (data.totalEmpleados === 0 && data.totalProyectosActivos === 0) {
          this.adminKPIs = [
            { title: 'Total Empleados', value: '0', trend: 'Sin datos', isPositive: false, color: 'grey' },
            { title: 'Proyectos', value: '0', trend: '-', isPositive: false, color: 'grey' },
          ];
        } else {
          this.adminKPIs = [
            { title: 'Total Empleados', value: data.totalEmpleados.toString(), trend: 'Activos', isPositive: true, color: 'blue' },
            { title: 'Proyectos Activos', value: data.totalProyectosActivos.toString(), trend: 'En curso', isPositive: true, color: 'green' },
            { title: 'Gastos Aprobados', value: `$${data.totalGastosAprobados}`, trend: 'Total', isPositive: false, color: 'orange' },
            { title: 'Asistencia Hoy', value: `${data.tasaAsistenciaHoy}%`, trend: 'Global', isPositive: data.tasaAsistenciaHoy > 80, color: 'purple' }
          ];
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('❌ Error KPIs:', err);
        this.isLoading = false;
      }
    });
  }

  loadPendingApprovals() {
    this.vacationService.getRequests().subscribe({
      next: (data) => {
        const pendientes = data.filter(req => req.estado === 'PENDIENTE');
        this.pendingApprovals = pendientes.map(req => ({
          id: req.id,
          type: 'Vacaciones',
          // Manejo seguro de empleado nulo
          description: `${req.empleado?.nombre || 'Empleado'} ${req.empleado?.apellido || ''} (${req.diasSolicitados} días)`
        }));
      },
      error: (err) => console.error(err)
    });
  }

  requestLeave(): void {
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }

    // 1. Obtener el usuario actual para sacar su ID
    const currentUser = this.authService.getUser();

    if (!currentUser || !currentUser.empleadoId) {
      this.snackBar.open('No se pudo identificar al empleado. Intenta iniciar sesión de nuevo.', 'Cerrar', { duration: 3000 });
      return;
    }

    const { startDate, endDate } = this.leaveRequestForm.value;

    // Helper para fechas
    const formatDate = (date: Date) => {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split('T')[0];
    };

    // 2. Construir el Payload COMPLETO (Incluyendo empleadoId)
    const payload = {
      empleadoId: currentUser.empleadoId, // <--- ¡ESTO FALTABA!
      fechaInicio: formatDate(startDate),
      fechaFin: formatDate(endDate),
      comentario: 'Solicitud desde Dashboard' // Opcional, puedes agregar un campo en el form si quieres
    };

    console.log('Enviando solicitud:', payload);

    this.vacationService.requestLeave(payload).subscribe({
      next: () => {
        this.snackBar.open('Solicitud enviada con éxito', 'Cerrar', { duration: 3000 });
        this.leaveRequestForm.reset();

        // Recargar la lista de pendientes si soy admin
        if (this.viewingAsAdmin) {
          this.loadPendingApprovals();
        }
      },
      error: (err) => {
        console.error('Error backend:', err);
        this.snackBar.open('Error al solicitar vacaciones', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Placeholders
  approveRequest(id: number): void {
    console.log('Aprobando:', id);
    // Aquí iría la llamada al servicio para aprobar
    this.snackBar.open('Solicitud aprobada (simulación)', 'Cerrar', { duration: 2000 });
  }

  rejectRequest(id: number): void {
    console.log('Rechazando:', id);
    this.snackBar.open('Solicitud rechazada (simulación)', 'Cerrar', { duration: 2000 });
  }
}