import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

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
    MatProgressBarModule
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
}