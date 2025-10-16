import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Overview } from './pages/overview/overview';
import { EmployeeManagement } from './pages/employee-management/employee-management';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Overview,
    EmployeeManagement
  ]
})
export class DashboardModule { }