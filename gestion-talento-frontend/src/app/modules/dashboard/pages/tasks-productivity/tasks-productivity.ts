import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-tasks-productivity',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tasks-productivity.html',
  styleUrls: ['./tasks-productivity.scss'],
  animations: [
    trigger('cardStagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('75ms',
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class TasksProductivity {
  tasks = [
    { title: 'Diseñar la nueva pantalla de login', assignedTo: 'Valentina Samaniego', dueDate: '2025-10-20', priority: 'alta', status: 'en-progreso' },
    { title: 'Desarrollar API de autenticación', assignedTo: 'Jeimy Torres', dueDate: '2025-10-22', priority: 'alta', status: 'pendiente' },
    { title: 'Revisar reportes de contabilidad Q3', assignedTo: 'Gabriela Loyola', dueDate: '2025-10-18', priority: 'media', status: 'completada' },
    { title: 'Planificar el sprint de noviembre', assignedTo: 'Erick Rodas', dueDate: '2025-10-25', priority: 'baja', status: 'pendiente' },
    { title: 'Crear componentes reutilizables', assignedTo: 'Jeimy Torres', dueDate: '2025-10-28', priority: 'media', status: 'pendiente' },
  ];
}