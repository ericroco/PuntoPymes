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
// 👇 1. IMPORTAR SERVICIO DE CONFIGURACIÓN
import { CompanyConfigService } from '../../services/company-config';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule,
    MatCardModule, NgxChartsModule, SubpageHeader, MatDividerModule
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
  // 👇 2. INYECTAR SERVICIO
  private configService = inject(CompanyConfigService);

  legendPos: LegendPosition = LegendPosition.Below;

  // Filtros Globales
  selectedDateRange = { start: null, end: null };
  selectedDepartment: string = 'todos';
  departments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];

  // KPIs (Tarjetas)
  headcount = { total: 0, newHires: 0, departures: 0 };
  kpiMasaSalarial = { label: 'Gastos Totales (Aprobados)', value: 0, subLabel: 'Acumulado' };

  // Asistencia con lógica de alerta
  avgGoalProgress = { total: 0, label: 'Asistencia Hoy' };
  isAttendanceCritical = false; // ¿Está por debajo de la meta?

  // --- 3. VARIABLES DE VISIBILIDAD (Controladas por Configuración) ---
  showHeadcount = true;
  showDemographics = true;
  show9Box = false; // Por defecto oculto si no se configura
  showMasaSalarial = true;
  showAsistencia = true;

  // --- 4. METAS DE LA EMPRESA ---
  metaAsistencia = 90; // Valor default

  // --- GRÁFICOS ---
  employeeDistribution: ChartData[] = [];
  tasksStatusData: ChartData[] = [];

  // Esquema de Colores
  chartColorScheme: Color = {
    name: 'puntopymesReports',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#ff4081', '#ff9800', '#4caf50', '#9c27b0', '#2C3E50']
  };

  // Datos Simulados
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
  novedadesRecientes = [
    { id: 'N-101', empleado: 'Juan Perez', tipo: 'Bono', monto: 300, estado: 'Aprobado' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Cargar ambas cosas en paralelo (Datos y Configuración)
    this.loadCompanySettings();
    this.loadReportData();
  }

  // 👇 5. NUEVA FUNCIÓN: Cargar preferencias del usuario
  loadCompanySettings() {
    this.configService.getConfig().subscribe({
      next: (config) => {
        const kpis = config.kpis || {};

        // Actualizar Visibilidad (Si es undefined, mantenemos true por defecto)
        this.showHeadcount = kpis.mostrarHeadcount ?? true;
        this.showDemographics = kpis.mostrarDemografia ?? true;
        this.show9Box = kpis.mostrar9Box ?? false;
        this.showMasaSalarial = kpis.mostrarMasaSalarial ?? true;
        this.showAsistencia = kpis.mostrarAsistencia ?? true;

        // Actualizar Metas
        if (kpis.metaAsistencia) this.metaAsistencia = kpis.metaAsistencia;

        // Recalcular alertas por si los datos llegaron antes que la config
        this.checkThresholds();
      },
      error: (err) => console.error('Error cargando configuración de KPIs', err)
    });
  }

  loadReportData() {
    this.dashboardService.getKPIs().subscribe({
      next: (data: DashboardKPIs) => {
        // 1. Headcount
        this.headcount.total = data.totalEmpleados;

        // 2. Gastos
        this.kpiMasaSalarial.value = data.totalGastosAprobados;

        // 3. Asistencia
        this.avgGoalProgress.total = data.tasaAsistenciaHoy;
        this.avgGoalProgress.label = 'Asistencia Hoy (%)';

        // Verificar si cumple la meta
        this.checkThresholds();

        // 4. 9-Box
        this.employeeDistribution = [
          { name: 'Alto Potencial', value: data.distribucion9Box.altoDesempenoAltoPotencial },
          { name: 'Bajo Desempeño', value: data.distribucion9Box.bajoDesempenoBajoPotencial },
          { name: 'Otros', value: Math.max(0, data.totalEmpleados - data.distribucion9Box.altoDesempenoAltoPotencial - data.distribucion9Box.bajoDesempenoBajoPotencial) }
        ];

        // 5. Proyectos
        this.tasksStatusData = [
          { name: 'Proyectos Activos', value: data.totalProyectosActivos },
          { name: 'Inactivos / Completados', value: 0 }
        ];
      },
      error: (err) => console.error('Error cargando reportes:', err)
    });
  }

  // 👇 6. VALIDAR METAS (Color Rojo/Verde)
  checkThresholds() {
    // Si la asistencia real es menor a la meta configurada, es crítico
    if (this.avgGoalProgress.total > 0) {
      this.isAttendanceCritical = this.avgGoalProgress.total < this.metaAsistencia;
    }
  }

  applyGlobalFilters(): void { console.log('Filtros aplicados...'); }
  exportReports(): void { console.log('Exportando...'); }
}