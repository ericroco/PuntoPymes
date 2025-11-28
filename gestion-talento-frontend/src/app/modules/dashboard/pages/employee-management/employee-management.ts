import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeDialog } from '../../components/add-employee-dialog/add-employee-dialog';
import { RouterModule } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

// Importamos la interfaz REAL del servicio
import { EmployeesService, Employee } from '../../services/employees';
import { CatalogService, JobPosition } from '../../services/catalog';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  templateUrl: './employee-management.html',
  styleUrls: ['./employee-management.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('75ms', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EmployeeManagement implements OnInit {
  private employeesService = inject(EmployeesService);
  public dialog = inject(MatDialog);
  private catalogService = inject(CatalogService);
  private snackBar = inject(MatSnackBar);

  // --- DATOS REALES ---
  employees: Employee[] = [];
  filteredEmployees: Employee[] = []; // Usamos la interfaz real Employee
  isLoading = true;

  // --- DATOS AUXILIARES (Simulados por ahora hasta que conectes los catálogos) ---
  availableJobs = [
    { id: 1, name: 'Desarrollador Frontend', department: 'Tecnología', minSalary: 1500, maxSalary: 2200 },
    { id: 2, name: 'Diseñador UX/UI', department: 'Diseño', minSalary: 1400, maxSalary: 2000 },
    { id: 3, name: 'Contador Principal', department: 'Contabilidad', minSalary: 2000, maxSalary: 2800 },
    { id: 4, name: 'Líder de Proyecto', department: 'Tecnología', minSalary: 2300, maxSalary: 3500 }
  ];
  availableManagers: any[] = [
    { id: 4, name: 'Erick Rodas' },
    { id: 10, name: 'Gerencia General' }
  ];

  // --- FILTROS ---
  searchTerm: string = '';
  selectedDepartment: string = '';
  departments: string[] = [];
  sortBy: 'name-asc' | 'name-desc' = 'name-asc'; // Simplifiqué el sort porque 'progress' no existe en backend aún

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        console.log('✅ Empleados cargados:', data);
        this.employees = data;

        // Extraer departamentos únicos de los datos reales (si tienen departamento asignado)
        // Nota: Tu backend devuelve cargo y rol, asumimos que el departamento viene dentro del cargo o lo añadirás.
        // Por ahora, si no viene, usamos una lista vacía o la simulada.
        this.departments = ['Tecnología', 'Diseño', 'Contabilidad', 'RRHH'];

        this.applyFiltersAndSort();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando empleados:', err);
        this.isLoading = false;
      }
    });
  }

  // --- Lógica de Filtrado y Ordenamiento (ADAPTADA A DATOS REALES) ---
  applyFiltersAndSort(): void {
    let tempEmployees = [...this.employees];

    // 1. Filtrar por Buscador (Nombre, Apellido o Cargo)
    if (this.searchTerm) {
      const lowerSearch = this.searchTerm.toLowerCase();
      tempEmployees = tempEmployees.filter(emp =>
        emp.nombre.toLowerCase().includes(lowerSearch) ||
        emp.apellido.toLowerCase().includes(lowerSearch) ||
        (emp.cargo?.nombre || '').toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Filtrar por Departamento (Si tuviéramos el dato en el objeto Employee)
    /* if (this.selectedDepartment) {
      tempEmployees = tempEmployees.filter(emp =>
        emp.departamento?.nombre === this.selectedDepartment
      );
    }
    */

    // 3. Ordenar
    switch (this.sortBy) {
      case 'name-asc':
        tempEmployees.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'name-desc':
        tempEmployees.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
    }

    this.filteredEmployees = tempEmployees;
  }

  toggleSort(): void {
    if (this.sortBy === 'name-asc') {
      this.sortBy = 'name-desc';
    } else {
      this.sortBy = 'name-asc';
    }
    this.applyFiltersAndSort();
  }

  openAddEmployeeDialog(): void {
    // 3. CARGAR CARGOS REALES ANTES DE ABRIR
    this.catalogService.getJobs().subscribe(realJobs => {

      const dialogRef = this.dialog.open(AddEmployeeDialog, {
        width: '800px',
        disableClose: true,
        data: {
          // Mapeamos los cargos reales al formato que espera el diálogo
          // (El backend devuelve { id, nombre, ... }, el dialogo espera { id, name, ... })
          availableJobs: realJobs.map(job => ({
            id: job.id,
            name: job.nombre,
            department: job.departamento?.nombre || 'General',
            minSalary: job.salarioMin || 0,
            maxSalary: job.salarioMax || 0
          })),
          // Managers simulados por ahora
          availableManagers: this.availableManagers
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadEmployees();
        }
      });
    });
  }

  // Helper para el HTML
  getInitials(nombre: string, apellido: string): string {
    return (nombre.charAt(0) + (apellido ? apellido.charAt(0) : '')).toUpperCase();
  }
  deleteEmployee(employee: Employee): void {
    // Mensaje más preciso para el usuario
    if (!confirm(`¿Estás seguro de desvincular a ${employee.nombre} ${employee.apellido}? \nSe finalizará su contrato actual y pasará a estado Inactivo.`)) {
      return;
    }

    this.employeesService.deleteEmployee(employee.id).subscribe({
      next: () => {
        this.snackBar.open('Empleado desvinculado correctamente', 'Cerrar', { duration: 3000 });
        this.loadEmployees(); // Recargar la lista para ver el cambio de estado
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al desvincular empleado', 'Cerrar', { duration: 3000 });
      }
    });
  }
}