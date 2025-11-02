import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
// Importaciones de CDK Drag & Drop
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// Importaciones de Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// Importaciones de Componentes Compartidos y Modales
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header'; // Asegúrate que el nombre y ruta sean correctos
import { ConfigurePhasesDialog } from '../../components/configure-phases-dialog/configure-phases-dialog';
import { CandidateProfileDialog } from '../../components/candidate-profile-dialog/candidate-profile-dialog';
import { HireCandidateDialog } from '../../components/hire-candidate-dialog/hire-candidate-dialog';
import { RejectCandidateDialog } from '../../components/reject-candidate-dialog/reject-candidate-dialog';

// --- Interfaces ---
interface Candidate {
  id: number;
  name: string;
  avatar: string;
  currentRole: string;
  aiMatch: number;
  aiReason: string;
  phaseId: string;
}
interface PipelinePhase {
  id: string;
  name: string;
  candidates: Candidate[];
}

@Component({
  selector: 'app-vacancy-pipeline',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SubpageHeader,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './vacancy-pipeline.html',
  styleUrls: ['./vacancy-pipeline.scss']
})
export class VacancyPipeline implements OnInit {
  // --- Propiedades ---
  isDraggingCandidate: boolean = false; // Controla la visibilidad de la zona de rechazo
  vacancyId: string | null = null;
  vacancyTitle: string = "Cargando...";
  pipelinePhases: PipelinePhase[] = [];

  // Array vacío solo para propósitos de tipado del CDK
  rejectZoneData: Candidate[] = [];
  searchTerm: string = '';
  selectedAiMatch: number = 0; // 0 significa "Todos"

  // Esta lista SÍ se modifica
  filteredPipelinePhases: PipelinePhase[] = [];
  // Esta lista NUNCA se modifica, es la fuente original
  private allPipelinePhases: PipelinePhase[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  get connectedDropLists(): string[] {
    const lists = this.pipelinePhases.map(p => p.id);
    lists.push('reject-zone');
    return lists;
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');
    console.log("Cargando pipeline para Vacante ID:", this.vacancyId);

    // --- Simulación de Datos ---
    this.vacancyTitle = "Desarrollador Frontend Senior";

    const phases = [
      { id: 'fase-1-revision', name: 'Fase 1: Revisión CV' },
      { id: 'fase-2-entrevista-rrhh', name: 'Fase 2: Entrevista RRHH' },
      { id: 'fase-3-prueba-tecnica', name: 'Fase 3: Prueba Técnica' },
      { id: 'fase-4-entrevista-final', name: 'Fase 4: Entrevista Final' },
    ];
    const allCandidates: Candidate[] = [
      { id: 1, name: 'Ana Gómez', avatar: 'https://i.pravatar.cc/40?u=ana', currentRole: 'Frontend Dev @ Acme', aiMatch: 95, aiReason: '...', phaseId: 'fase-1-revision' },
      { id: 2, name: 'Carlos Díaz', avatar: 'https://i.pravatar.cc/40?u=carlos', currentRole: 'React Developer', aiMatch: 75, aiReason: '...', phaseId: 'fase-1-revision' },
      { id: 3, name: 'Lucía Fernández', avatar: 'https://i.pravatar.cc/40?u=lucia', currentRole: 'Fullstack Dev', aiMatch: 88, aiReason: '...', phaseId: 'fase-1-revision' },
      { id: 4, name: 'Marcos Solís', avatar: 'https://i.pravatar.cc/40?u=marcos', currentRole: 'Frontend Dev @ TechCorp', aiMatch: 92, aiReason: '...', phaseId: 'fase-2-entrevista-rrhh' },
    ];
    this.pipelinePhases = phases.map(phase => ({
      ...phase,
      candidates: allCandidates.filter(c => c.phaseId === phase.id)
    }));

    this.pipelinePhases.push({
      id: 'fase-contratado',
      name: 'Contratado',
      candidates: allCandidates.filter(c => c.phaseId === 'fase-contratado')
    });
    this.allPipelinePhases = JSON.parse(JSON.stringify(this.pipelinePhases)); // Copia profunda
    this.applyFilters(); // Aplica filtros iniciales (ninguno)
  }

  // Se llama cuando el usuario EMPIEZA a arrastrar
  onDragStarted(): void {
    this.isDraggingCandidate = true;
  }

  // Se llama cuando el usuario SUELTA (en cualquier lugar)
  onDragEnded(): void {
    this.isDraggingCandidate = false;
  }

  // Se llama si se suelta en una COLUMNA KANBAN
  drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const candidate = event.previousContainer.data[event.previousIndex];
      const targetContainerId = event.container.id;

      if (targetContainerId === 'fase-contratado') {
        this.handleHireCandidate(candidate, event);
      } else {
        this.moveCandidate(candidate, targetContainerId, event);
      }
    }
  }

  // Se llama si se suelta en la ZONA DE RECHAZO
  dropOnRejectZone(event: CdkDragDrop<Candidate[]>) {
    console.log('🗑️ DROP EN REJECT ZONE', event);
    const candidate = event.previousContainer.data[event.previousIndex];
    console.log(`Rechazo iniciado para: ${candidate.name}`);
    this.handleRejectCandidate(candidate, event);
  }

  // --- Funciones Helper ---

  moveCandidate(candidate: Candidate, targetPhaseId: string, event: CdkDragDrop<Candidate[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    candidate.phaseId = targetPhaseId;
    const targetPhaseName = this.pipelinePhases.find(p => p.id === targetPhaseId)?.name || targetPhaseId;
    console.log(`Candidato ${candidate.name} movido a la fase: ${targetPhaseName}`);
    // --- TODO: Llamar API para guardar el cambio de fase ---
  }

  handleHireCandidate(candidate: Candidate, event: CdkDragDrop<Candidate[]>) {
    const hireDialogRef = this.dialog.open(HireCandidateDialog, {
      width: '500px',
      disableClose: true,
      data: { candidateName: candidate.name }
    });

    hireDialogRef.afterClosed().subscribe(hireResult => {
      if (hireResult) {
        console.log(`Contratando a ${candidate.name}, Plan Onboarding: ${hireResult.onboardingTemplateId}`);
        this.moveCandidate(candidate, 'fase-contratado', event);
        // --- TODO: Llamar API para CONVERTIR CANDIDATO A EMPLEADO ---
        // --- TODO: Llamar API para ASIGNAR PLAN ONBOARDING ---
      } else {
        console.log('Contratación cancelada.');
      }
    });
  }

  handleRejectCandidate(candidate: Candidate, event: CdkDragDrop<Candidate[]>) {
    const rejectDialogRef = this.dialog.open(RejectCandidateDialog, {
      width: '500px',
      disableClose: true,
      data: { candidateName: candidate.name }
    });

    rejectDialogRef.afterClosed().subscribe(rejectResult => {
      if (rejectResult) {
        console.log(`Rechazando a ${candidate.name}, Motivo: ${rejectResult.reason}, Enviar Email: ${rejectResult.sendEmail}`);
        const sourceList = event.previousContainer.data;
        sourceList.splice(event.previousIndex, 1);
        // --- TODO: Llamar API para marcar como RECHAZADO ---
      } else {
        console.log('Rechazo cancelado.');
      }
    });
  }

  // --- Funciones de Acciones (Botones de la UI) ---

  openConfigurePhases(): void {
    const dialogRef = this.dialog.open(ConfigurePhasesDialog, {
      width: '600px',
      disableClose: true,
      data: {
        currentPhases: this.pipelinePhases.map(p => ({ id: p.id, name: p.name }))
      }
    });
    dialogRef.afterClosed().subscribe(newPhases => {
      if (newPhases) {
        console.log('Fases guardadas:', newPhases);
        this.pipelinePhases = newPhases.map((newPhase: PipelinePhase) => {
          const oldPhase = this.pipelinePhases.find(p => p.id === newPhase.id);
          return { ...newPhase, candidates: oldPhase ? oldPhase.candidates : [] };
        });
      }
    });
  }

  openAddCandidate(): void {
    console.log('Abrir modal para añadir candidato manualmente');
    // --- TODO: Implementar modal de añadir candidato ---
  }

  openCandidateProfile(candidate: Candidate): void {
    const dialogRef = this.dialog.open(CandidateProfileDialog, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '85vh',
      disableClose: false,
      data: { candidate: candidate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'move_next') {
        console.log('Comando recibido: Mover a siguiente fase');

        const currentPhaseIndex = this.pipelinePhases.findIndex(p => p.id === candidate.phaseId);
        if (currentPhaseIndex === -1) return;

        const nextPhaseIndex = currentPhaseIndex + 1;

        if (nextPhaseIndex < this.pipelinePhases.length) {
          const currentPhase = this.pipelinePhases[currentPhaseIndex];
          const nextPhase = this.pipelinePhases[nextPhaseIndex];
          const candidateIndexInPhase = currentPhase.candidates.findIndex(c => c.id === candidate.id);
          if (candidateIndexInPhase === -1) return;

          const mockEvent = {
            previousContainer: { data: currentPhase.candidates },
            container: { data: nextPhase.candidates, id: nextPhase.id },
            previousIndex: candidateIndexInPhase,
            currentIndex: 0
          } as CdkDragDrop<Candidate[]>;

          this.drop(mockEvent);
        } else {
          console.log("El candidato ya está en la última fase.");
        }
      }
    });
  }
  applyFilters(): void {
    // 1. Empieza con la lista original completa
    let tempPhases = JSON.parse(JSON.stringify(this.allPipelinePhases)) as PipelinePhase[];
    const lowerSearch = this.searchTerm.toLowerCase();

    // 2. Filtra los *candidatos* DENTRO de cada fase
    tempPhases.forEach(phase => {
      phase.candidates = phase.candidates.filter(candidate => {
        // Condición de Búsqueda (Nombre o Cargo)
        const matchesSearch = this.searchTerm === '' ||
          candidate.name.toLowerCase().includes(lowerSearch) ||
          candidate.currentRole.toLowerCase().includes(lowerSearch);

        // Condición de Puntuación IA
        const matchesAiScore = this.selectedAiMatch === 0 ||
          candidate.aiMatch >= this.selectedAiMatch;

        return matchesSearch && matchesAiScore;
      });
    });

    // 3. Actualiza la lista que se muestra en el HTML
    this.filteredPipelinePhases = tempPhases;
  }
}