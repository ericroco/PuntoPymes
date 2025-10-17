import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Overview } from './pages/overview/overview';
import { EmployeeManagement } from './pages/employee-management/employee-management';
import { TasksProductivity } from './pages/tasks-productivity/tasks-productivity';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Overview,
    EmployeeManagement,
    TasksProductivity,
  ]
})
export class DashboardModule { }