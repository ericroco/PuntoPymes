import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeDialog } from '../../components/add-employee-dialog/add-employee-dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './employee-management.html',
  styleUrls: ['./employee-management.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger('50ms', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EmployeeManagement {
  employees = [
    { id: 1, name: 'Jeimy Torres', role: 'Desarrolladora Frontend', department: 'Tecnología', email: 'jtorres@empresa.com', status: 'active' },
    { id: 2, name: 'Valentina Samaniego', role: 'Diseñadora UX/UI', department: 'Diseño', email: 'vsamaniego@empresa.com', status: 'active' },
    { id: 3, name: 'Gabriela Loyola', role: 'Contadora Principal', department: 'Contabilidad', email: 'gloyola@empresa.com', status: 'vacation' },
    { id: 4, name: 'Erick Rodas', role: 'Líder de Proyecto', department: 'Tecnología', email: 'erodas@empresa.com', status: 'inactive' }
  ];
  constructor(public dialog: MatDialog) {}

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