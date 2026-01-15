import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductivityService, Encuesta } from '../../services/productivity';
import { CreateSurveyDialogComponent } from '../../components/create-survey-dialog/create-survey-dialog';
import { SurveyResultsDialogComponent } from '../../components/survey-results-dialog/survey-results-dialog';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [
    CommonModule, MatSnackBarModule, RouterModule,
    MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './surveys.html',
  styleUrls: ['./surveys.scss'],
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
export class Surveys implements OnInit {
  private productivityService = inject(ProductivityService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  surveys: Encuesta[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadSurveys();
  }

  loadSurveys() {
    this.isLoading = true;
    this.productivityService.getAllSurveys().subscribe({
      next: (data) => {
        this.surveys = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al cargar encuestas', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  // ELIMINAR
  deleteSurvey(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta encuesta? Se perderán los resultados.')) return;

    this.productivityService.deleteSurvey(id).subscribe({
      next: () => {
        this.snackBar.open('Encuesta eliminada', 'Cerrar', { duration: 3000 });
        this.loadSurveys();
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar')
    });
  }

  // EDITAR ESTADO (Abrir/Cerrar)
  toggleStatus(survey: Encuesta) {
    this.productivityService.toggleSurveyStatus(survey.id, survey.activa).subscribe({
      next: (updatedSurvey) => {
        // Actualizamos localmente para feedback inmediato
        survey.activa = updatedSurvey.activa;
        const statusMsg = survey.activa ? 'activada' : 'cerrada';
        this.snackBar.open(`Encuesta ${statusMsg} correctamente`, 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al cambiar estado', 'Cerrar')
    });
  }

  // VER RESULTADOS
  openResults(survey: Encuesta) {
    this.dialog.open(SurveyResultsDialogComponent, {
      width: '600px',
      data: survey // Pasamos la encuesta completa
    });
  }

  // CREAR
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateSurveyDialogComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadSurveys();
      }
    });
  }

  getTotalVotes(survey: Encuesta): number {
    return this.productivityService.countVotes(survey);
  }
}