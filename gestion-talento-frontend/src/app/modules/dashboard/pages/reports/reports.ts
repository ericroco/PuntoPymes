import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts'; // Importamos la librería
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule // La añadimos a los imports
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
export class Reports {
  // Datos de ejemplo para el gráfico de barras
  tasksByDepartment = [
    { "name": "Tecnología", "value": 42 },
    { "name": "Diseño", "value": 25 },
    { "name": "Contabilidad", "value": 18 },
    { "name": "RRHH", "value": 12 }
  ];

  // Datos para el gráfico de pastel
  employeeStatus = [
    { "name": "Activos", "value": 74 },
    { "name": "De Vacaciones", "value": 8 },
    { "name": "Inactivos", "value": 3 }
  ];

  // Opciones de personalización para los gráficos
  colorScheme: Color = {
    name: 'puntoPymesScheme', // Un nombre para nuestro esquema
    selectable: true,
    group: ScaleType.Ordinal, // Un tipo de escala estándar
    domain: ['#E74C3C', '#555555', '#3498DB', '#F1C40F'] // Nuestros colores
  };
}