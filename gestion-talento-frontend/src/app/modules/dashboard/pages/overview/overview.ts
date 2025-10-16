import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [ // Se activa cada vez que se carga la vista
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Overview {
  // Datos de ejemplo para las tarjetas
  summaryCards = [
    { title: 'Empleados Activos', value: '74', trend: '+2.5%', isPositive: true, color: 'blue' },
    { title: 'Tareas Completadas (Mes)', value: '248', trend: '+10%', isPositive: true, color: 'green' },
    { title: 'Horas Extras (Semana)', value: '32', trend: '-5%', isPositive: false, color: 'orange' },
    { title: 'Solicitudes Pendientes', value: '5', trend: 'Hoy', isPositive: false, color: 'red' }
  ];
}