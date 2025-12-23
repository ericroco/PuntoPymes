import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para feedback
import { RouterModule } from '@angular/router'; // Para navegar a editar/crear
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// 👇 Importamos el servicio y la interfaz
import { ProductivityService, Encuesta } from '../../services/productivity';
import { CreateSurveyDialogComponent } from '../../components/create-survey-dialog/create-survey-dialog';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, RouterModule, MatDialogModule],
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
        // Mapeamos los datos si necesitamos calcular algo extra, 
        // o usamos el helper en el HTML
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

  deleteSurvey(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta encuesta? Se perderán los resultados.')) return;

    this.productivityService.deleteSurvey(id).subscribe({
      next: () => {
        this.snackBar.open('Encuesta eliminada', 'Cerrar', { duration: 3000 });
        this.loadSurveys(); // Recargar lista
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar')
    });
  }

  // Helper para el HTML
  getTotalVotes(survey: Encuesta): number {
    return this.productivityService.countVotes(survey);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateSurveyDialogComponent, {
      width: '500px',
      disableClose: true // Obliga a usar cancelar o guardar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si se creó con éxito (devolvió true), recargamos la lista
        this.loadSurveys();
      }
    });
  }
}