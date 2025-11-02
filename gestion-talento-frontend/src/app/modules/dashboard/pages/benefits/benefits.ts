import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importar Router
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // Para las tarjetas
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Para la barra de adopción
import { MatTooltipModule } from '@angular/material/tooltip';

// Cabecera
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
// Animaciones
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Interface para un Beneficio (Item Recurrente)
interface Benefit {
  id: number;
  name: string;
  type: 'Ingreso' | 'Descuento';
  // Datos de Adopción (vendrían de la API)
  assignedCount: number;
  totalEmployees: number; // Total de empleados en la empresa
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatCardModule, MatProgressBarModule, MatTooltipModule, SubpageHeader
  ],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss'],
  animations: [ // Reutilizamos la animación de 'listAnimation'
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
export class Benefits implements OnInit {

  availableBenefits: Benefit[] = [];
  totalEmployees: number = 74; // Simulación del total

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // --- TODO: Cargar desde la API ---
    // 1. Obtener el total de empleados de la empresa.
    // 2. Obtener la lista de items de 'settings/payroll' que son 'isRecurring: true'.
    // 3. Para cada item, obtener el recuento de cuántos empleados lo tienen asignado.
    
    // --- Simulación de Datos ---
    this.availableBenefits = [
      { id: 4, name: 'Aporte Seguro Médico Privado', type: 'Descuento', assignedCount: 68, totalEmployees: this.totalEmployees },
      { id: 5, name: 'Plan de Gimnasio', type: 'Descuento', assignedCount: 45, totalEmployees: this.totalEmployees },
      { id: 6, name: 'Bono de Antigüedad', type: 'Ingreso', assignedCount: 32, totalEmployees: this.totalEmployees },
      { id: 7, name: 'Plan Celular', type: 'Ingreso', assignedCount: 15, totalEmployees: this.totalEmployees }
    ];
  }

  // Calcula el porcentaje de adopción
  getAdoptionRate(benefit: Benefit): number {
    if (benefit.totalEmployees === 0) return 0;
    return (benefit.assignedCount / benefit.totalEmployees) * 100;
  }

  // --- Funciones de Navegación (Placeholders por ahora) ---
  

  // Navega a una página para ver/gestionar la lista de empleados de este beneficio
  goToViewAssigned(benefit: Benefit): void {
    console.log('Navegando a la lista de empleados asignados para:', benefit.name);
    // --- TODO: Crear la página 'benefits/view/:id' y navegar a ella ---
  }
}