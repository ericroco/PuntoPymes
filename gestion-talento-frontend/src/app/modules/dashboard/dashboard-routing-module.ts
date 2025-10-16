import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagement } from './pages/employee-management/employee-management';

const routes: Routes = [
  {
    path: 'overview',
    // Usamos loadComponent para cargar un componente standalone
    loadComponent: () => import('./pages/overview/overview').then(c => c.Overview)
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employee-management/employee-management').then(c => c.EmployeeManagement)
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }