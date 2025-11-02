import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPayrollItemDialog } from '../../components/add-payroll-item-dialog/add-payroll-item-dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog'; // Ajusta la ruta si es necesario

// --- NUEVAS IMPORTACIONES ---
import { SelectionModel } from '@angular/cdk/collections'; // Para gestionar selecciones
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para los checkboxes
// --- Fin Importaciones ---

// Interfaces (Asegúrate de que coincidan)
interface EmployeePayroll {
  id: number;
  name: string;
  role: string;
  department: string; // Necesario para el filtro
  salary: number;
  lastRevision: string;
}
interface PayrollItem { id: number; name: string; type: 'Ingreso' | 'Descuento'; isRecurring: boolean; }

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.scss'],
  // No necesitamos la animación de lista aquí si la tabla se actualiza dinámicamente
})
export class Payroll implements OnInit { // Implementar OnInit

  // --- Propiedades para Filtros y Datos ---
  searchTerm: string = '';
  selectedDepartment: string = 'todos'; // 'todos' es el valor para "Todos"
  departments: string[] = [];

  allEmployees: EmployeePayroll[] = []; // Lista maestra original
  filteredEmployees: EmployeePayroll[] = []; // Lista que se muestra en la tabla

  // Propiedad para los totales calculados
  totals = {
    count: 0,
    totalSalary: 0
  };

  // Datos de ejemplo para Novedades (debe venir de Configuración)
  availablePayrollItems: PayrollItem[] = [
    { id: 1, name: 'Bono Productividad', type: 'Ingreso', isRecurring: false },
    { id: 2, name: 'Anticipo Salarial', type: 'Descuento', isRecurring: false },
  ];
  selection = new SelectionModel<EmployeePayroll>(true, []);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // --- Simulación de Carga de Datos ---
    // En una app real, cargarías 'allEmployees' desde una API
    this.allEmployees = [
      { id: 1, name: 'Jeimy Torres', role: 'Desarrolladora Frontend', department: 'Tecnología', salary: 1800, lastRevision: '2025-01-15' },
      { id: 2, name: 'Valentina Samaniego', role: 'Diseñadora UX/UI', department: 'Diseño', salary: 1650, lastRevision: '2025-02-01' },
      { id: 3, name: 'Gabriela Loyola', role: 'Contadora Principal', department: 'Contabilidad', salary: 2200, lastRevision: '2024-12-10' },
      { id: 4, name: 'Erick Rodas', role: 'Líder de Proyecto', department: 'Tecnología', salary: 2500, lastRevision: '2025-01-15' },
      // ... (añadir más empleados para probar filtros)
    ];

    // Poblar la lista de departamentos para el dropdown de filtro
    this.departments = [...new Set(this.allEmployees.map(emp => emp.department))].sort();

    // Aplicar filtros iniciales (mostrar todo)
    this.applyFilters();
  }

  // --- Lógica Principal de Filtrado ---
  applyFilters(): void {
    // 1. Empezar con la lista completa
    let tempEmployees = [...this.allEmployees];
    const lowerSearch = this.searchTerm.toLowerCase();

    // 2. Filtrar por Término de Búsqueda (Nombre o Cargo)
    if (this.searchTerm) {
      tempEmployees = tempEmployees.filter(emp =>
        emp.name.toLowerCase().includes(lowerSearch) ||
        emp.role.toLowerCase().includes(lowerSearch)
      );
    }

    // 3. Filtrar por Departamento
    if (this.selectedDepartment && this.selectedDepartment !== 'todos') {
      tempEmployees = tempEmployees.filter(emp =>
        emp.department === this.selectedDepartment
      );
    }

    // 4. Actualizar la lista visible
    this.filteredEmployees = tempEmployees;

    // 5. Recalcular los totales basados en la lista filtrada
    this.calculateTotals();
  }

  // --- Lógica para Calcular Totales ---
  calculateTotals(): void {
    this.totals.count = this.filteredEmployees.length;
    // Suma los salarios de la lista filtrada
    this.totals.totalSalary = this.filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  }

  // --- Lógica del Modal (sin cambios) ---
  openAddItemDialog(employee: EmployeePayroll): void {
    const dialogRef = this.dialog.open(AddPayrollItemDialog, {
      width: '450px',
      disableClose: true,
      data: {
        employeeName: employee.name,
        employeeId: employee.id,
        availableItems: this.availablePayrollItems.filter(item => !item.isRecurring)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 'result' ahora contiene: { employeeId, itemName, itemType, amount, comments, applicationDate }
        console.log('Novedad individual registrada:', result);
        // --- TODO: Llamar API y pasar el 'result' completo ---
        alert(`Novedad registrada para ${employee.name} en la fecha ${result.applicationDate}`);
      }
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredEmployees.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear(); // Limpia la selección
      return;
    }
    // Selecciona todas las filas que están *actualmente filtradas*
    this.selection.select(...this.filteredEmployees);
  }

  /** Etiqueta para la accesibilidad del checkbox de fila */
  checkboxLabel(row?: EmployeePayroll): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Abre el modal para aplicar una novedad a todos los empleados seleccionados */
  openBulkAddItemDialog(): void {
    const selectedCount = this.selection.selected.length;
    if (selectedCount === 0) {
      alert('Por favor, selecciona al menos un empleado.');
      return;
    }

    // Reutilizamos el mismo modal 'AddPayrollItemDialog'
    // pero le pasamos datos diferentes (el conteo en lugar de un nombre)
    const dialogRef = this.dialog.open(AddPayrollItemDialog, {
      width: '450px',
      disableClose: true,
      data: {
        // No pasamos 'employeeName' ni 'employeeId'
        selectedCount: selectedCount, // Pasamos el número de empleados
        availableItems: this.availablePayrollItems.filter(item => !item.isRecurring)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // 'result' = { item, amount, comments, applicationDate }

      // Si el usuario guardó en el primer modal...
      if (result) {

        // --- 2. ¡NO EJECUTAR TODAVÍA! Abrir el SEGUNDO modal (Confirmación) ---

        // Formateamos los datos para el mensaje de confirmación
        const itemType = result.item.type;
        const itemName = result.item.name;
        const amountDisplay = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.amount);
        const dateDisplay = new Date(result.applicationDate + 'T00:00:00').toLocaleDateString('es-EC'); // Formato local

        const confirmTitle = `Confirmar Acción Masiva (${itemType})`;
        const confirmMessage = `Estás a punto de registrar la novedad "${itemName}" por un monto de ${amountDisplay} (USD) a ${selectedCount} empleados, con fecha de aplicación ${dateDisplay}. ¿Estás seguro de que deseas continuar?`;

        const confirmDialogRef = this.dialog.open(ConfirmationDialog, {
          width: '450px',
          data: {
            title: confirmTitle,
            message: confirmMessage,
            confirmButtonText: 'Sí, aplicar a todos',
            cancelButtonText: 'Cancelar'
          }
        });

        // --- 3. Escuchar el resultado del SEGUNDO modal ---
        confirmDialogRef.afterClosed().subscribe(confirmed => {

          // Si el usuario confirma en el segundo modal...
          if (confirmed) {
            console.log('Confirmado. Aplicando novedad masiva:', result);

            // --- 4. EJECUTAR LA LÓGICA (AHORA SÍ) ---
            this.selection.selected.forEach(employee => {
              const finalAmount = itemType === 'Descuento' ? -Math.abs(result.amount) : result.amount;
              const noveltyData = {
                employeeId: employee.id,
                itemName: itemName,
                itemType: itemType,
                amount: finalAmount,
                comments: result.comments,
                applicationDate: result.applicationDate
              };
              console.log(`Aplicando a ${employee.name}:`, noveltyData);
              // --- TODO: Llamar API (en bucle o API masiva) para guardar esta novedad ---
            });

            this.selection.clear();
            alert(`Novedad registrada exitosamente para ${selectedCount} empleados (simulación).`);

          } else {
            // Si el usuario cancela el segundo modal
            console.log('Acción masiva cancelada por el usuario.');
          }
        }); // Fin .afterClosed() del modal de confirmación

      } else {
        // Si el usuario cancela el primer modal (AddPayrollItemDialog)
        console.log('Registro de novedad cancelado.');
      }
    });
  }
}