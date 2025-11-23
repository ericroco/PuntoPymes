import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
// Shared Header
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Ajusta la ruta
import { AddDepartmentDialog } from '../../../components/add-department-dialog/add-department-dialog';

import { AddJobDialog } from '../../../components/add-job-dialog/add-job-dialog';
// Importa el servicio
import { CatalogService, JobPosition, Department } from '../../../services/catalog';

@Component({
  selector: 'app-job-settings',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule,
    MatIconModule, MatTooltipModule, SubpageHeader, MatTabGroup, MatTab
  ],
  templateUrl: './job-settings.html',
  styleUrls: ['./job-settings.scss']
})
export class JobSettings implements OnInit {
  private catalogService = inject(CatalogService);
  private snackBar = inject(MatSnackBar);

  jobs: JobPosition[] = [];
  departments: Department[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Cargar Departamentos
    this.catalogService.getDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (err) => console.error('Error cargando deptos', err)
    });

    // Cargar Cargos
    this.catalogService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Error cargando cargos', err)
    });
  }

  // --- CARGOS ---
  openJobDialog(job?: JobPosition): void {
    const dialogRef = this.dialog.open(AddJobDialog, {
      width: '500px',
      data: {
        job: job ? { ...job } : null,
        availableDepartments: this.departments // Pasamos la lista REAL de deptos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mapear datos del formulario al DTO del backend
        // (Asegúrate que AddJobDialog devuelva { nombre, departamentoId, salarioMin, salarioMax })
        const dto = {
          nombre: result.name,
          departamentoId: result.departmentId, // El ID del depto seleccionado
          salarioMin: result.minSalary,
          salarioMax: result.maxSalary
        };

        if (job) {
          this.catalogService.updateJob(job.id, dto).subscribe(() => {
            this.snackBar.open('Cargo actualizado', 'Cerrar', { duration: 3000 });
            this.loadData();
          });
        } else {
          this.catalogService.createJob(dto).subscribe(() => {
            this.snackBar.open('Cargo creado', 'Cerrar', { duration: 3000 });
            this.loadData();
          });
        }
      }
    });
  }

  deleteJob(job: JobPosition): void {
    if (confirm(`¿Eliminar cargo ${job.nombre}?`)) {
      this.catalogService.deleteJob(job.id).subscribe(() => {
        this.snackBar.open('Cargo eliminado', 'Cerrar', { duration: 3000 });
        this.loadData();
      });
    }
  }

  // --- DEPARTAMENTOS ---
  openDepartmentDialog(dept?: Department): void {
    const dialogRef = this.dialog.open(AddDepartmentDialog, {
      width: '400px',
      disableClose: true,
      data: { department: dept ? { ...dept } : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // DEBUG: Ver qué estamos enviando
        console.log('Datos del diálogo:', result);

        // Como el formulario ya usa 'nombre', 'result' es { nombre: '...' }
        // ¡Ya no necesitamos mapear result.name!
        const dto = result;

        if (dept) {
          // EDITAR
          this.catalogService.updateDepartment(dept.id, dto).subscribe({
            next: () => {
              this.snackBar.open('Departamento actualizado', 'Cerrar', { duration: 3000 });
              this.loadData();
            },
            error: (err) => {
              console.error(err);
              this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
            }
          });
        } else {
          // CREAR
          this.catalogService.createDepartment(dto).subscribe({
            next: () => {
              this.snackBar.open('Departamento creado', 'Cerrar', { duration: 3000 });
              this.loadData();
            },
            error: (err) => {
              console.error(err); // Mira la consola si falla de nuevo
              this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  deleteDepartment(dept: Department): void {
    if (confirm(`¿Eliminar departamento ${dept.nombre}?`)) {
      this.catalogService.deleteDepartment(dept.id).subscribe({
        next: () => {
          this.snackBar.open('Departamento eliminado', 'Cerrar', { duration: 3000 });
          this.loadData();
        },
        error: (err) => alert('No se puede eliminar: Es posible que tenga cargos o empleados asignados.')
      });
    }
  }
}