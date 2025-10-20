import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surveys.html',
  styleUrls: ['./surveys.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms',
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class Surveys {
  surveys = [
    { title: 'Encuesta de Clima Laboral Q3 2025', responses: '82/95', status: 'Cerrada', date: '2025-09-30' },
    { title: 'Feedback sobre Nuevas Oficinas', responses: '75/95', status: 'Cerrada', date: '2025-08-15' },
    { title: 'Encuesta de Satisfacción Trimestral Q4 2025', responses: '15/95', status: 'Activa', date: '2025-12-01' },
    { title: 'Sondeo Rápido: Actividad de Fin de Año', responses: '0/95', status: 'Borrador', date: '2025-11-20' }
  ];
}