import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-career-paths',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-paths.html',
  styleUrls: ['./career-paths.scss'],
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
export class CareerPaths {
  careerPaths = [
    { title: 'Ruta de Desarrollo Frontend', description: 'Progresión desde Junior a Senior Frontend Developer.', levels: 4, employeesAssigned: 12 },
    { title: 'Ruta de Gestión de Proyectos', desscription: 'Camino para Project Managers, desde Asociado a Director.', levels: 3, employeesAssigned: 5 },
    { title: 'Ruta de Liderazgo Técnico', description: 'Desarrollo para Tech Leads y Arquitectos.', levels: 3, employeesAssigned: 8 }
  ];
}