import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeDialog } from '../../components/add-employee-dialog/add-employee-dialog';
import { RouterModule } from '@angular/router';

interface EmployeeData {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string; // Keep email for potential use, but maybe hide on card
  status: 'active' | 'vacation' | 'inactive';
  avatar: string;
  goalProgress: number; // Add KPI: Goal progress percentage
}
@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, RouterModule ],
  templateUrl: './employee-management.html',
  styleUrls: ['./employee-management.scss'],
  animations: [ // Renamed trigger to cardAnimation
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('75ms', [ // Stagger effect for cards
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
    // Add more employees...
  ];
  constructor(public dialog: MatDialog) { }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
}