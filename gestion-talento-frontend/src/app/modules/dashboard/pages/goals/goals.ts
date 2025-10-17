import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule],
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
export class Goals {
  departmentGoals = [
    { title: 'Incrementar Ventas Q4', owner: 'Equipo de Ventas', progress: 75, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Reducir Tiempo de Respuesta de Soporte', owner: 'Equipo de Soporte', progress: 40, status: 'en-riesgo', statusColor: '#F1C40F' },
    { title: 'Lanzar Nueva Campaña de Marketing', owner: 'Equipo de Marketing', progress: 100, status: 'completada', statusColor: '#2ECC71' }
  ];

  personalGoals = [
    { title: 'Completar curso de Angular Avanzado', progress: 80, status: 'en-progreso', statusColor: '#3498DB' },
    { title: 'Certificación de AWS', progress: 25, status: 'pendiente', statusColor: '#95A5A6' }
  ];
}