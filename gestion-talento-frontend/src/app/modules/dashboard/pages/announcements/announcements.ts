import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductivityService } from '../../services/productivity';
import { AuthService } from '../../../auth/services/auth';
import { PERMISSIONS } from '../../../../shared/constants/permissions';
// Asumiremos que crearemos un dialogo simple después
import { CreateAnnouncementDialogComponent } from '../../components/create-announcement-dialog/create-announcement-dialog';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.scss']
})
export class AnnouncementsPage implements OnInit {
  private productivityService = inject(ProductivityService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  anuncios: any[] = [];
  isLoading = false;

  // Permiso para ver el botón de crear (ajusta según tus permisos reales)
  canCreate = false;

  ngOnInit() {
    this.checkPermissions();
    this.loadAnuncios();
  }

  checkPermissions() {
    const user = this.authService.getUser();

    // ERROR DE BOOLEAN: TypeScript se quejaba porque .includes puede dar undefined.
    // SOLUCIÓN: Usamos "!!" para forzar que sea true/false puro.

    // LÓGICA SENCILLA:
    // 1. Super Admin: Siempre puede.
    // 2. Alguien con permiso de 'Políticas' (RRHH): También puede.
    this.canCreate = !!(
      user?.role === 'Super Admin' ||
      user?.permisos?.includes(PERMISSIONS.COMPANY_POLICIES_MANAGE)
    );
  }

  loadAnuncios() {
    this.isLoading = true;
    this.productivityService.getAnuncios().subscribe({
      next: (data: any[]) => { // 👈 ERROR DE 'DATA ANY': Le decimos explícitamente que es un array
        this.anuncios = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateAnnouncementDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(created => {
      if (created) {
        this.loadAnuncios(); // Recargamos el muro
      }
    });
  }

  getPriorityColor(prioridad: string): string {
    switch (prioridad) {
      case 'ALTA': return 'warn';
      case 'MEDIA': return 'accent';
      default: return 'primary'; // Baja o normal
    }
  }
}