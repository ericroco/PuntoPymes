import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Usaremos [(ngModel)] para los inputs
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// CDK Drag & Drop
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// Interface para una Fase (simplificada)
interface PipelinePhase {
  id: string;
  name: string;
}

@Component({
  selector: 'app-configure-phases-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Importa FormsModule
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    DragDropModule // <-- Importa DragDropModule
  ],
  templateUrl: './configure-phases-dialog.html',
  styleUrls: ['./configure-phases-dialog.scss']
})
export class ConfigurePhasesDialog implements OnInit {

  phases: PipelinePhase[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfigurePhasesDialog>,
    // Inyectamos las fases actuales que nos pasa el componente padre
    @Inject(MAT_DIALOG_DATA) public data: { currentPhases: PipelinePhase[] }
  ) {
    // --- IMPORTANTE: Creamos una copia profunda (deep copy) ---
    // Esto asegura que si el usuario da "Cancelar", los cambios no se reflejen
    // en el tablero de vacantes.
    this.phases = JSON.parse(JSON.stringify(data.currentPhases || []));
  }

  ngOnInit(): void {}

  // --- Funciones de Gestión de Fases ---

  // Añade una nueva fase al final (antes de "Contratado")
  addPhase(): void {
    const newPhase: PipelinePhase = {
      id: `new-phase-${Date.now()}`, // ID temporal
      name: 'Nueva Fase'
    };
    
    // Inserta la nueva fase *antes* de la última ("Contratado")
    const lastIndex = this.phases.length - 1;
    this.phases.splice(lastIndex, 0, newPhase); 
  }

  // Elimina una fase (protegiendo la primera y la última)
  removePhase(index: number): void {
    // No permitimos eliminar la primera ("Revisión CV") ni la última ("Contratado")
    if (index === 0 || index === this.phases.length - 1) {
      console.warn('No se puede eliminar la primera o última fase.');
      return; 
    }
    this.phases.splice(index, 1);
  }

  // Maneja el reordenamiento con Drag & Drop
  dropPhase(event: CdkDragDrop<PipelinePhase[]>) {
    // Mueve la fase en nuestro array local
    moveItemInArray(this.phases, event.previousIndex, event.currentIndex);
  }

  // --- Botones del Modal ---

  onCancel(): void {
    this.dialogRef.close(); // Cierra sin devolver nada
  }

  onSave(): void {
    // Validar que no haya nombres vacíos (opcional pero recomendado)
    const isValid = this.phases.every(p => p.name.trim() !== '');
    if (!isValid) {
       alert('Todas las fases deben tener un nombre.');
       return;
    }
    // Devuelve el array de fases modificado
    this.dialogRef.close(this.phases);
  }
}