import { Component, OnInit } from '@angular/core';
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
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmAssignmentDialog } from '../../components/confirm-assignment-dialog/confirm-assignment-dialog';
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { MatDialog } from '@angular/material/dialog';

// Interfaces (simplificadas)
interface Employee {
  id: number;
  name: string;
  department: string;
}
interface BenefitDetails {
  id: number | string;
  name: string;
  type: 'Ingreso' | 'Descuento';
}

@Component({
  selector: 'app-benefit-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatCheckboxModule,
    MatDividerModule, SubpageHeader
  ],
  templateUrl: './benefit-assignment.html',
  styleUrls: ['./benefit-assignment.scss']
})
export class BenefitAssignment implements OnInit {

  benefit: BenefitDetails | null = null;
  benefitId: string | null = null;

  // Listas maestras (simuladas)
  private allEmployees: Employee[] = [];

  // Listas maestras de estado (sin filtrar)
  private masterAvailable: Employee[] = [];
  masterAssigned: Employee[] = [];

  // Listas para mostrar en la UI (filtradas)
  availableEmployees: Employee[] = [];
  assignedEmployees: Employee[] = [];

  // Filtros
  availableSearch: string = '';
  assignedSearch: string = '';

  // Modelos de Selección del CDK (Esto es correcto)
  availableSelection = new SelectionModel<Employee>(true, []);
  assignedSelection = new SelectionModel<Employee>(true, []);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.benefitId = this.route.snapshot.paramMap.get('id');

    // --- Simulación de Datos ---
    this.benefit = { id: this.benefitId || 0, name: 'Aporte Seguro Médico Privado', type: 'Descuento' };

    this.allEmployees = [
      { id: 1, name: 'Jeimy Torres', department: 'Tecnología' },
      { id: 2, name: 'Valentina Samaniego', department: 'Diseño' },
      { id: 3, name: 'Gabriela Loyola', department: 'Contabilidad' },
      { id: 4, name: 'Erick Rodas', department: 'Tecnología' },
      { id: 5, name: 'Carlos Backend', department: 'Tecnología' },
      { id: 6, name: 'Andrea Marketing', department: 'Marketing' },
    ];

    const alreadyAssignedIds = [1, 4]; // Jeimy y Erick

    // Inicializa las listas MAESTRAS de estado
    this.masterAvailable = this.allEmployees.filter(emp => !alreadyAssignedIds.includes(emp.id));
    this.masterAssigned = this.allEmployees.filter(emp => alreadyAssignedIds.includes(emp.id));

    // Inicializa las listas FILTRADAS (que ve el usuario)
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  // --- Lógica de Filtros ---
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
    // Limpia la selección al filtrar
    this.availableSelection.clear();
    this.assignedSelection.clear();
  }

  // --- Lógica de Movimiento ---

  assignSelected(): void {
    const selected = this.availableSelection.selected;
    if (selected.length === 0) return;

    this.masterAssigned = [...this.masterAssigned, ...selected];
    this.masterAvailable = this.masterAvailable.filter(emp => !selected.includes(emp));

    this.availableSelection.clear();
    this.applyFilter('available'); // Re-aplica filtros
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
    this.masterAssigned = [...this.masterAssigned, ...this.masterAvailable]; // Mueve todos los disponibles
    this.masterAvailable = [];
    this.availableSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  removeAll(): void {
    this.masterAvailable = [...this.masterAvailable, ...this.masterAssigned]; // Libera todos los asignados
    this.masterAssigned = [];
    this.assignedSelection.clear();
    this.applyFilter('available');
    this.applyFilter('assigned');
  }

  // --- Lógica de Guardado ---
  saveAssignments(): void {
    // 1. Obtenemos los datos finales (la lista completa de asignados)
    const assignedIds = this.masterAssigned.map(emp => emp.id);

    // 2. Abre el modal de confirmación y fecha
    const confirmDialogRef = this.dialog.open(ConfirmAssignmentDialog, {
      width: '500px',
      disableClose: true,
      data: {
        benefitName: this.benefit?.name || 'este beneficio',
        totalAssignedCount: assignedIds.length
      }
    });

    // 3. Escucha el resultado del modal de confirmación
    confirmDialogRef.afterClosed().subscribe(applicationDate => {
      // 'applicationDate' será la fecha (ej: '2025-11-15') o null si se canceló

      if (applicationDate) {
        // --- Confirmado: Ahora se hace el guardado ---
        console.log('Guardando asignaciones...');
        console.log(`Total ${assignedIds.length} empleados asignados a ${this.benefit?.name}`);
        console.log(`Fecha de Aplicación: ${applicationDate}`);

        // --- TODO: Llamar API para guardar este array de IDs (assignedIds) Y la fecha (applicationDate) ---
        // Ejemplo: this.benefitService.updateAssignments(this.benefitId, assignedIds, applicationDate).subscribe(...)

        // Navegar de vuelta
        this.router.navigate(['/dashboard/benefits']);
        // Opcional: Mostrar un snackbar de "Éxito"

      } else {
        // El usuario canceló el modal de fecha
        console.log('Guardado de asignaciones cancelado.');
      }
    });
  }
  // --- CORRECCIÓN: Lógica de Selección Manual para las Listas ---
  onAvailableSelectionChange(event: MatSelectionListChange): void {
    // Sincroniza la selección de la lista con el SelectionModel
    event.options.forEach(opt => {
      // 'opt.value' es el objeto 'Employee'
      if (opt.selected) {
        this.availableSelection.select(opt.value);
      } else {
        this.availableSelection.deselect(opt.value);
      }
    });
  }

  onAssignedSelectionChange(event: MatSelectionListChange): void {
    event.options.forEach(opt => {
      if (opt.selected) {
        this.assignedSelection.select(opt.value);
      } else {
        this.assignedSelection.deselect(opt.value);
      }
    });
  }
}