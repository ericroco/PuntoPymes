import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger('100ms',
            animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class Benefits {
  benefits = [
    { title: 'Seguro Médico Privado', category: 'Salud', description: 'Cobertura completa para el empleado y sus dependientes directos.', employeesEnrolled: 82, provider: 'Salud S.A.' },
    { title: 'Vales de Alimentación', category: 'Bienestar', description: 'Tarjeta de alimentación con un valor mensual de $80.', employeesEnrolled: 95, provider: 'Sodexo' },
    { title: 'Plan de Gimnasio', category: 'Bienestar', description: 'Acceso a una red de gimnasios afiliados a nivel nacional.', employeesEnrolled: 45, provider: 'Gym Network' },
    { title: 'Días de Vacaciones Adicionales', category: 'Flexibilidad', description: '5 días de vacaciones adicionales por año de antigüedad.', employeesEnrolled: 95, provider: 'Política Interna' }
  ];
}