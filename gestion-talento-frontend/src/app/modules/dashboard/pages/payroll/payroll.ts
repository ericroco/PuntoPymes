import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger('50ms', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Payroll {
  employees = [
    { id: 1, name: 'Jeimy Torres', role: 'Desarrolladora Frontend', salary: 1800, lastRevision: '2025-01-15' },
    { id: 2, name: 'Valentina Samaniego', role: 'Diseñadora UX/UI', salary: 1650, lastRevision: '2025-02-01' },
    { id: 3, name: 'Gabriela Loyola', role: 'Contadora Principal', salary: 2200, lastRevision: '2024-12-10' },
    { id: 4, name: 'Erick Rodas', role: 'Líder de Proyecto', salary: 2500, lastRevision: '2025-01-15' }
  ];
}