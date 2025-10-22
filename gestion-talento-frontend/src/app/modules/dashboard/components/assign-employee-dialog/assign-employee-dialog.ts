import { Component, Inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 

interface Employee { id: number; name: string; avatar: string; department: string; role: string; }

@Component({
  selector: 'app-assign-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule, 
    MatInputModule,    
    MatSelectModule    
  ],
  templateUrl: './assign-employee-dialog.html',
  styleUrls: ['./assign-employee-dialog.scss']
})
export class AssignEmployeeDialog implements OnInit { 
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployeeIds: { [key: number]: boolean } = {};

  // --- NEW PROPERTIES FOR FILTERING ---
  searchTerm: string = '';
  selectedDepartment: string = 'todos'; 
  departments: string[] = ['todos'];

  constructor(
    public dialogRef: MatDialogRef<AssignEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { sprintId: string, currentlyAssignedIds: number[] }
  ) {}

  ngOnInit(): void {
    this.allEmployees = [
       { id: 1, name: 'Jeimy Torres', avatar: '...', department: 'Tecnología', role: 'Frontend Dev' },
       { id: 2, name: 'Valentina Samaniego', avatar: '...', department: 'Diseño', role: 'UX/UI Designer' },
       { id: 3, name: 'Gabriela Loyola', avatar: '...', department: 'Contabilidad', role: 'Contadora' },
       { id: 4, name: 'Erick Rodas', avatar: '...', department: 'Tecnología', role: 'Project Lead' },
       { id: 5, name: 'Carlos Backend', avatar: '...', department: 'Tecnología', role: 'Backend Dev' },
       { id: 6, name: 'Andrea Marketing', avatar: '...', department: 'Marketing', role: 'Specialist' },
    ];

    // Populate departments list dynamically
    const deptSet = new Set(this.allEmployees.map(e => e.department));
    this.departments = ['todos', ...Array.from(deptSet)];

    // Initialize checkboxes
    this.data.currentlyAssignedIds.forEach(id => {
      this.selectedEmployeeIds[id] = true;
    });

    // Initial filter application
    this.applyFilters();
  }

  // --- NEW FILTERING LOGIC ---
  applyFilters(): void {
    let tempEmployees = [...this.allEmployees];

    // Filter by search term (name)
    if (this.searchTerm) {
      const lowerSearch = this.searchTerm.toLowerCase();
      tempEmployees = tempEmployees.filter(emp =>
        emp.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by department
    if (this.selectedDepartment && this.selectedDepartment !== 'todos') {
      tempEmployees = tempEmployees.filter(emp =>
        emp.department === this.selectedDepartment
      );
    }

    this.filteredEmployees = tempEmployees;
  }

  // --- SELECTION LOGIC (using selectedEmployeeIds object) ---
  toggleSelection(employeeId: number): void {
     this.selectedEmployeeIds[employeeId] = !this.selectedEmployeeIds[employeeId];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const selectedEmployees = this.allEmployees.filter(emp => this.selectedEmployeeIds[emp.id]);
    this.dialogRef.close(selectedEmployees);
  }
}