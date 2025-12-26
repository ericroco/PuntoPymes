import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
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
    MatSnackBarModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      
      <div class="dialog-header">
        <h2 mat-dialog-title>{{ data.encuesta.titulo }}</h2>
        <button mat-icon-button class="close-btn" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content class="custom-content custom-scroll">
        
        <div class="info-box" *ngIf="data.encuesta.descripcion">
          <mat-icon>poll</mat-icon>
          <p>{{ data.encuesta.descripcion }}</p>
        </div>
        
        <div class="options-container">
          <label class="field-label">Selecciona una opción:</label>
          
          <mat-radio-group [(ngModel)]="selectedOptionId" class="custom-radio-group">
            <mat-radio-button *ngFor="let op of data.encuesta.opciones" 
                              [value]="op.id" 
                              class="option-card"
                              [class.is-selected]="selectedOptionId === op.id">
              <span class="option-text">{{ op.texto }}</span>
            </mat-radio-button>
          </mat-radio-group>
        </div>

      </mat-dialog-content>

      <div class="dialog-footer">
        <button mat-flat-button class="btn-cancel" (click)="close()">
          Cancelar
        </button>
        <button mat-flat-button color="primary" class="btn-save" 
                [disabled]="!selectedOptionId || isSubmitting" 
                (click)="submitVote()">
          {{ isSubmitting ? 'Enviando...' : 'Confirmar Voto' }}
        </button>
      </div>

    </div>
  `,
  styles: [`
    // ==========================================================================
    // TALENTRACK - VOTE DIALOG
    // ==========================================================================

    // --- ESTRUCTURA PRINCIPAL ---
    .dialog-container {
      display: flex;
      flex-direction: column;
      width: 100%; // Usar 100% es más seguro que 100vw dentro de un overlay
      // AUMENTADO DE 500px A 700px PARA EVITAR SCROLL HORIZONTAL
      max-width: 700px; 
      background-color: var(--color-surface);
      box-sizing: border-box;
      max-height: 90vh;
    }

    // --- HEADER ---
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1.5rem 1rem;
      border-bottom: 1px solid var(--color-border-light);
      background-color: var(--color-surface);

      h2 {
        margin: 0;
        font-family: var(--font-family-base);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text-primary);
        line-height: 1.3;
      }

      .close-btn {
        color: var(--color-text-secondary);
        &:hover { background-color: var(--color-surface-variant); color: var(--color-text-primary); }
      }
    }

    // --- CONTENIDO ---
    .custom-content {
      padding: 1.5rem !important;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      overflow-y: auto;
      overflow-x: hidden; // Asegurar que no haya scroll horizontal interno
    }

    // INFO BOX (Descripción)
    .info-box {
      display: flex;
      gap: 12px;
      background-color: var(--color-info-light);
      padding: 12px 16px;
      border-radius: 12px;
      color: var(--color-text-primary);
      font-size: 0.9rem;
      line-height: 1.5;
      align-items: flex-start;
      border: 1px solid rgba(59, 130, 246, 0.15);

      mat-icon {
        color: var(--color-info);
        flex-shrink: 0;
      }
      
      p { margin: 0; }
    }

    // --- OPCIONES DE VOTO (Estilo Soft UI Cards) ---
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .field-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        margin-left: 4px;
      }
    }

    .custom-radio-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card {
      // Base: Gris suave (Soft UI)
      background-color: #F3F4F6; 
      border-radius: 12px;
      padding: 12px 16px;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      display: flex; // Asegura que el contenido se alinee bien
      align-items: center;

      // Texto
      .option-text {
        font-family: var(--font-family-base);
        font-size: 0.95rem;
        color: var(--color-text-primary);
        font-weight: 500;
      }

      // Hover
      &:hover {
        background-color: #E5E7EB; 
      }

      // Estado Seleccionado
      &.is-selected {
        background-color: white;
        border-color: var(--color-primary);
        box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.15);
        
        .option-text {
          color: var(--color-primary);
          font-weight: 600;
        }
      }

      // Ajustes internos de Material Radio
      ::ng-deep .mdc-form-field {
        width: 100%;
        display: flex;
        align-items: center;
      }
      
      ::ng-deep .mdc-radio {
        padding: 0 12px 0 0; // Espaciado del círculo
        flex-shrink: 0;
      }
    }

    // --- FOOTER (Pill Buttons) ---
    .dialog-footer {
      padding: 1rem 1.5rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid var(--color-border-light);
      background-color: var(--color-surface);

      // Botón Cancelar
      .btn-cancel {
        background-color: #F1F5F9 !important; 
        color: var(--color-text-secondary) !important;
        border-radius: 999px !important; // Pill Shape
        height: 44px;
        padding: 0 24px;
        font-weight: 600;
        box-shadow: none !important;

        &:hover {
          background-color: #E2E8F0 !important; 
          color: var(--color-text-primary) !important;
        }
      }

      // Botón Confirmar
      .btn-save {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)) !important;
        color: white !important;
        border-radius: 999px !important; // Pill Shape
        height: 44px;
        padding: 0 24px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.45);
        }

        &:disabled {
          background: #E2E8F0 !important;
          color: #94A3B8 !important;
          box-shadow: none !important;
          opacity: 1 !important;
        }
      }
    }
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

    this.productivityService.votarEncuesta(this.data.encuesta.id, this.selectedOptionId).subscribe({
      next: () => {
        this.snackBar.open('¡Voto registrado!', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
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