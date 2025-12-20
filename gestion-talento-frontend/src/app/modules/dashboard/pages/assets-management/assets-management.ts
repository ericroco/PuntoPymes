import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

// Servicios y Modelos
import { AssetService } from '../../services/asset';
import { AuthService } from '../../../auth/services/auth'; // Ajusta ruta
import { Asset, AssetStatus } from '../../models/asset.models'; import { AssetFormDialogComponent } from '../../components/asset-form-dialog/asset-form-dialog';
import { AssetAssignDialogComponent } from '../../components/asset-assign-dialog/asset-assign-dialog';
import { AssetReturnDialogComponent } from '../../components/asset-return-dialog/asset-return-dialog';
import { AssetHistoryDialogComponent } from '../../components/asset-history-dialog/asset-history-dialog';
@Component({
  selector: 'app-assets-management',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatMenuModule, MatChipsModule,
    MatTooltipModule, MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatDivider
  ],
  templateUrl: './assets-management.html',
  styleUrls: ['./assets-management.scss']
})
export class AssetsManagement implements OnInit {
  // Inyecciones
  private assetService = inject(AssetService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Datos
  dataSource = new MatTableDataSource<Asset>([]);
  isLoading = true;

  // Columnas a mostrar
  displayedColumns: string[] = ['imageUrl', 'info', 'categoria', 'serial', 'estado', 'valor', 'actions'];

  // Filtros
  searchControl = new FormControl('');
  statusFilterControl = new FormControl('TODOS');

  // Enum para usar en el HTML
  AssetStatus = AssetStatus;
  statusOptions = ['TODOS', ...Object.values(AssetStatus)];

  // Permisos
  canManageAssets = false; // Crear, Editar, Eliminar
  canAssignAssets = false; // Asignar a empleados

  ngOnInit(): void {
    this.checkPermissions();
    this.loadAssets();

    // Escuchar cambios en el buscador
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '', this.statusFilterControl.value || 'TODOS');
    });

    // Escuchar cambios en el filtro de estado
    this.statusFilterControl.valueChanges.subscribe(status => {
      this.applyFilter(this.searchControl.value || '', status || 'TODOS');
    });
  }

  checkPermissions() {
    // Ajusta estos strings a tus permisos reales del backend/token
    this.canManageAssets = this.authService.hasPermission('activos.gestionar');
    this.canAssignAssets = this.authService.hasPermission('activos.gestionar');
  }

  loadAssets() {
    this.isLoading = true;
    this.assetService.getAssets().subscribe({
      next: (assets) => {
        this.dataSource.data = assets;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando activos:', err);
        this.isLoading = false;
        this.snackBar.open('Error al cargar el inventario.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(searchTerm: string, status: string) {
    const filterValue = searchTerm.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Asset, filter: string) => {
      const matchText =
        data.nombre.toLowerCase().includes(filterValue) ||
        (data.serial && data.serial.toLowerCase().includes(filterValue)) ||
        data.tipo.toLowerCase().includes(filterValue);

      const matchStatus = status === 'TODOS' || data.estado === status;

      return matchText && matchStatus;
    };

    this.dataSource.filter = filterValue; // Dispara el filtro
  }

  // --- ACCIONES (Los modales los haremos luego) ---

  openAssetDialog(asset?: Asset) {
    const dialogRef = this.dialog.open(AssetFormDialogComponent, {
      width: '600px',
      disableClose: true, // Obliga a usar botones para cerrar
      data: { asset: asset || null } // Pasamos el activo si es editar, o null si es crear
    });

    // 👇 ESTA ES LA CLAVE DE LA ACTUALIZACIÓN AUTOMÁTICA
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si el modal devolvió 'true' (significa que guardó con éxito),
        // recargamos la tabla desde el backend.
        this.loadAssets();
      }
    });
  }

  openAssignDialog(asset: Asset) {
    // Si el activo ya no está disponible, bloqueamos (por seguridad visual)
    if (asset.estado !== AssetStatus.DISPONIBLE) {
      this.snackBar.open('Este activo no está disponible para asignar.', 'Cerrar');
      return;
    }

    const dialogRef = this.dialog.open(AssetAssignDialogComponent, {
      width: '500px',
      data: { asset: asset }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si se asignó con éxito, recargamos la tabla para ver el cambio de estado (a ASIGNADO)
        this.loadAssets();
      }
    });
  }

  deleteAsset(asset: Asset) {
    if (confirm(`¿Estás seguro de dar de baja "${asset.nombre}"?`)) {
      this.assetService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.snackBar.open('Activo eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadAssets(); // Recargar tabla
        },
        error: () => this.snackBar.open('Error al eliminar', 'Cerrar')
      });
    }
  }

  // Helper para clases CSS de estado
  getStatusClass(status: AssetStatus): string {
    switch (status) {
      case AssetStatus.DISPONIBLE: return 'status-available';
      case AssetStatus.ASIGNADO: return 'status-assigned';
      case AssetStatus.EN_REPARACION: return 'status-maintenance';
      case AssetStatus.DE_BAJA: return 'status-down';
      default: return '';
    }
  }

  openReturnDialog(asset: Asset) {
    const dialogRef = this.dialog.open(AssetReturnDialogComponent, {
      width: '500px',
      data: { asset: asset }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadAssets(); // Recargar tabla para ver el cambio de estado
      }
    });
  }

  openHistoryDialog(asset: Asset) {
    this.dialog.open(AssetHistoryDialogComponent, {
      width: '700px',
      data: { asset: asset }
    });
  }
}