import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importar Spinner

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { PayrollService, BenefitStat } from '../../services/payroll'; // Importar Servicio

// Animaciones
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatCardModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule,
    SubpageHeader
  ],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss'],
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
export class Benefits implements OnInit {
  // Inyecciones
  private payrollService = inject(PayrollService);
  private router = inject(Router);
  public dialog = inject(MatDialog);

  // Variables
  availableBenefits: BenefitStat[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadBenefitsData();
  }

  loadBenefitsData() {
    this.isLoading = true;
    this.payrollService.getBenefitsStats().subscribe({
      next: (data) => {
        console.log('Beneficios cargados:', data);
        this.availableBenefits = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando beneficios:', err);
        this.isLoading = false;
        // Aquí podrías mostrar un MatSnackBar con el error
      }
    });
  }

  // Calcula el porcentaje de adopción
  getAdoptionRate(benefit: BenefitStat): number {
    if (!benefit.totalEmployees || benefit.totalEmployees === 0) return 0;
    return (benefit.assignedCount / benefit.totalEmployees) * 100;
  }

  // Navegación
  goToViewAssigned(benefit: BenefitStat): void {
    // Navegamos a la pantalla de asignación (reutilizamos la ruta para ver/editar)
    this.router.navigate(['/dashboard/benefits/assign', benefit.id]);
  }
}