import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ExpensesService } from '../../services/expenses';
import { AuthService } from '../../../auth/services/auth';
import { CreateExpenseReportDialogComponent } from '../../components/create-expense-report-dialog/create-expense-report-dialog';

@Component({
  selector: 'app-my-expenses',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule,
    MatIconModule, MatChipsModule, MatDialogModule, MatTooltipModule
  ],
  templateUrl: './my-expenses.html',
  styleUrls: ['./my-expenses.scss']
})
export class MyExpensesPage implements OnInit {
  private expensesService = inject(ExpensesService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  reports: any[] = [];
  isLoading = false;
  displayedColumns: string[] = ['titulo', 'fecha', 'total', 'estado', 'acciones'];

  currentUser: any;

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadReports();
  }

  loadReports() {
    // Necesitamos el empleadoId del usuario actual
    // Asegúrate que tu authService devuelva el empleadoId dentro del objeto usuario o token
    const empleadoId = this.currentUser?.empleadoId;

    if (!empleadoId) {
      console.error("No se encontró ID de empleado");
      return;
    }

    this.isLoading = true;
    this.expensesService.getMyReports(empleadoId).subscribe({
      next: (data) => {
        this.reports = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateExpenseReportDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createReport(result);
      }
    });
  }

  createReport(data: any) {
    const payload = {
      ...data,
      empleadoId: this.currentUser.empleadoId
    };

    this.expensesService.createReport(payload).subscribe({
      next: (newReport) => { // El backend debería devolver el reporte creado
        this.snackBar.open('Reporte creado. ¡Ahora agrega tus facturas!', 'Cerrar', { duration: 4000 });
        this.loadReports(); // Recargamos la lista

        // Opcional: Navegar directamente al detalle para que empiece a cargar facturas
        // this.router.navigate(['/dashboard/expenses', newReport.id]); 
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear reporte', 'Cerrar');
      }
    });
  }

  // Navegar al detalle (El "Carrito" de facturas)
  goToDetail(reporteId: string) {
    // Aún no creamos esta ruta, pero ya dejamos el link listo
    // this.router.navigate(['/dashboard/expenses', reporteId]);
    this.router.navigate(['/dashboard/expenses', reporteId]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'BORRADOR': return 'status-draft'; // Gris
      case 'PENDIENTE': return 'status-pending'; // Naranja
      case 'ENVIADO': return 'status-pending'; // Naranja
      case 'APROBADO': return 'status-approved'; // Verde
      case 'RECHAZADO': return 'status-rejected'; // Rojo
      default: return '';
    }
  }
}