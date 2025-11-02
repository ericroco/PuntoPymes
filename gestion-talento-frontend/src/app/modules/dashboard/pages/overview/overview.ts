import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, | date
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para el formulario de vacaciones
import { RouterModule } from '@angular/router'; // Para enlaces

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
// Importaciones para Animaciones
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Interfaces (opcionales pero recomendadas)
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
      transition(':enter', [ // Se activa solo al entrar
        query('.overview-widget', [ // Selecciona todos los widgets
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', // Aplica un retraso a cada uno
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class Overview implements OnInit {

  viewingAsAdmin: boolean = false;

  // --- DATOS DE EJEMPLO PARA ADMINISTRADOR ---
  adminKPIs: AdminKPI[] = [
    { title: 'Empleados Activos', value: '74', trend: '+2.5%', isPositive: true, color: 'blue' },
    { title: 'Tareas Completadas (Mes)', value: '248', trend: '+10%', isPositive: true, color: 'green' },
    { title: 'Nuevas Contrataciones (Q4)', value: '6', trend: '+1', isPositive: true, color: 'blue' },
  ];
  surveySummary = { latestSurvey: 'Clima Laboral Q4 2025', participationRate: 78, overallSatisfaction: 4.2 };
  pendingApprovals: Approval[] = [
    { id: 1, type: 'Vacaciones', description: 'Jeimy Torres (5 días)' },
    { id: 2, type: 'Gastos', description: 'Erick Rodas ($120)' },
    { id: 3, type: 'Vacaciones', description: 'Valentina Samaniego (1 día)' }
  ];

  // --- DATOS DE EJEMPLO PARA EMPLEADO ---
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
  employeeDistribution = [ // Para gráfico de pastel
    { name: 'Tecnología', value: 25 },
    { name: 'Diseño', value: 15 },
    { name: 'Contabilidad', value: 12 },
    { name: 'Marketing', value: 10 },
    { name: 'RRHH', value: 8 },
  ];
  turnoverTrend = [ // Para gráfico de línea (simulado)
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
  upcomingEvents = [ // Lista de eventos
    { date: '2025-10-31', description: 'Finaliza Sprint Octubre 2025' },
    { date: '2025-11-05', description: 'Revisión Política Teletrabajo' },
    { date: '2025-11-15', description: 'Fecha Límite Encuesta Clima' },
  ];
  // Esquema de color para gráficos (usando variables CSS)
  chartColorScheme: Color = {
    name: 'puntopymesCharts',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
        'var(--color-primary)',
        'var(--color-accent)',
        'var(--color-warning)',
        'var(--color-success)',
        'var(--color-secondary)'
      ] // Usa tus variables CSS principales
  };
  leaveRequestForm: FormGroup; // Formulario para solicitar vacaciones

  // Getter para obtener fácilmente los días de vacaciones
  get availableLeaveDays(): number {
    const leaveKPI = this.employeeKPIs.find(k => k.title.includes('Vacaciones'));
    return leaveKPI ? leaveKPI.value : 0;
  }

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario de solicitud de vacaciones
    this.leaveRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // --- TODO: Cargar los datos correspondientes desde el backend según el rol del usuario ---
    if (this.viewingAsAdmin) {
      console.log("Cargando datos del dashboard de Administrador...");
      // Simulación: Cargar KPIs, aprobaciones, resúmenes
    } else {
      console.log("Cargando datos del dashboard de Empleado...");
      // Simulación: Cargar KPIs personales, tareas, feriados
    }
  }

  // --- Método de Empleado ---
  requestLeave(): void {
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }
    const { startDate, endDate } = this.leaveRequestForm.value;
    console.log('Solicitando vacaciones desde:', startDate, 'hasta:', endDate);
    
    // --- TODO: Abrir modal de confirmación y llamar API ---
    alert(`Vacaciones solicitadas (simulación):\nInicio: ${startDate.toLocaleDateString()}\nFin: ${endDate.toLocaleDateString()}`);
    
    // Limpiar formulario y resetear estado
    this.leaveRequestForm.reset();
    Object.keys(this.leaveRequestForm.controls).forEach(key => {
      this.leaveRequestForm.get(key)?.setErrors(null) ;
    });
  }

  // --- Método de Administrador ---
  approveRequest(id: number): void {
    console.log('Aprobando solicitud (simulación):', id);
    // --- TODO: Llamar API para aprobar ---
    this.pendingApprovals = this.pendingApprovals.filter(req => req.id !== id);
  }

  // --- Métodos de Administrador (Placeholders) ---
  rejectRequest(id: number): void {
    console.log('Rechazando solicitud (simulación):', id);
    // --- TODO: Llamar API para rechazar ---
    this.pendingApprovals = this.pendingApprovals.filter(req => req.id !== id);
  }
}