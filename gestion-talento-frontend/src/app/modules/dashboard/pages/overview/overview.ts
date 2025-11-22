import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importaciones de Angular Material
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
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Servicios y Modelos Reales
import { DashboardService, DashboardKPIs } from '../../services/dashboard';
import { AuthService } from '../../../auth/services/auth';

// Interfaces Locales (Vista)
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
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  viewingAsAdmin: boolean = false;
  isLoading: boolean = true;

  // --- DATOS REALES (Mapeados del Backend) ---
  adminKPIs: AdminKPI[] = [];

  // --- DATOS SIMULADOS (Aún no conectados al backend en esta fase) ---
  // Mantenemos estos para que la UI no se rompa mientras conectas los otros módulos
  surveySummary = { latestSurvey: 'Clima Laboral Q4 2025', participationRate: 78, overallSatisfaction: 4.2 };
  pendingApprovals: Approval[] = [
    { id: 1, type: 'Vacaciones', description: 'Jeimy Torres (5 días)' },
    { id: 2, type: 'Gastos', description: 'Erick Rodas ($120)' }
  ];

  employeeKPIs: EmployeeKPI[] = [
    { title: 'Progreso de Metas (Q4)', value: 82, unit: '%' },
    { title: 'Cursos Completados', value: 3, unit: 'cursos' },
    { title: 'Días de Vacaciones Restantes', value: 15, unit: 'días' }
  ];
  employeePendingTasks: EmployeeTask[] = [
    { id: 1, title: 'Diseñar la nueva pantalla de login', priority: 'alta' },
    { id: 2, title: 'Crear componentes reutilizables', priority: 'media' },
  ];
  upcomingHolidays: Holiday[] = [
    { date: '2025-11-03', name: 'Independencia de Cuenca' },
    { date: '2025-12-25', name: 'Navidad' }
  ];

  // Gráfico de distribución (simulado por ahora o podrías mapearlo de distribucion9Box)
  employeeDistribution = [
    { name: 'Tecnología', value: 25 },
    { name: 'Diseño', value: 15 },
    { name: 'Contabilidad', value: 12 },
    { name: 'Marketing', value: 10 },
    { name: 'RRHH', value: 8 },
  ];
  turnoverTrend = [
    {
      name: 'Rotación',
      series: [
        { name: 'Jul', value: 2 },
        { name: 'Ago', value: 1 },
        { name: 'Sep', value: 3 },
        { name: 'Oct', value: 1 }
      ]
    }
  ];
  upcomingEvents = [
    { date: '2025-10-31', description: 'Finaliza Sprint Octubre 2025' },
    { date: '2025-11-05', description: 'Revisión Política Teletrabajo' }
  ];

  chartColorScheme: Color = {
    name: 'puntopymesCharts',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#3f51b5', // Primary
      '#ff4081', // Accent
      '#ff9800', // Warning
      '#4caf50', // Success
      '#9c27b0'  // Secondary
    ]
  };

  leaveRequestForm: FormGroup;

  get availableLeaveDays(): number {
    const leaveKPI = this.employeeKPIs.find(k => k.title.includes('Vacaciones'));
    return leaveKPI ? leaveKPI.value : 0;
  }

  constructor(private fb: FormBuilder) {
    this.leaveRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // --- 4. DETERMINAR EL ROL AL INICIAR ---
    this.viewingAsAdmin = this.authService.isAdmin();
    console.log('¿Es Admin?', this.viewingAsAdmin);

    // Cargar datos según el rol
    if (this.viewingAsAdmin) {
      this.loadDashboardData(); // Datos globales (KPIs de empresa)
    } else {
      this.isLoading = false; // Para que no se quede cargando infinito si no hay datos de empleado aún
    }
  }

  loadDashboardData() {
    this.isLoading = true;

    this.dashboardService.getKPIs().subscribe({
      next: (data: DashboardKPIs) => {
        console.log('✅ Datos del Dashboard recibidos:', data);

        // Mapear la respuesta del backend a la estructura visual de AdminKPIs
        this.adminKPIs = [
          {
            title: 'Total Empleados',
            value: data.totalEmpleados.toString(),
            trend: 'Activos',
            isPositive: true,
            color: 'blue'
          },
          {
            title: 'Proyectos Activos',
            value: data.totalProyectosActivos.toString(),
            trend: 'En curso',
            isPositive: true,
            color: 'green'
          },
          {
            title: 'Gastos Aprobados',
            value: `$${data.totalGastosAprobados}`,
            trend: 'Total Acumulado',
            isPositive: false, // Podría ser false si es un gasto alto
            color: 'orange'
          },
          {
            title: 'Asistencia Hoy',
            value: `${data.tasaAsistenciaHoy}%`,
            trend: 'Del personal',
            isPositive: data.tasaAsistenciaHoy > 80,
            color: 'purple'
          }
        ];

        // Opcional: Podrías mapear la distribución de 9-Box al gráfico de pastel
        // si quisieras mostrar "Alto Potencial" vs "Bajo Potencial".

        this.isLoading = false;
        this.cdr.markForCheck(); // Asegurar actualización de vista
      },
      error: (err) => {
        console.error('❌ Error cargando KPIs:', err);
        this.isLoading = false;
        // En caso de error, podrías mostrar datos vacíos o un mensaje
        this.adminKPIs = [
          { title: 'Error de Carga', value: '-', trend: 'Intente recargar', isPositive: false, color: 'red' }
        ];
      }
    });
  }

  requestLeave(): void {
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }
    const { startDate, endDate } = this.leaveRequestForm.value;
    console.log('Solicitando vacaciones:', startDate, endDate);

    // Simulación de llamada
    alert(`Solicitud enviada:\n${startDate} - ${endDate}`);
    this.leaveRequestForm.reset();
  }

  approveRequest(id: number): void {
    console.log('Aprobando:', id);
    this.pendingApprovals = this.pendingApprovals.filter(req => req.id !== id);
  }

  rejectRequest(id: number): void {
    console.log('Rechazando:', id);
    this.pendingApprovals = this.pendingApprovals.filter(req => req.id !== id);
  }
}