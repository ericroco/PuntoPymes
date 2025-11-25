import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule, Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Componentes compartidos
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';

// Servicios y Modelos
import { DashboardService, DashboardKPIs } from '../../services/dashboard';

// Interfaz para los datos de los gráficos (Soluciona el error de tipo 'never')
interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgxChartsModule,
    SubpageHeader,
    MatDividerModule
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        query('.report-container', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('150ms',
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class Reports implements OnInit {
  private dashboardService = inject(DashboardService);

  legendPos: LegendPosition = LegendPosition.Below;

  // Filtros Globales
  selectedDateRange = { start: null, end: null };
  selectedDepartment: string = 'todos';
  departments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];

  // KPIs (Tarjetas)
  headcount = { total: 0, newHires: 0, departures: 0 };
  kpiMasaSalarial = { label: 'Gastos Totales (Aprobados)', value: 0, subLabel: 'Acumulado' };
  avgGoalProgress = { total: 0, label: 'Asistencia Hoy' }; // Reutilizamos para mostrar asistencia real

  // --- GRÁFICOS (Aquí estaba el error: ahora tienen tipo explícito) ---

  // Distribución (Pastel)
  employeeDistribution: ChartData[] = [];

  // Estado de Tareas/Proyectos (Barras o Pastel)
  tasksStatusData: ChartData[] = [];

  // Esquema de Colores
  chartColorScheme: Color = {
    name: 'puntopymesReports',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#3f51b5', // Primary
      '#ff4081', // Accent
      '#ff9800', // Warning
      '#4caf50', // Success
      '#9c27b0', // Secondary
      '#2C3E50'  // Dark
    ]
  };

  // --- Datos Simulados (Placeholders para gráficos que aún no tienen backend directo) ---

  employeeTenure: ChartData[] = [
    { name: '0-1 Año', value: 20 }, { name: '1-3 Años', value: 35 },
    { name: '3-5 Años', value: 12 }, { name: '5+ Años', value: 7 }
  ];

  teamProductivityData: ChartData[] = [
    { name: 'Tecnología', value: 85 }, { name: 'Diseño', value: 92 },
    { name: 'Contabilidad', value: 78 }, { name: 'Marketing', value: 81 }
  ];

  salarioPromedioData: ChartData[] = [
    { name: 'Tecnología', value: 2150 }, { name: 'Diseño', value: 1800 },
    { name: 'RRHH', value: 1900 }
  ];

  adopcionBeneficiosData: ChartData[] = [
    { name: 'Seguro Médico', value: 68 }, { name: 'Gimnasio', value: 45 }
  ];

  turnoverTrend = [
    {
      name: 'Rotación',
      series: [
        { name: 'Ene', value: 1 }, { name: 'Feb', value: 2 }, { name: 'Mar', value: 0 }
      ]
    }
  ];

  novedadesRecientes = [
    { id: 'N-101', empleado: 'Juan Perez', tipo: 'Bono', monto: 300, estado: 'Aprobado' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    // Llamada al servicio real
    this.dashboardService.getKPIs().subscribe({
      next: (data: DashboardKPIs) => {
        console.log('Datos Reportes:', data);

        // 1. Mapear Headcount (Empleados Reales)
        this.headcount.total = data.totalEmpleados;

        // 2. Mapear Gastos (Total Dinero)
        this.kpiMasaSalarial.value = data.totalGastosAprobados;

        // 3. Mapear Asistencia (Porcentaje)
        this.avgGoalProgress.total = data.tasaAsistenciaHoy;
        this.avgGoalProgress.label = 'Asistencia Hoy (%)';

        // 4. Gráfico 1: Distribución de Talento (9-Box)
        this.employeeDistribution = [
          { name: 'Alto Potencial', value: data.distribucion9Box.altoDesempenoAltoPotencial },
          { name: 'Bajo Desempeño', value: data.distribucion9Box.bajoDesempenoBajoPotencial },
          // Calculamos el resto como "Otros"
          { name: 'Otros', value: Math.max(0, data.totalEmpleados - data.distribucion9Box.altoDesempenoAltoPotencial - data.distribucion9Box.bajoDesempenoBajoPotencial) }
        ];

        // 5. Gráfico 2: Estado de Proyectos
        this.tasksStatusData = [
          { name: 'Proyectos Activos', value: data.totalProyectosActivos },
          // Simulación de inactivos (o podrías calcularlo si tuvieras el total histórico)
          { name: 'Inactivos / Completados', value: 0 }
        ];
      },
      error: (err) => console.error('Error cargando reportes:', err)
    });
  }

  // Funciones Placeholder
  applyGlobalFilters(): void { console.log('Filtros aplicados...'); }
  exportReports(): void { console.log('Exportando...'); }
}