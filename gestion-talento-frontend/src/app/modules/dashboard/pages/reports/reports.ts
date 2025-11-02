import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para los filtros
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs'; // Para las pestañas
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule, Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts'; // Importamos la librería
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header'; // Ajusta la ruta
import { MatDividerModule } from '@angular/material/divider';

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
  animations: [ // Animación para que los contenedores de los gráficos aparezcan suavemente
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
  legendPos: LegendPosition = LegendPosition.Below;
  // --- Filtros Globales ---
  // TODO: Conectar esto a un FormGroup si se necesita lógica compleja
  selectedDateRange = { start: null, end: null };
  selectedDepartment: string = 'todos';
  departments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];

  // --- Datos Pestaña 1: Personal y Demografía ---
  headcount = { total: 74, newHires: 6, departures: 2 };
  // Datos para gráfico de pastel (Distribución por Depto)
  employeeDistribution = [
    { name: 'Tecnología', value: 25 },
    { name: 'Diseño', value: 15 },
    { name: 'Contabilidad', value: 12 },
    { name: 'Marketing', value: 10 },
    { name: 'RRHH', value: 8 },
    { name: 'Ventas', value: 4 }
  ];
  // Datos para gráfico de barras (Antigüedad)
  employeeTenure = [
    { name: '0-1 Año', value: 20 },
    { name: '1-3 Años', value: 35 },
    { name: '3-5 Años', value: 12 },
    { name: '5+ Años', value: 7 }
  ];

  // Esquema de color para gráficos (usando variables CSS)
  chartColorScheme: Color = {
    name: 'puntopymesReports',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      'var(--color-primary)',
      'var(--color-accent)',
      'var(--color-warning)',
      'var(--color-success)',
      'var(--color-secondary)',
      '#2C3E50' // Un color oscuro extra
    ]
  };
  tasksStatusData = [
    { name: 'Pendiente', value: 45 },
    { name: 'En Progreso', value: 22 },
    { name: 'Completada', value: 138 }
  ];

  // Datos para gráfico de barras (Productividad por Equipo)
  teamProductivityData = [
    { name: 'Tecnología', value: 85 }, // Valor puede ser % de tareas completadas
    { name: 'Diseño', value: 92 },
    { name: 'Contabilidad', value: 78 },
    { name: 'Marketing', value: 81 }
  ];

  // KPI: Progreso medio de metas
  avgGoalProgress = {
    total: 72, // 72%
    label: 'Progreso Medio de Metas (Q4)'
  };
  kpiMasaSalarial = {
    label: 'Masa Salarial Mensual',
    value: 125300, // Valor en USD
    subLabel: 'Nómina activa'
  };

  // Datos para gráfico de barras (Salario Promedio por Depto)
  salarioPromedioData = [
    { name: 'Tecnología', value: 2150 },
    { name: 'Diseño', value: 1800 },
    { name: 'Contabilidad', value: 2000 },
    { name: 'Marketing', value: 1750 },
    { name: 'RRHH', value: 1900 }
  ];

  // Datos para gráfico de pastel (Adopción de Beneficios)
  adopcionBeneficiosData = [
    { name: 'Seguro Médico Privado', value: 68 }, // 68 empleados inscritos
    { name: 'Vales de Alimentación', value: 74 },
    { name: 'Plan de Gimnasio', value: 45 }
  ];

  // Datos para la tabla (Últimas Novedades Registradas)
  novedadesRecientes = [
    { id: 'N-101', empleado: 'Jeimy Torres', tipo: 'Bono Productividad', monto: 300, estado: 'Aprobado' },
    { id: 'N-102', empleado: 'Erick Rodas', tipo: 'Anticipo Salarial', monto: -400, estado: 'Aprobado' },
    { id: 'N-103', empleado: 'Valentina Samaniego', tipo: 'Comisión Ventas', monto: 250, estado: 'Pendiente' },
  ];

  constructor() { }

  ngOnInit(): void {
    // --- TODO: Cargar datos iniciales para los reportes ---
  }

  // --- Funciones (Placeholders) ---
  applyGlobalFilters(): void {
    console.log('Aplicando filtros:', this.selectedDateRange, this.selectedDepartment);
    // --- TODO: Recargar todos los datos de los gráficos/KPIs basado en los filtros ---
  }

  exportReports(): void {
    console.log('Exportando reportes...');
    // --- TODO: Implementar lógica de exportación (PDF/Excel) ---
  }
}