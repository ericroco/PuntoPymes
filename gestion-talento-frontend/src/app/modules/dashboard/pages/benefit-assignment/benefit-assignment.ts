import { Component, OnInit, inject } from '@angular/core'; // Usamos inject para ser modernos
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Feedback
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Loading

import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';

// Componentes y Servicios
import { ConfirmAssignmentDialog } from '../../components/confirm-assignment-dialog/confirm-assignment-dialog';
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { PayrollService } from '../../services/payroll'; // Tu servicio

// Interfaces
interface Employee {
  id: string; // Cambiado a string (UUID)
  name: string; // Mapeado desde nombre + apellido
  department: string; // Mapeado desde cargo o departamento
}

interface BenefitDetails {
  id: string;
  name: string;
  type: 'Ingreso' | 'Descuento'; // Ahora usamos 'indicador'
}

@Component({
  selector: 'app-benefit-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatCheckboxModule,
    MatDividerModule, SubpageHeader, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './benefit-assignment.html',
  styleUrls: ['./benefit-assignment.scss']
})
export class BenefitAssignment implements OnInit {
  // Inyecciones
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private payrollService = inject(PayrollService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Estado de carga
  isLoading = true;

  benefit: BenefitDetails | null = null;
  benefitId: string = '';

  // Listas
  private masterAvailable: Employee[] = [];
  masterAssigned: Employee[] = [];

  availableEmployees: Employee[] = [];
  assignedEmployees: Employee[] = [];

  // Filtros
  availableSearch: string = '';
  assignedSearch: string = '';

  // Selección
  availableSelection = new SelectionModel<Employee>(true, []);
  assignedSelection = new SelectionModel<Employee>(true, []);

  ngOnInit(): void {
    this.benefitId = this.route.snapshot.paramMap.get('id') || '';
    if (this.benefitId) {
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;

    // Usamos forkJoin para hacer 3 peticiones en paralelo:
    // 1. Info del Beneficio
    // 2. Todos los Empleados
    // 3. IDs de los empleados que YA tienen este beneficio
    forkJoin({
      benefit: this.payrollService.getBenefitById(this.benefitId),
      employees: this.payrollService.getAllEmployees(), // Necesitas este método en tu servicio
      assignedIds: this.payrollService.getAssignedEmployeeIds(this.benefitId)
    }).subscribe({
      next: (response) => {
        // A. Configurar Beneficio
        this.benefit = {
          id: response.benefit.id,
          name: response.benefit.nombre,
          type: response.benefit.indicador === 'Ingreso' ? 'Ingreso' : 'Descuento'
        };

        // B. Procesar Empleados
        // Mapeamos la respuesta del backend a nuestra interfaz local 'Employee'
        const allMappedEmployees: Employee[] = response.employees.map((e: any) => ({
          id: e.id,
          name: `${e.nombre} ${e.apellido}`,
          department: e.cargo?.nombre || 'General' // Ajusta según tu modelo 'Empleado'
        }));

        // C. Separar en Listas Maestras
        const currentAssignedIds = response.assignedIds || [];

        this.masterAssigned = allMappedEmployees.filter(emp => currentAssignedIds.includes(emp.id));
        this.masterAvailable = allMappedEmployees.filter(emp => !currentAssignedIds.includes(emp.id));

        // D. Inicializar Vista
        this.applyFilter('available');
        this.applyFilter('assigned');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando datos de asignación', err);
        this.snackBar.open('Error al cargar datos. Intenta nuevamente.', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  // --- Lógica de Filtros (Igual que antes) ---
  applyFilter(list: 'available' | 'assigned'): void {
    const searchTerm = (list === 'available' ? this.availableSearch : this.assignedSearch).toLowerCase();
    const sourceList = (list === 'available' ? this.masterAvailable : this.masterAssigned);

    const filtered = sourceList.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm)
    );

    if (list === 'available') {
      this.availableEmployees = filtered;
    } else {
      this.assignedEmployees = filtered;
    }

    // IMPORTANTE: Limpiar selección visual si filtramos para evitar bugs de UI
    if (list === 'available') this.availableSelection.clear();
    else this.assignedSelection.clear();
  }

  // --- Lógica de Movimiento (Igual que antes) ---
  assignSelected(): void {
    const selected = this.availableSelection.selected;
    if (selected.length === 0) return;

    this.masterAssigned = [...this.masterAssigned, ...selected];
    this.masterAvailable = this.masterAvailable.filter(emp => !selected.includes(emp));

    this.availableSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  removeSelected(): void {
    const selected = this.assignedSelection.selected;
    if (selected.length === 0) return;

    this.masterAvailable = [...this.masterAvailable, ...selected];
    this.masterAssigned = this.masterAssigned.filter(emp => !selected.includes(emp));

    this.assignedSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  assignAll(): void {
    this.masterAssigned = [...this.masterAssigned, ...this.masterAvailable];
    this.masterAvailable = [];
    this.availableSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  removeAll(): void {
    this.masterAvailable = [...this.masterAvailable, ...this.masterAssigned];
    this.masterAssigned = [];
    this.assignedSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  // --- GUARDADO REAL ---
  saveAssignments(): void {
    // 1. Extraer solo los IDs
    const finalAssignedIds = this.masterAssigned.map(emp => emp.id);

    // 2. Diálogo
    const confirmDialogRef = this.dialog.open(ConfirmAssignmentDialog, {
      width: '500px',
      disableClose: true,
      data: {
        benefitName: this.benefit?.name,
        totalAssignedCount: finalAssignedIds.length
      }
    });

    confirmDialogRef.afterClosed().subscribe(applicationDate => {
      if (applicationDate) {
        this.isLoading = true; // Mostrar spinner mientras guarda

        // 3. Llamada al Backend
        this.payrollService.updateBenefitAssignments(this.benefitId, finalAssignedIds)
          .subscribe({
            next: () => {
              this.snackBar.open('¡Asignaciones guardadas con éxito!', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/dashboard/benefits']);
            },
            error: (err) => {
              console.error('Error guardando asignaciones:', err);
              this.snackBar.open('Error al guardar. Intenta nuevamente.', 'Cerrar');
              this.isLoading = false;
            }
          });
      }
    });
  }

  // --- Helpers de Selección (Igual que antes) ---
  onAvailableSelectionChange(event: MatSelectionListChange): void {
    event.options.forEach(opt => {
      if (opt.selected) this.availableSelection.select(opt.value);
      else this.availableSelection.deselect(opt.value);
    });
  }

  onAssignedSelectionChange(event: MatSelectionListChange): void {
    event.options.forEach(opt => {
      if (opt.selected) this.assignedSelection.select(opt.value);
      else this.assignedSelection.deselect(opt.value);
    });
  }
}