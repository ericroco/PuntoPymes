import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization-chart.html',
  styleUrls: ['./organization-chart.scss']
})
export class OrganizationChart {
  // Sample hierarchical data
  // In a real app, this would come from an API
  chartData = [
    {
      name: 'Erick Rodas',
      cssClass: 'level-ceo',
      image: 'https://i.pravatar.cc/80?u=erickrodas',
      title: 'Líder de Proyecto',
      childs: [
        {
          name: 'Jeimy Torres',
          cssClass: 'level-manager',
          image: 'https://i.pravatar.cc/80?u=jeimytorres',
          title: 'Desarrolladora Frontend',
          childs: []
        },
        {
          name: 'Valentina Samaniego',
          cssClass: 'level-manager',
          image: 'https://i.pravatar.cc/80?u=valentinasamaniego',
          title: 'Diseñadora UX/UI',
          childs: [
            {
              name: 'Nuevo Diseñador Jr.',
              cssClass: 'level-employee',
              image: 'https://i.pravatar.cc/80?u=nuevodisenador',
              title: 'Diseñador Junior',
              childs: []
            }
          ]
        },
        {
          name: 'Gabriela Loyola',
          cssClass: 'level-manager',
          image: 'https://i.pravatar.cc/80?u=gabrielaloyola',
          title: 'Contadora Principal',
          childs: []
        }
      ]
    }
  ];
}