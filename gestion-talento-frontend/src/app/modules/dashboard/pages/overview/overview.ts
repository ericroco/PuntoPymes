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
import { MatDialog } from '@angular/material/dialog';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { TranslateModule } from '@ngx-translate/core';

// Servicios
import { DashboardService, DashboardKPIs } from '../../services/dashboard';
import { AuthService } from '../../../auth/services/auth';
import { VacationService } from '../../services/vacation';
import { VoteDialogComponent } from '../../components/vote-dialog/vote-dialog';
import { ProductivityService, Anuncio, Encuesta } from '../../services/productivity';

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
    MatSnackBarModule,
    NgxChartsModule,
    TranslateModule
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
  private dialog = inject(MatDialog);
  private productivityService = inject(ProductivityService);

  viewingAsAdmin: boolean = false;
  isLoading: boolean = true;
  leaveRequestForm: FormGroup;
  availableLeaveDays: number = 0;

  // Datos
  adminKPIs: AdminKPI[] = [];
  pendingApprovals: any[] = [];
  employeeKPIs: EmployeeKPI[] = [
    { title: 'Progreso de Metas (Q4)', value: 0, unit: '%' },
    { title: 'Cursos Completados', value: 0, unit: 'cursos' },
    { title: 'Días de Vacaciones Restantes', value: 15, unit: 'días' }
  ];

  anuncios: Anuncio[] = [];
  encuestas: Encuesta[] = [];
  encuestasPendientes: any[] = [];

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


  constructor(private fb: FormBuilder) {
    this.leaveRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEncuestas();

    // Verificar rol
    this.viewingAsAdmin = this.authService.isAdmin();
    console.log('¿Es Admin?', this.viewingAsAdmin);

    if (this.viewingAsAdmin) {
      // Si es admin, cargamos datos globales y aprobaciones
      this.loadDashboardData();
      this.loadPendingApprovals();
    } else {
      // Si es empleado, cargamos sus datos y SU SALDO de vacaciones
      this.isLoading = false;
      this.loadEmployeeData();

      // 🔥 NUEVO: Cargar el saldo real de vacaciones al iniciar
      this.loadVacationBalance();
    }
  }


  loadVacationBalance(): void {
    const currentUser = this.authService.getUser();

    if (currentUser && currentUser.empleadoId) {
      this.vacationService.getVacationBalance(currentUser.empleadoId).subscribe({
        next: (saldo) => {
          console.log('💰 Saldo recibido del backend:', saldo); // Debug para ver qué año trae

          // Asignamos el valor
          this.availableLeaveDays = saldo ? saldo.diasDisponibles : 0;

          // 🔥 FIX: Avisar a Angular que actualice el HTML
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error cargando saldo de vacaciones:', err);
          this.availableLeaveDays = 0;
          this.cdr.markForCheck(); // También aquí por si acaso
        }
      });
    }
  }

  // 👇 5. NUEVA FUNCIÓN PARA CARGAR TODO LO DEL EMPLEADO EN PARALELO
  loadEmployeeData() {
    this.isLoading = true;

    // Usamos Promesas o ForksJoin si quisieramos esperar a todo, 
    // pero suscripciones individuales están bien para que se vaya pintando lo que llegue.

    // A. Anuncios
    this.productivityService.getMyAnuncios().subscribe({
      next: (data) => this.anuncios = data,
      error: (err) => console.error('Error cargando anuncios', err)
    });

    // B. Encuestas
    this.productivityService.getMyEncuestas().subscribe({
      next: (data) => {
        this.encuestas = data;
        // Calculamos participación si hace falta
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando encuestas', err);
        this.isLoading = false;
      }
    });

    // C. Otros datos (Vacaciones, Tareas, etc) pueden ir aquí...
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

  // ============================================================
  // 3. SOLICITAR VACACIONES (Lógica completa)
  // ============================================================
  requestLeave(): void {
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }

    // 1. Obtener el usuario actual
    const currentUser = this.authService.getUser();

    if (!currentUser || !currentUser.empleadoId) {
      this.snackBar.open('No se pudo identificar al empleado. Intenta iniciar sesión de nuevo.', 'Cerrar', { duration: 3000 });
      return;
    }

    const { startDate, endDate } = this.leaveRequestForm.value;

    // Helper interno para formatear fechas a YYYY-MM-DD
    const formatDate = (date: Date) => {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split('T')[0];
    };

    // 2. Construir Payload
    const payload = {
      empleadoId: currentUser.empleadoId,
      fechaInicio: formatDate(startDate),
      fechaFin: formatDate(endDate),
      comentario: 'Solicitud desde Dashboard'
    };

    console.log('Enviando solicitud:', payload);

    // 3. Llamada al Servicio
    this.vacationService.requestLeave(payload).subscribe({
      next: () => {
        this.snackBar.open('Solicitud enviada con éxito', 'Cerrar', { duration: 3000 });
        this.leaveRequestForm.reset();

        // Refrescamos el saldo (por si acaso hubiera lógica de bloqueo inmediato)
        this.loadVacationBalance();

        // Si soy admin y estoy probando mi propio sistema, recargo la lista de pendientes
        if (this.viewingAsAdmin) {
          this.loadPendingApprovals();
        }
      },
      error: (err) => {
        console.error('Error backend:', err);
        // Manejo de errores específicos (ej: saldo insuficiente)
        const msg = err.error?.message || 'Error al solicitar vacaciones';
        this.snackBar.open(msg, 'Cerrar', { duration: 4000 });
      }
    });
  }

  loadEncuestas() {
    this.isLoading = true;
    this.productivityService.getMyEncuestas().subscribe({
      next: (data) => {
        this.encuestas = data;

        // 🧠 LÓGICA DE COLA: Filtramos solo las que NO tienen 'miVoto'
        this.encuestasPendientes = data.filter((e: any) => !e.miVoto);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando encuestas', err);
        this.isLoading = false;
      }
    });
  }
  // Placeholders
  approveRequest(id: string): void {
    this.vacationService.respondRequest(id, 'APROBADA', 'Aprobado desde Overview').subscribe({
      next: () => {
        this.snackBar.open('✅ Solicitud Aprobada', 'Cerrar', { duration: 3000 });
        this.loadPendingApprovals(); // Recargamos la lista para que desaparezca
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('❌ Error al aprobar', 'Cerrar');
      }
    });
  }

  // ❌ RECHAZAR
  rejectRequest(id: string): void {
    // Podrías abrir un dialog aquí para pedir motivo, por ahora mandamos uno genérico
    this.vacationService.respondRequest(id, 'RECHAZADA', 'Rechazado desde Overview').subscribe({
      next: () => {
        this.snackBar.open('🚫 Solicitud Rechazada', 'Cerrar', { duration: 3000 });
        this.loadPendingApprovals(); // Recargamos la lista
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('❌ Error al rechazar', 'Cerrar');
      }
    });
  }

  // Función para abrir el modal
  openVoteDialog(encuesta: any) {
    const dialogRef = this.dialog.open(VoteDialogComponent, {
      width: '400px',
      data: { encuesta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ✅ Si votó exitosamente, recargamos.
        // Al recargar, la encuesta votada dejará de ser "pendiente" 
        // y pasará al siguiente item de la lista.
        this.loadEncuestas();
      }
    });
  }
}