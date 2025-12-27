import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop'; // Opcional si quieres arrastrar el canvas
import { EmployeesService, OrganigramaNodo } from '../../services/employees';

interface OrganigramaNodoUI extends OrganigramaNodo {
  expanded?: boolean;
}

@Component({
  selector: 'app-organization-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DragDropModule
  ],
  templateUrl: './organization-chart.html',
  styleUrls: ['./organization-chart.scss']
})
export class OrganizationChartComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  chartData: OrganigramaNodoUI[] = [];
  zoomScale = 1;
  isLoading = true;

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.isLoading = true;
    // Simulación de carga o llamada real
    this.employeesService.getOrganigramaTree().subscribe({
      next: (data) => {
        this.chartData = this.initializeTreeState(data);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  initializeTreeState(nodes: OrganigramaNodo[]): OrganigramaNodoUI[] {
    return nodes.map(node => ({
      ...node,
      expanded: true, // Expandido por defecto
      children: node.children ? this.initializeTreeState(node.children) : []
    }));
  }

  toggleNode(node: OrganigramaNodoUI) {
    node.expanded = !node.expanded;
  }

  // Clases semánticas para el SCSS
  getNodeClass(node: OrganigramaNodo): string {
    if (!node.jefeId) return 'role-ceo'; // Nivel más alto
    if (node.children && node.children.length > 0) return 'role-manager'; // Tiene gente a cargo
    return 'role-employee'; // Contribuidor individual
  }

  // 🔥 AGREGADA: Lógica de Iniciales
  getInitials(nombre: string, apellido: string): string {
    const n = nombre ? nombre.charAt(0).toUpperCase() : '';
    const a = apellido ? apellido.charAt(0).toUpperCase() : '';
    return n + a || '??';
  }

  zoomIn() { if (this.zoomScale < 2) this.zoomScale += 0.1; }
  zoomOut() { if (this.zoomScale > 0.3) this.zoomScale -= 0.1; }
}