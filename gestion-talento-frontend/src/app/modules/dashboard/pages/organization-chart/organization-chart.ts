import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService, OrganigramaNodo } from '../../services/employees';

// Extendemos la interfaz solo para la vista (UI State)
interface OrganigramaNodoUI extends OrganigramaNodo {
  expanded?: boolean; // Para controlar si se muestran sus hijos
}

@Component({
  selector: 'app-organization-chart',
  standalone: true,
  imports: [CommonModule], // Agrega MatIconModule si quieres íconos
  templateUrl: './organization-chart.html',
  styleUrls: ['./organization-chart.scss']
})
export class OrganizationChart implements OnInit {
  private employeesService = inject(EmployeesService);

  chartData: OrganigramaNodoUI[] = [];
  zoomScale = 1;
  isLoading = true;

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.isLoading = true;
    this.employeesService.getOrganigramaTree().subscribe({
      next: (data) => {
        // Inicializamos todos como expandidos por defecto
        this.chartData = this.initializeTreeState(data);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  // Función recursiva para añadir la propiedad 'expanded' a todos
  initializeTreeState(nodes: OrganigramaNodo[]): OrganigramaNodoUI[] {
    return nodes.map(node => ({
      ...node,
      expanded: true, // Por defecto abierto
      children: node.children ? this.initializeTreeState(node.children) : []
    }));
  }

  toggleNode(node: OrganigramaNodoUI) {
    node.expanded = !node.expanded;
  }

  // ... (Mantén tus funciones de zoom y getNodeClass igual)
  getNodeClass(node: OrganigramaNodo): string {
    if (!node.jefeId) return 'level-ceo';
    if (node.children && node.children.length > 0) return 'level-manager';
    return 'level-employee';
  }

  zoomIn() { if (this.zoomScale < 2) this.zoomScale += 0.1; }
  zoomOut() { if (this.zoomScale > 0.5) this.zoomScale -= 0.1; }
}