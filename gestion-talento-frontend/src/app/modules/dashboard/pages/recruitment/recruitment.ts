import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Importar el servicio y la interfaz
import { RecruitmentService, Vacancy } from '../../services/recruitment';

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
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
export class Recruitment implements OnInit {
  private recruitmentService = inject(RecruitmentService);
  private snackBar = inject(MatSnackBar);

  // Usamos la interfaz real 'Vacancy'
  vacancies: Vacancy[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies() {
    this.isLoading = true;
    this.recruitmentService.getVacancies().subscribe({
      next: (data) => {
        console.log('Vacantes cargadas:', data);
        this.vacancies = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando vacantes:', err);
        this.isLoading = false;
      }
    });
  }

  // Función vinculada al botón de "Cerrar Vacante"
  onCloseVacancy(vacancy: Vacancy) {

    // 1. Validación previa para ahorrarle la petición al servidor
    if (vacancy.estado === 'BORRADOR') {
      this.snackBar.open('Error: No puedes cerrar un borrador. Debes publicarla primero.', 'Entendido');
      return;
    }

    // 2. Confirmación
    if (!confirm(`¿Cerrar vacante "${vacancy.titulo}"? Ya no recibirá candidatos.`)) {
      return;
    }

    this.isLoading = true;

    // 3. Llamamos a updateVacancy enviando SOLO el estado
    this.recruitmentService.updateVacancy(vacancy.id, { estado: 'CERRADA' }).subscribe({
      next: () => {
        this.snackBar.open('Vacante cerrada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadVacancies(); // Recargamos para ver el candado y el estado nuevo
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;

        // Manejamos el mensaje de error que viene de tu backend (BadRequestException)
        const msg = err.error?.message || 'Error al cerrar vacante';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
      }
    });
  }
}