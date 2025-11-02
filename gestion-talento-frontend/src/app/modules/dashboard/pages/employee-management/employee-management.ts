import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeDialog } from '../../components/add-employee-dialog/add-employee-dialog';
import { RouterModule } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

// Keep your EmployeeData interface
interface EmployeeData {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'active' | 'vacation' | 'inactive';
  avatar: string;
  goalProgress: number;
}

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatIconModule,
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
export class EmployeeManagement {
  // Update sample data with avatar and goalProgress
  employees: EmployeeData[] = [
    { id: 1, name: 'Jeimy Torres', role: 'Desarrolladora Frontend', department: 'Tecnología', email: 'jtorres@empresa.com', status: 'active', avatar: 'https://i.pravatar.cc/80?u=jeimytorres', goalProgress: 82 },
    { id: 2, name: 'Valentina Samaniego', role: 'Diseñadora UX/UI', department: 'Diseño', email: 'vsamaniego@empresa.com', status: 'active', avatar: 'https://i.pravatar.cc/80?u=valentinasamaniego', goalProgress: 75 },
    { id: 3, name: 'Gabriela Loyola', role: 'Contadora Principal', department: 'Contabilidad', email: 'gloyola@empresa.com', status: 'vacation', avatar: 'https://i.pravatar.cc/80?u=gabrielaloyola', goalProgress: 95 },
    { id: 4, name: 'Erick Rodas', role: 'Líder de Proyecto', department: 'Tecnología', email: 'erodas@empresa.com', status: 'inactive', avatar: 'https://i.pravatar.cc/80?u=erickrodas', goalProgress: 60 }
  ];
  availableJobs = [ // Esta es la nueva lista que pasaremos
    { id: 1, name: 'Desarrollador Frontend', department: 'Tecnología', minSalary: 1500, maxSalary: 2200 },
    { id: 2, name: 'Diseñador UX/UI', department: 'Diseño', minSalary: 1400, maxSalary: 2000 },
    { id: 3, name: 'Contador Principal', department: 'Contabilidad', minSalary: 2000, maxSalary: 2800 },
    { id: 4, name: 'Líder de Proyecto', department: 'Tecnología', minSalary: 2300, maxSalary: 3500 }
  ];
  availableDepartments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing'];
  availableManagers: any[] = [ // Lista de empleados que pueden ser managers
    { id: 4, name: 'Erick Rodas' },
    { id: 10, name: 'Gerencia General' } // Ejemplo
  ];
  filteredEmployees: EmployeeData[] = []; // List actually displayed
  searchTerm: string = '';
  selectedDepartment: string = ''; // '' means 'Todos'
  departments: string[] = []; // List of unique departments
  sortBy: 'name-asc' | 'name-desc' | 'progress-asc' | 'progress-desc' = 'name-asc'; // Default sort

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    // Get unique departments from the employee list
    this.departments = [...new Set(this.employees.map(emp => emp.department))].sort();
    // Initialize the filtered list
    this.applyFiltersAndSort();
  }

  // --- Filter and Sort Logic ---
  applyFiltersAndSort(): void {
    let tempEmployees = [...this.employees]; // Start with the full list

    // 1. Filter by Search Term (Name or Role)
    if (this.searchTerm) {
      const lowerSearch = this.searchTerm.toLowerCase();
      tempEmployees = tempEmployees.filter(emp =>
        emp.name.toLowerCase().includes(lowerSearch) ||
        emp.role.toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Filter by Department
    if (this.selectedDepartment) {
      tempEmployees = tempEmployees.filter(emp =>
        emp.department === this.selectedDepartment
      );
    }

    // 3. Apply Sorting
    switch (this.sortBy) {
      case 'name-asc':
        tempEmployees.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        tempEmployees.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'progress-asc':
        tempEmployees.sort((a, b) => a.goalProgress - b.goalProgress);
        break;
      case 'progress-desc':
        tempEmployees.sort((a, b) => b.goalProgress - a.goalProgress);
        break;
    }

    // Update the list that the template iterates over
    this.filteredEmployees = tempEmployees;
  }

  // --- Simple Sort Toggle (Example) ---
  toggleSort(): void {
    // Cycle through sorting options (simple example)
    if (this.sortBy === 'name-asc') {
      this.sortBy = 'name-desc';
    } else if (this.sortBy === 'name-desc') {
      this.sortBy = 'progress-desc';
    } else if (this.sortBy === 'progress-desc') {
      this.sortBy = 'progress-asc';
    } else {
      this.sortBy = 'name-asc';
    }
    this.applyFiltersAndSort(); // Re-apply filters and sorting
  }


  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: '700px',
      disableClose: true,
      data: {
        availableJobs: this.availableJobs, // <-- Pasa la lista de Cargos
        // availableDepartments: this.availableDepartments, // Ya no es necesario si el cargo define el depto
        availableManagers: this.availableManagers
      }
    });

    dialogRef.afterClosed().subscribe(newEmployeeData => {
      if (newEmployeeData) {
        console.log('Nuevo empleado a crear:', newEmployeeData);
        // --- TODO: Llamar API para crear el empleado con el objeto 'newEmployeeData' ---

        // --- Simulación de añadir localmente ---
        const newEmployee: EmployeeData = {
          id: Date.now(),
          name: newEmployeeData.personal.name,
          role: newEmployeeData.job.role,
          department: newEmployeeData.job.department,
          email: newEmployeeData.personal.email,
          status: 'active', // Por defecto 'activo'
          avatar: `https://i.pravatar.cc/80?u=${newEmployeeData.personal.email}`, // Avatar genérico
          goalProgress: 0, // Progreso inicial
          // ... (otros campos como hireDate, etc., si se devuelven)
        };
        // Añade al array principal y refresca la vista filtrada
        this.employees = [newEmployee, ...this.employees];
        this.applyFiltersAndSort();
      }
    });
  }
}