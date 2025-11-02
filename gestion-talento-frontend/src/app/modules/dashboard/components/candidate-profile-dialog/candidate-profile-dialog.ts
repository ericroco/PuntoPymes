import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para el textarea de notas
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs'; // Para Pestañas
import { MatListModule } from '@angular/material/list'; // Para Historial
import { MatFormFieldModule } from '@angular/material/form-field'; // Para Notas
import { MatInputModule } from '@angular/material/input'; // Para Notas

// Re-usa la interfaz del padre
interface Candidate {
  id: number;
  name: string;
  avatar: string;
  currentRole: string;
  aiMatch: number;
  aiReason: string;
  phaseId: string;
}

@Component({
  selector: 'app-candidate-profile-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatTabsModule, MatListModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './candidate-profile-dialog.html',
  styleUrls: ['./candidate-profile-dialog.scss']
})
export class CandidateProfileDialog {
  candidate: Candidate;
  newNote: string = ''; // Para el campo de nueva nota

  // Datos simulados (en una app real, esto vendría con el candidato)
  candidateDetails = {
    email: 'ana.gomez@ejemplo.com',
    phone: '0987654321',
    linkedin: 'linkedin.com/in/anagomez',
    skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'Jest'],
    cvUrl: 'assets/sample-cv.pdf' // URL de placeholder
  };
  activityHistory = [
    { date: '2025-10-30', action: 'Aplicó a la vacante' },
    { date: '2025-10-30', action: 'Análisis de IA completado (95%)' },
    { date: '2025-10-31', action: 'Movido a Fase 2: Entrevista RRHH' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CandidateProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { candidate: Candidate }
  ) {
    this.candidate = data.candidate;
    // --- TODO: Cargar 'candidateDetails' y 'activityHistory' desde la API usando candidate.id ---
  }

  onClose(): void {
    this.dialogRef.close();
  }

  addNote(): void {
    if (this.newNote.trim()) {
      // Simulación local
      this.activityHistory.unshift({ // Añade al principio
        date: new Date().toISOString().split('T')[0],
        action: `Nota añadida: "${this.newNote.trim()}"`
      });
      console.log('Guardando nota:', this.newNote);
      this.newNote = ''; // Limpiar el campo
      // --- TODO: Llamar API para guardar la nota en el backend ---
    }
  }

  // Placeholder para acciones del modal
  moveToNextPhase(): void {
    // Cierra el modal y devuelve un string 'move_next' como resultado
    this.dialogRef.close('move_next');
  }
}