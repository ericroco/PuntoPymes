import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip'; // Agregado para tooltips
import { MatSpinner } from '@angular/material/progress-spinner';

import { ExpensesService } from '../../services/expenses';
import { AddExpenseItemDialogComponent } from '../../components/add-expense-item-dialog/add-expense-item-dialog';

@Component({
  selector: 'app-expenses-detail',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule,
    MatTableModule, MatCardModule, MatDialogModule, MatChipsModule,
    MatTooltipModule, MatSpinner
  ],
  templateUrl: './expenses-detail.html',
  styleUrls: ['./expenses-detail.scss']
})
export class ExpensesDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private expensesService = inject(ExpensesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  reportId: string = '';
  report: any = null;
  isLoading = false;

  // Columnas de la tabla de facturas
  displayedColumns: string[] = ['fecha', 'categoria', 'concepto', 'monto', 'acciones'];

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id') || '';
    if (this.reportId) {
      this.loadReport();
    }
  }

  loadReport() {
    this.isLoading = true;
    this.expensesService.getReportById(this.reportId).subscribe({
      next: (data) => {
        this.report = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error cargando reporte', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  // Verificar si se puede editar (Solo si es BORRADOR)
  get canEdit(): boolean {
    return this.report?.estado === 'BORRADOR';
  }

  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddExpenseItemDialogComponent, { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      // El diálogo ahora devuelve un objeto { itemData: ..., file: File | null }
      if (result) {
        this.saveItem(result.itemData, result.file);
      }
    });
  }

  /**
   * Guarda el ítem usando la nueva lógica "Two-Step" del servicio.
   * @param itemData Datos del formulario JSON
   * @param file Archivo físico (opcional)
   */
  saveItem(itemData: any, file: File | null) {
    this.isLoading = true; // Mostramos loading mientras sube el archivo

    this.expensesService.createItemWithAttachment(this.reportId, itemData, file).subscribe({
      next: () => {
        this.snackBar.open('Gasto agregado correctamente', 'Cerrar', { duration: 2000 });
        this.loadReport(); // Recargar para actualizar el Total y la lista
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Error al guardar gasto', 'Cerrar');
      }
    });
  }

  deleteItem(itemId: string) {
    if (!confirm('¿Borrar este ítem?')) return;

    this.expensesService.deleteItem(this.reportId, itemId).subscribe({
      next: () => {
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 2000 });
        this.loadReport();
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar')
    });
  }

  submitReport() {
    if (!confirm('¿Enviar reporte para aprobación? Ya no podrás editarlo.')) return;

    this.expensesService.submitReport(this.reportId).subscribe({
      next: () => {
        this.snackBar.open('🚀 Reporte enviado exitosamente', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/dashboard/expenses']); // Volver a la lista
      },
      error: () => this.snackBar.open('Error al enviar reporte', 'Cerrar')
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/my-expenses']);
  }
}