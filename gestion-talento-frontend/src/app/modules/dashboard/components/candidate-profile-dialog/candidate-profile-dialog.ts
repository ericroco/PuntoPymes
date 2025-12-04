import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

// Importamos la interfaz REAL del servicio
import { Candidate } from '../../services/recruitment';

@Component({
  selector: 'app-candidate-profile-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatTabsModule, MatListModule, MatFormFieldModule, MatInputModule,
    MatDividerModule
  ],
  templateUrl: './candidate-profile-dialog.html',
  styleUrls: ['./candidate-profile-dialog.scss']
})
export class CandidateProfileDialog {
  candidate: Candidate;
  newNote: string = '';

  // Simulación de historial (Ya que el backend aún no tiene tabla de notas/historial para candidatos)
  activityHistory = [
    { date: new Date().toISOString(), action: 'Postulación recibida' },
    { date: new Date().toISOString(), action: 'Análisis de IA completado' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CandidateProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { candidate: Candidate }
  ) {
    this.candidate = data.candidate;

    // Si el candidato tiene fecha de postulación real, actualizamos el historial visual
    if (this.candidate.fechaPostulacion) {
      this.activityHistory[0].date = this.candidate.fechaPostulacion;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // Helper para color del score
  getScoreColor(score?: number): string {
    if (!score) return '';
    if (score >= 90) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
  }

  // Helper para iniciales
  getInitials(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  addNote(): void {
    if (this.newNote.trim()) {
      // Simulación local (Para persistir esto necesitaríamos un endpoint POST /candidatos/:id/notas)
      this.activityHistory.unshift({
        date: new Date().toISOString(),
        action: `Nota: "${this.newNote.trim()}"`
      });
      this.newNote = '';
    }
  }

  moveToNextPhase(): void {
    this.dialogRef.close('move_next');
  }
}