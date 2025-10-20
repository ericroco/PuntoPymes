import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruitment.html',
  styleUrls: ['./recruitment.scss'],
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
export class Recruitment {
  jobOpenings = [
    { title: 'Desarrollador Frontend Senior', department: 'Tecnología', location: 'Trabajo Remoto', candidates: 12, status: 'abierta' },
    { title: 'Diseñador UX/UI', department: 'Diseño', location: 'Oficina Loja', candidates: 25, status: 'abierta' },
    { title: 'Analista Contable', department: 'Contabilidad', location: 'Oficina Loja', candidates: 8, status: 'cerrada' },
    { title: 'Especialista en Marketing Digital', department: 'Marketing', location: 'Trabajo Remoto', candidates: 31, status: 'abierta' }
  ];
}