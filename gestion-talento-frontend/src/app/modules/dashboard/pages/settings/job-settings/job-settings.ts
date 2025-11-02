import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// Shared Header
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Ajusta la ruta

import { AddJobDialog } from '../../../components/add-job-dialog/add-job-dialog';

// Interface para Cargo
interface JobPosition {
  id: number;
  name: string;
  department: string;
  minSalary: number;
  maxSalary: number;
}

@Component({
  selector: 'app-job-settings',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, MatButtonModule,
    MatIconModule, MatTooltipModule, SubpageHeader
  ],
  templateUrl: './job-settings.html',
  styleUrls: ['./job-settings.scss']
})
export class JobSettings implements OnInit {

  jobs: JobPosition[] = [ // Datos de ejemplo
    { id: 1, name: 'Desarrollador Frontend', department: 'Tecnología', minSalary: 1500, maxSalary: 2200 },
    { id: 2, name: 'Diseñador UX/UI', department: 'Diseño', minSalary: 1400, maxSalary: 2000 },
    { id: 3, name: 'Contador Principal', department: 'Contabilidad', minSalary: 2000, maxSalary: 2800 },
    { id: 4, name: 'Líder de Proyecto', department: 'Tecnología', minSalary: 2300, maxSalary: 3500 }
  ];

  // TODO: Cargar dinámicamente
  availableDepartments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // --- TODO: Cargar cargos y departamentos desde la API ---
  }

  openJobDialog(job?: JobPosition): void {
    const isEditMode = !!job; // Verifica si estamos editando (si 'job' existe)

    const dialogRef = this.dialog.open(AddJobDialog, {
      width: '500px',
      disableClose: true,
      data: {
        job: job ? { ...job } : null, // Pasa una *copia* del cargo si es edición, o null si es creación
        availableDepartments: this.availableDepartments // Pasa la lista de departamentos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // 'result' contiene los valores del formulario si se guardó
      if (result) {
        if (isEditMode && job) {
          // --- LÓGICA DE EDICIÓN ---
          console.log('Actualizar cargo:', result);
          // --- TODO: Llamar API para ACTUALIZAR el 'job.id' con 'result' ---

          // Simulación local (actualiza el item en el array 'jobs')
          const index = this.jobs.findIndex(j => j.id === job.id);
          if (index > -1) {
            this.jobs[index] = { ...this.jobs[index], ...result }; // Sobrescribe con los nuevos datos
            this.jobs = [...this.jobs]; // Forzar detección de cambios
          }

        } else {
          // --- LÓGICA DE CREACIÓN ---
          console.log('Crear cargo:', result);
          // --- TODO: Llamar API para CREAR nuevo cargo con 'result' ---

          // Simulación local (añade al array 'jobs')
          const newJob: JobPosition = {
            id: Date.now(), // ID temporal
            ...result
          };
          this.jobs = [...this.jobs, newJob]; // Añade al final y fuerza detección
        }
      } else {
        console.log('Modal cerrado sin guardar');
      }
    });
  }
  deleteJob(job: JobPosition): void {
    console.log('Eliminar cargo:', job);
    // --- TODO: Abrir modal de confirmación ---
    // --- TODO: Llamar API para eliminar ---
    // Simulación local
    // this.jobs = this.jobs.filter(j => j.id !== job.id);
  }
}


