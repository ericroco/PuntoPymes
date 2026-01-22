import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

import { forkJoin } from 'rxjs';

import { VacationService } from '../../services/vacation';
import { ExpensesService } from '../../services/expenses';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [
    CommonModule, MatTabsModule, MatTableModule,
    MatButtonModule, MatIconModule, MatChipsModule,
    MatMenuModule, MatTooltipModule, MatDialogModule, MatDivider
  ],
  templateUrl: './approvals.html',
  styleUrls: ['./approvals.scss']
})
export class ApprovalsPage implements OnInit {
  private vacationService = inject(VacationService);
  private expensesService = inject(ExpensesService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  // Referencia al template del modal de detalles que pondremos en el HTML
  @ViewChild('detailsDialog') detailsDialog!: TemplateRef<any>;

  pendingRequests: any[] = [];
  historyRequests: any[] = [];
  isLoading = false;
  selectedRequest: any = null; // Para guardar la solicitud que se está viendo

  displayedColumns: string[] = ['empleado', 'tipo', 'fechas', 'info', 'acciones'];
  historyColumns: string[] = ['empleado', 'tipo', 'fechas', 'estado', 'respuesta'];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    forkJoin({
      vacaciones: this.vacationService.getRequests(),
      gastos: this.expensesService.getReports()
    }).subscribe({
      next: (results) => {
        // 1. Normalizamos VACACIONES / AUSENCIAS
        const listaVacaciones = results.vacaciones.map(v => {

          // Detectamos si es Vacación real o Ausencia
          const tipoReal = v.tipo || 'VACACIONES'; // Backend field
          const esVacacion = tipoReal === 'VACACIONES';

          return {
            ...v,
            tipoSolicitud: 'VACACION', // Para saber qué servicio usar al aprobar (VacationService)

            // 👇 VARIABLES VISUALES DINÁMICAS
            displayLabel: this.formatType(tipoReal),
            displayIcon: esVacacion ? 'beach_access' : 'local_hospital',
            displayClass: esVacacion ? 'vacation' : 'absence', // CSS diferente para cada uno

            fechaOrden: v.fechaInicio,
            infoExtra: `${v.diasSolicitados} días`,

            // Guardamos la justificación para el modal
            fullDescription: v.comentario || 'Sin justificación adjunta.'
          };
        });

        // 2. Normalizamos GASTOS
        const listaGastos = results.gastos.map(g => ({
          ...g,
          tipoSolicitud: 'GASTO',

          // Visuales
          displayLabel: 'Reembolso',
          displayIcon: 'attach_money',
          displayClass: 'expense',

          fechaOrden: g.createdAt || g.fechaReporte,
          infoExtra: `$${g.total}`,
          fullDescription: g.descripcion || 'Sin descripción.'
        }));

        const listaCompleta = [...listaVacaciones, ...listaGastos];

        // Ordenar
        listaCompleta.sort((a, b) => new Date(b.fechaOrden).getTime() - new Date(a.fechaOrden).getTime());

        // Filtrar
        this.pendingRequests = listaCompleta.filter(r => r.estado === 'PENDIENTE' || r.estado === 'ENVIADO');
        this.historyRequests = listaCompleta.filter(r => r.estado !== 'PENDIENTE' && r.estado !== 'ENVIADO' && r.estado !== 'BORRADOR');

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // 👇 Función para abrir el modal de detalles
  openRequestDetails(request: any) {
    this.selectedRequest = request;
    this.dialog.open(this.detailsDialog, {
      width: '450px',
      panelClass: 'custom-dialog-container'
    });
  }

  processRequest(req: any, decision: 'APROBADA' | 'RECHAZADA') {
    const comentario = decision === 'APROBADA' ? 'Aprobado' : 'Rechazado';

    // Si estamos en el modal, lo cerramos antes de procesar
    this.dialog.closeAll();

    if (req.tipoSolicitud === 'VACACION') {
      this.vacationService.respondRequest(req.id, decision, comentario).subscribe({
        next: () => this.handleSuccess(decision),
        error: () => this.handleError()
      });
    } else if (req.tipoSolicitud === 'GASTO') {
      const estadoGasto = decision === 'APROBADA' ? 'APROBADO' : 'RECHAZADO';
      this.expensesService.updateStatus(req.id, estadoGasto as any, comentario).subscribe({
        next: () => this.handleSuccess(decision),
        error: () => this.handleError()
      });
    }
  }

  private handleSuccess(decision: string) {
    this.snackBar.open(`Solicitud ${decision.toLowerCase()} correctamente`, 'Cerrar', { duration: 3000 });
    this.loadData();
  }

  private handleError() {
    this.snackBar.open('Error procesando la solicitud', 'Cerrar');
  }

  // Helper para formatear texto (Ej: CALAMIDAD_DOMESTICA -> Calamidad Domestica)
  private formatType(tipo: string): string {
    return tipo.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    const s = status.toUpperCase();
    if (s.includes('APROBAD') || s.includes('PAGADO')) return 'status-approved';
    if (s.includes('RECHAZA')) return 'status-rejected';
    return 'status-pending';
  }
}