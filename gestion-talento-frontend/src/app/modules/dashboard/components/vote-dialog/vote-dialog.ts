import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio'; // 👈 Necesario para elegir
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductivityService } from '../../services/productivity';

@Component({
  selector: 'app-vote-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.encuesta.titulo }}</h2>
    
    <mat-dialog-content>
      <p class="desc" *ngIf="data.encuesta.descripcion">{{ data.encuesta.descripcion }}</p>
      
      <div class="options-container">
        <mat-radio-group [(ngModel)]="selectedOptionId" class="radio-group">
          <mat-radio-button *ngFor="let op of data.encuesta.opciones" [value]="op.id">
            {{ op.texto }}
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancelar</button>
      <button mat-flat-button color="primary" 
              [disabled]="!selectedOptionId || isSubmitting" 
              (click)="submitVote()">
        {{ isSubmitting ? 'Enviando...' : 'Votar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .radio-group { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
    .desc { color: #666; font-size: 0.9rem; margin-bottom: 15px; }
  `]
})
export class VoteDialogComponent {
  private productivityService = inject(ProductivityService);
  private dialogRef = inject(MatDialogRef<VoteDialogComponent>);
  private snackBar = inject(MatSnackBar);

  selectedOptionId: string | null = null;
  isSubmitting = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { encuesta: any }) { }

  submitVote() {
    if (!this.selectedOptionId) return;

    this.isSubmitting = true;

    // Llamamos al servicio que creamos en el Paso 1
    this.productivityService.votarEncuesta(this.data.encuesta.id, this.selectedOptionId).subscribe({
      next: () => {
        this.snackBar.open('¡Voto registrado!', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Retornamos true para indicar éxito
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al votar. Intenta de nuevo.', 'Cerrar');
        this.isSubmitting = false;
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}