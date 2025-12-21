import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { BranchesService, Branch } from '../../services/branches';
import { AddBranchDialogComponent } from '../../components/add-branch-dialog/add-branch-dialog';

@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatDivider,
    MatMenuModule, MatDialogModule, MatSnackBarModule, SubpageHeader
  ],
  templateUrl: './branches-list.html',
  styleUrls: ['./branches-list.scss']
})
export class BranchesListComponent implements OnInit {
  private branchesService = inject(BranchesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  branches: Branch[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches() {
    this.isLoading = true;
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // --- ABRIR DIÁLOGO CREAR ---
  openCreateDialog() {
    const dialogRef = this.dialog.open(AddBranchDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.branchesService.createBranch(result).subscribe({
          next: () => {
            this.snackBar.open('¡Sucursal creada exitosamente!', 'OK', { duration: 3000 });
            this.loadBranches();
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this.snackBar.open('Error al crear sucursal', 'Cerrar');
          }
        });
      }
    });
  }

  // --- ABRIR DIÁLOGO EDITAR ---
  openEditDialog(branch: Branch) {
    const dialogRef = this.dialog.open(AddBranchDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { branch } // Pasamos la sucursal a editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.branchesService.updateBranch(branch.id, result).subscribe({
          next: () => {
            this.snackBar.open('Sucursal actualizada', 'OK', { duration: 3000 });
            this.loadBranches();
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error al actualizar', 'Cerrar');
          }
        });
      }
    });
  }

  // --- ELIMINAR ---
  deleteBranch(branch: Branch) {
    if (!confirm(`¿Estás seguro de eliminar la sede "${branch.nombre}"?`)) return;

    this.isLoading = true;
    this.branchesService.deleteBranch(branch.id).subscribe({
      next: () => {
        this.snackBar.open('Sucursal eliminada', 'OK', { duration: 3000 });
        this.loadBranches();
      },
      error: (err) => {
        this.isLoading = false;
        // Mostramos el mensaje del backend (ej: "Tiene departamentos asociados")
        this.snackBar.open(err.error?.message || 'No se pudo eliminar', 'Cerrar', { duration: 5000 });
      }
    });
  }

  // Helper para iniciales (si no hay foto)
  getInitials(name: string, lastname: string): string {
    return (name?.charAt(0) || '') + (lastname?.charAt(0) || '');
  }
}