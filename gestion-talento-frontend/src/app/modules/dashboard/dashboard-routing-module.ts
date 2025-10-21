import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagement } from './pages/employee-management/employee-management';

const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview/overview').then(c => c.Overview)
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employee-management/employee-management').then(c => c.EmployeeManagement)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks-productivity/tasks-productivity').then(c => c.TasksProductivity)
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(c => c.Reports)
  },
  {
    path: 'goals',
    loadComponent: () => import('./pages/goals/goals').then(c => c.Goals)
  },
  {
    path: 'employee/:id',
    loadComponent: () => import('./pages/employee-profile/employee-profile').then(c => c.EmployeeProfile)
  },
  {
    path: 'recruitment',
    loadComponent: () => import('./pages/recruitment/recruitment').then(c => c.Recruitment)
  },
  {
    path: 'surveys',
    loadComponent: () => import('./pages/surveys/surveys').then(c => c.Surveys)
  },
  {
    path: 'organization-chart',
    loadComponent: () => import('./pages/organization-chart/organization-chart').then(c => c.OrganizationChart)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-catalog/course-catalog').then(c => c.CourseCatalog)
  },
  {
    path: 'payroll',
    loadComponent: () => import('./pages/payroll/payroll').then(c => c.Payroll)
  },
  {
    path: 'benefits',
    loadComponent: () => import('./pages/benefits/benefits').then(c => c.Benefits)
  },
  {
    path: 'timesheet',
    loadComponent: () => import('./pages/timesheet/timesheet').then(c => c.Timesheet)
  },
  {
    path: 'career-paths',
    loadComponent: () => import('./pages/career-paths/career-paths').then(c => c.CareerPaths)
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