import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Encuesta } from '../../services/productivity';

@Component({
    selector: 'app-survey-results-dialog',
    standalone: true,
    imports: [
        CommonModule, MatDialogModule, MatButtonModule,
        MatIconModule, MatProgressBarModule
    ],
    template: `
    <h2 mat-dialog-title>
      <mat-icon>poll</mat-icon> Resultados: {{ data.titulo }}
    </h2>
    
    <mat-dialog-content>
      <div class="stats-summary" style="margin-bottom: 20px; display: flex; gap: 20px; color: #666;">
        <div class="stat-item">
            <strong>Total Votos:</strong> {{ totalVotes }}
        </div>
        <div class="stat-item">
            <strong>Estado:</strong> 
            <span [style.color]="data.activa ? 'green' : 'red'">
                {{ data.activa ? 'Abierta' : 'Finalizada' }}
            </span>
        </div>
      </div>

      <div class="results-list">
        <div *ngFor="let op of data.opciones" class="result-item" style="margin-bottom: 15px;">
          
          <div class="result-header" style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
            <span class="op-text" style="font-weight: 500;">{{ op.texto }}</span>
            <span class="op-count" style="color: #555;">{{ op.votos || 0 }} ({{ getPercentage(op.votos) }}%)</span>
          </div>

          <mat-progress-bar 
            mode="determinate" 
            [value]="getPercentage(op.votos)"
            style="height: 10px; border-radius: 5px;"
            [color]="getColor(getPercentage(op.votos))">
          </mat-progress-bar>
        
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="primary">Cerrar</button>
    </mat-dialog-actions>
  `
})
export class SurveyResultsDialogComponent {
    totalVotes = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Encuesta) {
        // Calcular total de votos
        this.totalVotes = this.data.opciones?.reduce((acc, op) => acc + (op.votos || 0), 0) || 0;
    }

    getPercentage(votos: number): number {
        if (!this.totalVotes || this.totalVotes === 0) return 0;
        return Math.round((votos / this.totalVotes) * 100);
    }

    // Color dinámico según popularidad (opcional)
    getColor(percentage: number): string {
        if (percentage > 50) return 'accent'; // Ganador
        return 'primary';
    }
}