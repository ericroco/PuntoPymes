import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-catalog.html',
  styleUrls: ['./course-catalog.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
          stagger('80ms',
            animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class CourseCatalog {
  courses = [
    { title: 'Liderazgo para Nuevos Mánagers', category: 'Habilidades Blandas', duration: '8 horas', instructor: 'Ana Martínez', image: 'assets/images/course_leadership.png' },
    { title: 'Fundamentos de Finanzas Corporativas', category: 'Finanzas', duration: '12 horas', instructor: 'Carlos Vera', image: 'assets/images/course_finance.png' },
    { title: 'Marketing Digital y SEO Avanzado', category: 'Marketing', duration: '15 horas', instructor: 'Sofía Endara', image: 'assets/images/course_marketing.png' },
    { title: 'Gestión Ágil con Scrum', category: 'Tecnología', duration: '10 horas', instructor: 'David Ortiz', image: 'assets/images/course_scrum.png' }
  ];
}