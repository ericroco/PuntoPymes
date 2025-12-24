import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// 👇 IMPORTANTE: Importar forkJoin para unir las peticiones
import { forkJoin } from 'rxjs';

import { VacationService } from '../../services/vacation';
import { ExpensesService } from '../../services/expenses';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [
    CommonModule, MatTabsModule, MatTableModule,
    MatButtonModule, MatIconModule, MatChipsModule,
    MatMenuModule, MatTooltipModule
  ],
  templateUrl: './approvals.html',
  styleUrls: ['./approvals.scss']
})
export class ApprovalsPage implements OnInit {
  private vacationService = inject(VacationService);
  private expensesService = inject(ExpensesService); // 👈 Inyectamos gastos
  private snackBar = inject(MatSnackBar);

  pendingRequests: any[] = [];
  historyRequests: any[] = [];
  isLoading = false;

  // Actualizamos columnas para mostrar "Info Extra" (Días o Monto)
  displayedColumns: string[] = ['empleado', 'tipo', 'fechas', 'info', 'acciones'];
  historyColumns: string[] = ['empleado', 'tipo', 'fechas', 'estado', 'respuesta'];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // 🚀 MAGIA: Pedimos Vacaciones y Gastos al mismo tiempo
    forkJoin({
      vacaciones: this.vacationService.getRequests(),
      gastos: this.expensesService.getReports()
    }).subscribe({
      next: (results) => {
        // 1. Normalizamos los datos de VACACIONES
        const listaVacaciones = results.vacaciones.map(v => ({
          ...v,
          tipoSolicitud: 'VACACION', // Etiqueta para saber qué servicio llamar
          fechaOrden: v.fechaInicio, // Estandarizamos fecha para ordenar
          infoExtra: `${v.diasSolicitados} días` // Dato clave para mostrar
        }));

        // 2. Normalizamos los datos de GASTOS
        const listaGastos = results.gastos.map(g => ({
          ...g,
          tipoSolicitud: 'GASTO', // Etiqueta
          fechaOrden: g.createdAt || g.fechaReporte,
          infoExtra: `$${g.total}` // Dato clave (Dinero)
        }));

        // 3. Unimos todo en una sola lista gigante
        const listaCompleta = [...listaVacaciones, ...listaGastos];

        // 4. Ordenamos por fecha (del más nuevo al más viejo)
        listaCompleta.sort((a, b) => new Date(b.fechaOrden).getTime() - new Date(a.fechaOrden).getTime());

        // 5. Filtramos Pendientes vs Historial
        // Nota: En gastos usas 'BORRADOR' o 'ENVIADO'? Ajusta según tu lógica backend.
        // Asumiremos que 'PENDIENTE' es el estado por defecto para aprobaciones.
        // Si gastos usa 'BORRADOR', filtraremos eso también.

        this.pendingRequests = listaCompleta.filter(r =>
          r.estado === 'PENDIENTE' || r.estado === 'ENVIADO'
        );

        this.historyRequests = listaCompleta.filter(r =>
          r.estado !== 'PENDIENTE' && r.estado !== 'ENVIADO' && r.estado !== 'BORRADOR'
        );

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando aprobaciones:', err);
        this.snackBar.open('Error cargando datos', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  processRequest(req: any, decision: 'APROBADA' | 'RECHAZADA') {
    const comentario = decision === 'APROBADA' ? 'Aprobado desde Centro' : 'Rechazado';

    // 👇 DECISIÓN INTELIGENTE: ¿A quién llamo?
    if (req.tipoSolicitud === 'VACACION') {

      this.vacationService.respondRequest(req.id, decision, comentario).subscribe({
        next: () => this.handleSuccess(decision),
        error: () => this.handleError()
      });

    } else if (req.tipoSolicitud === 'GASTO') {

      // El backend de gastos espera 'APROBADO' (sin A final) o según tu enum?
      // Ajusta el string si tu Enum backend es diferente (ej: APROBADO vs APROBADA)
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

  getStatusClass(status: string): string {
    if (!status) return '';
    const s = status.toUpperCase();
    if (s.includes('APROBAD') || s.includes('PAGADO')) return 'status-approved';
    if (s.includes('RECHAZA')) return 'status-rejected';
    return 'status-pending';
  }
}