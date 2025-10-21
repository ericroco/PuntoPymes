import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesitamos FormsModule para los inputs
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Añadimos FormsModule
  ],
  templateUrl: './timesheet.html',
  styleUrls: ['./timesheet.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class Timesheet {
  weekOf: string = '2025-10-20'; // Simula la semana actual
  projects = [
    { name: 'Proyecto A (Punto Pymes)', hours: [8, 8, 4, 8, 8, 0, 0] },
    { name: 'Soporte Interno', hours: [0, 0, 4, 0, 0, 0, 0] },
    { name: 'Capacitación (LMS)', hours: [0, 0, 0, 0, 0, 0, 0] }
  ];

  // Función para calcular el total de un proyecto
  getProjectTotal(project: any): number {
    return project.hours.reduce((a: number, b: number) => a + b, 0);
  }

  // Función para calcular el total de un día
  getDayTotal(dayIndex: number): number {
    return this.projects.reduce((total, project) => total + (project.hours[dayIndex] || 0), 0);
  }

  // Función para calcular el gran total
  getGrandTotal(): number {
    return this.projects.reduce((total, project) => total + this.getProjectTotal(project), 0);
  }
}