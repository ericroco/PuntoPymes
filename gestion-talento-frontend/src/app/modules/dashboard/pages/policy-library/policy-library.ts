import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-policy-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-library.html',
  styleUrls: ['./policy-library.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger('75ms',
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class PolicyLibrary {
  policies = [
    { title: 'Manual del Empleado', version: '3.1', lastUpdated: '2025-09-01', category: 'General', status: 'Activo' },
    { title: 'Política de Teletrabajo', version: '1.5', lastUpdated: '2025-10-20', category: 'Operaciones', status: 'Activo' },
    { title: 'Código de Conducta Ética', version: '2.0', lastUpdated: '2025-01-10', category: 'Legal', status: 'Activo' },
    { title: 'Política de Vacaciones (Borrador)', version: '1.0b', lastUpdated: '2025-10-15', category: 'RRHH', status: 'Borrador' }
  ];
}