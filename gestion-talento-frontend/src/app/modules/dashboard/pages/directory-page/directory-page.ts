import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para el buscador
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeesService, Employee, DirectorioEmpleado } from '../../services/employees';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-directory-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatIconModule, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatCardModule, MatTooltipModule, MatSelectModule
  ],
  templateUrl: './directory-page.html',
  styleUrls: ['./directory-page.scss']
})
export class DirectoryPageComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  allEmployees: DirectorioEmpleado[] = []; // Copia completa
  filteredEmployees: DirectorioEmpleado[] = []; // Copia filtrada para mostrar
  searchText = '';

  // Variables para el filtro de sucursal
  uniqueBranches: string[] = [];
  selectedBranch: string = ''; // '' significa "Todas"

  isLoading = true;

  ngOnInit() {
    this.loadDirectory();
  }

  loadDirectory() {
    this.employeesService.getDirectory().subscribe({
      next: (data) => {
        this.allEmployees = data;
        this.filteredEmployees = data;

        // Obtenemos los nombres, filtramos los que no existen (Boolean)
        // y le aseguramos a TS que el resultado es string[] usando "as string[]"
        const branches = data
          .map(e => e.sucursal?.nombre)
          .filter(nombre => !!nombre) as string[];

        this.uniqueBranches = [...new Set(branches)].sort();
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  // Filtro combinado (Texto + Sucursal)
  applyFilter() {
    const term = this.searchText.toLowerCase().trim();
    const branchFilter = this.selectedBranch;

    this.filteredEmployees = this.allEmployees.filter(emp => {
      // 1. Condición de Texto
      const matchesText = !term || (
        emp.nombre.toLowerCase().includes(term) ||
        emp.apellido.toLowerCase().includes(term) ||
        emp.cargo?.nombre?.toLowerCase().includes(term) ||
        emp.sucursal?.nombre?.toLowerCase().includes(term)
      );

      // 2. Condición de Sucursal
      const matchesBranch = !branchFilter || (emp.sucursal?.nombre === branchFilter);

      // Deben cumplirse AMBAS
      return matchesText && matchesBranch;
    });
  }

  // Acciones rápidas
  copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    // Aquí podrías mostrar un toast "Copiado"
  }

  sendMail(email: string) {
    window.location.href = `mailto:${email}`;
  }
}