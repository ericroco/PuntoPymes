import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For search input ngModel
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; // For user list
import { MatFormFieldModule } from '@angular/material/form-field'; // For search
import { MatInputModule } from '@angular/material/input';       // For search
import { MatIconModule } from '@angular/material/icon';         // For search icon

// Simplified User interface for this modal
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-view-role-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add
    MatDialogModule,
    MatButtonModule,
    MatListModule, // Add
    MatFormFieldModule, // Add
    MatInputModule,    // Add
    MatIconModule      // Add
  ],
  templateUrl: './view-role-users-dialog.html',
  styleUrls: ['./view-role-users-dialog.scss']
})
export class ViewRoleUsersDialog implements OnInit {
  roleName: string = '';
  allUsersForRole: User[] = []; // Full list for the role (simulated)
  filteredUsers: User[] = [];   // List displayed after filtering
  searchTerm: string = '';      // Bound to search input

  constructor(
    public dialogRef: MatDialogRef<ViewRoleUsersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { roleName: string /*, roleId?: string */ }
  ) {
    this.roleName = data.roleName;
  }

  ngOnInit(): void {
    // --- TODO: Fetch users specifically for data.roleId from the backend ---
    // Simulate fetching users based on roleName for now
    this.allUsersForRole = this.getSampleUsers(this.roleName);
    this.filteredUsers = [...this.allUsersForRole]; // Initialize filtered list
  }

  // --- SIMULATION FUNCTION (Replace with API call) ---
  getSampleUsers(roleName: string): User[] {
    // In a real app, this would be an API call filtered by roleId
    const allPossibleUsers: User[] = [
      { id: 101, name: 'Erick Rodas', email: 'erick.admin@puntopymes.com', avatar: 'https://i.pravatar.cc/40?u=erickrodas'},
      { id: 102, name: 'Admin RRHH', email: 'rrhh.admin@puntopymes.com', avatar: 'https://i.pravatar.cc/40?u=adminrrhh' },
      { id: 103, name: 'Admin Nómina', email: 'nomina.admin@puntopymes.com', avatar: 'https://i.pravatar.cc/40?u=adminnomina' },
      { id: 201, name: 'Jeimy Torres', email: 'jtorres@empresa.com', avatar: 'https://i.pravatar.cc/40?u=jeimytorres'},
      { id: 202, name: 'Valentina Samaniego', email: 'vsamaniego@empresa.com', avatar: 'https://i.pravatar.cc/40?u=valentinasamaniego'},
       { id: 203, name: 'Gabriela Loyola', email: 'gloyola@empresa.com', avatar: 'https://i.pravatar.cc/40?u=gabrielaloyola'},
      // Add more users...
    ];
    // Simple filtering simulation
    if (roleName === 'Superadministrador') return allPossibleUsers.filter(u => u.id === 101);
    if (roleName === 'Admin de RRHH') return allPossibleUsers.filter(u => u.id === 102);
    if (roleName === 'Admin de Nómina') return allPossibleUsers.filter(u => u.id === 103);
    if (roleName === 'Jefe de Equipo/Área') return allPossibleUsers.filter(u => u.id === 4); // Assuming Erick is manager
    // Default: return a subset for other roles or empty
    return allPossibleUsers.slice(3);
  }
  // --- END SIMULATION ---

  // Filter users based on search term
  applyFilter(): void {
    const lowerSearch = this.searchTerm.toLowerCase();
    this.filteredUsers = this.allUsersForRole.filter(user =>
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  }

  // Simple close function
  close(): void {
    this.dialogRef.close();
  }
}