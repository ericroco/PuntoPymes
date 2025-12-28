import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

// Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { ConfigurePhasesDialog } from '../../components/configure-phases-dialog/configure-phases-dialog';
import { CandidateProfileDialog } from '../../components/candidate-profile-dialog/candidate-profile-dialog';
import { HireCandidateDialog } from '../../components/hire-candidate-dialog/hire-candidate-dialog';
import { RejectCandidateDialog } from '../../components/reject-candidate-dialog/reject-candidate-dialog';

import { RecruitmentService, Candidate, Vacancy } from '../../services/recruitment';

// Interfaces Locales para el Kanban
interface PipelinePhase {
  id: string;
  name: string;
  candidates: Candidate[];
}

@Component({
  selector: 'app-vacancy-pipeline',
  standalone: true,
  imports: [
    CommonModule, RouterModule, DragDropModule, MatDialogModule, MatButtonModule,
    MatIconModule, MatTooltipModule, SubpageHeader, FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule
  ],
  templateUrl: './vacancy-pipeline.html',
  styleUrls: ['./vacancy-pipeline.scss']
})
export class VacancyPipeline implements OnInit {
  private recruitmentService = inject(RecruitmentService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  // Datos
  vacancyId: string | null = null;
  vacancy: Vacancy | null = null;
  isLoading = true;

  getScoreColor(score?: number): string {
    if (!score) return '#ccc';
    if (score >= 80) return '#4caf50'; // Verde
    if (score >= 50) return '#ff9800'; // Naranja
    return '#f44336'; // Rojo
  }
  // Kanban
  isDraggingCandidate = false;
  rejectZoneData: Candidate[] = []; // Placeholder para CDK

  // Fases del Pipeline (Mapeadas a Estados del Backend)
  // Nota: El backend usa: NUEVO, REVISION, ENTREVISTA, OFERTA, CONTRATADO, RECHAZADO
  pipelinePhases: PipelinePhase[] = [
    { id: 'NUEVO', name: 'Nuevos / IA Review', candidates: [] },
    { id: 'ENTREVISTA', name: 'Entrevista', candidates: [] },
    { id: 'OFERTA', name: 'Oferta', candidates: [] },
    { id: 'CONTRATADO', name: 'Contratado', candidates: [] }
  ];

  // Filtros
  searchTerm = '';
  selectedAiMatch = 0;

  // Copia de respaldo para filtrar
  private allCandidates: Candidate[] = [];

  get connectedDropLists(): string[] {
    const lists = this.pipelinePhases.map(p => p.id);
    lists.push('reject-zone');
    return lists;
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');
    if (this.vacancyId) {
      this.loadData(this.vacancyId);
    }
  }

  loadData(id: string) {
    this.isLoading = true;

    // 1. Cargar Vacante
    this.recruitmentService.getVacancyById(id).subscribe(v => this.vacancy = v);

    // 2. Cargar Candidatos
    this.recruitmentService.getCandidates(id).subscribe({
      next: (data) => {
        console.log('Candidatos reales:', data);
        this.allCandidates = data;
        this.distributeCandidates(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Distribuye los candidatos en las columnas según su estado
  distributeCandidates(candidates: Candidate[]) {
    // Limpiar columnas
    this.pipelinePhases.forEach(p => p.candidates = []);

    candidates.forEach(c => {
      // Mapeo simple: Si el estado del backend coincide con una columna, lo ponemos ahí
      // Si es REVISION lo ponemos en NUEVO por ahora
      let targetId = c.estado;
      if (targetId === 'REVISION' || targetId === 'ANALIZANDO_IA') targetId = 'NUEVO';

      const phase = this.pipelinePhases.find(p => p.id === targetId);
      if (phase) {
        phase.candidates.push(c);
      }
    });
  }

  // --- Drag & Drop Logic ---

  onDragStarted() { this.isDraggingCandidate = true; }
  onDragEnded() { this.isDraggingCandidate = false; }

  drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const candidate = event.previousContainer.data[event.previousIndex];
      const targetPhaseId = event.container.id;

      if (targetPhaseId === 'CONTRATADO') {
        this.handleHireCandidate(candidate, event);
      } else {
        this.moveCandidate(candidate, targetPhaseId, event);
      }
    }
  }

  dropOnRejectZone(event: CdkDragDrop<Candidate[]>) {
    const candidate = event.previousContainer.data[event.previousIndex];
    this.handleRejectCandidate(candidate, event);
  }

  // Mover y Actualizar en Backend
  moveCandidate(candidate: Candidate, targetState: string, event: CdkDragDrop<Candidate[]>) {
    // 1. Mover visualmente
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // 2. Llamar al API
    // Nota: Necesitas un método updateCandidateStatus en el servicio.
    // Si no existe, lo simulamos o usamos createCandidate con upsert? 
    // Lo ideal es tener PATCH /candidatos/:id/estado
    // Asumiremos que RecruitmentService tiene updateCandidateStatus(id, status)
    // Si no, agrégalo al servicio.

    console.log(`Moviendo ${candidate.nombre} a ${targetState}`);
    // this.recruitmentService.updateCandidateStatus(candidate.id, targetState).subscribe(); 
  }

  handleHireCandidate(candidate: Candidate, event: CdkDragDrop<Candidate[]>) {
    const dialogRef = this.dialog.open(HireCandidateDialog, {
      width: '500px',
      data: { candidateName: candidate.nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moveCandidate(candidate, 'CONTRATADO', event);
        this.snackBar.open('Candidato marcado como contratado', 'Cerrar', { duration: 3000 });
        // Aquí llamarías al API para crear el empleado automáticamente si quisieras
      }
    });
  }
  // En pipeline.component.ts

  handleRejectCandidate(candidate: Candidate, event: CdkDragDrop<Candidate[]> | null) {

    // 1. VALIDACIÓN SEGURA: Usamos 'this.vacancyId' que ya obtuviste en el ngOnInit
    if (!this.vacancyId) {
      console.error('Error crítico: No se encontró el ID de la vacante.');
      return;
    }

    // Guardamos el ID en una constante para asegurar que no sea null dentro del subscribe
    const idParaRechazar = this.vacancyId;

    const dialogRef = this.dialog.open(RejectCandidateDialog, {
      width: '500px',
      data: { candidateName: candidate.nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const motivo = typeof result === 'string' ? result : result.motivo;

        // 2. Usamos 'idParaRechazar' en lugar de 'this.vacancy.id'
        this.recruitmentService.rejectCandidate(idParaRechazar, candidate.id, motivo)
          .subscribe({
            next: () => {
              this.snackBar.open('Candidato rechazado correctamente', 'Cerrar', { duration: 3000 });

              // Lógica visual (borrado)
              if (event) {
                // Si vino del Drag & Drop, lo borramos del array donde estaba
                event.previousContainer.data.splice(event.previousIndex, 1);
              } else {
                // Si vino del botón, lo buscamos y borramos
                this.removeCandidateFromList(candidate);
              }
            },
            error: (err) => {
              console.error(err);
              this.snackBar.open('Error al rechazar el candidato', 'Cerrar');

              // Opcional: Si falla y vino de Drag, podrías recargar para devolverlo a su sitio
              // if (event) this.loadData(idParaRechazar);
            }
          });
      }
      // Si cancela (else), no hacemos nada y Angular devuelve la tarjeta a su sitio solo.
    });
  }
  // Helper para borrar de la lista visualmente
  private removeCandidateFromList(candidate: Candidate) {
    for (const phase of this.pipelinePhases) {
      const index = phase.candidates.findIndex(c => c.id === candidate.id);
      if (index > -1) {
        phase.candidates.splice(index, 1);
        break;
      }
    }
  }

  // --- Acciones ---

  openAddCandidate() {
    // Por ahora podrías mostrar el link público para que lo usen
    alert(`Comparte este link: ${window.location.origin}/public/jobs/${this.vacancyId}`);
  }

  openConfigurePhases() {
    alert('Configuración de fases personalizada próximamente.');
  }

  openCandidateProfile(candidate: Candidate) {
    this.dialog.open(CandidateProfileDialog, {
      width: '800px',
      data: { candidate } // Pasa el objeto real
    });
  }

  applyFilters() {
    // Filtro local simple sobre allCandidates y redistribución
    let filtered = this.allCandidates.filter(c => {
      const matchName = !this.searchTerm || c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchScore = !this.selectedAiMatch || (c.aiScore || 0) >= this.selectedAiMatch;
      return matchName && matchScore;
    });
    this.distributeCandidates(filtered);
  }

  // Helpers visuales
  getAvatarInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}