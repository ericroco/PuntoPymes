import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'sprints',
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
    path: 'my-profile',
    loadComponent: () => import('./pages/employee-profile/employee-profile').then(c => c.EmployeeProfile)
  },
  {
    path: 'recruitment',
    loadComponent: () => import('./pages/recruitment/recruitment').then(c => c.Recruitment)
  },
  {
    path: 'recruitment/new',
    loadComponent: () => import('./pages/create-vacancy/create-vacancy').then(c => c.CreateVacancy)
  },
  {
    path: 'recruitment/edit/:id',
    loadComponent: () => import('./pages/create-vacancy/create-vacancy').then(c => c.CreateVacancy)
  },
  {
    path: 'recruitment/:id',
    loadComponent: () => import('./pages/vacancy-pipeline/vacancy-pipeline').then(c => c.VacancyPipeline)
  },
  {
    path: 'surveys',
    loadComponent: () => import('./pages/surveys/surveys').then(c => c.Surveys)
  },
  {
    path: 'organization-chart',
    loadComponent: () => import('./pages/organization-chart/organization-chart').then(c => c.OrganizationChartComponent)
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
    path: 'benefits/assign/:id',
    loadComponent: () => import('./pages/benefit-assignment/benefit-assignment').then(c => c.BenefitAssignment)
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
    path: 'sprints/:sprintId',
    loadComponent: () => import('./pages/sprint-board/sprint-board').then(c => c.SprintBoard)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings').then(c => c.Settings)
  },
  {
    path: 'settings/branding',
    loadComponent: () => import('./pages/settings/branding-settings/branding-settings').then(c => c.BrandingSettings)
  },
  {
    path: 'settings/modules',
    loadComponent: () => import('./pages/settings/module-settings/module-settings').then(c => c.ModuleSettings)
  },
  {
    path: 'settings/roles',
    loadComponent: () => import('./pages/settings/role-settings/role-settings').then(c => c.RoleSettings)
  },
  {
    path: 'settings/profile-fields',
    loadComponent: () => import('./pages/settings/profile-settings/profile-settings').then(c => c.ProfileSettings)
  },
  {
    path: 'settings/attendance',
    loadComponent: () => import('./pages/settings/attendance-settings/attendance-settings').then(c => c.AttendanceSettings)
  },
  {
    path: 'settings/payroll',
    loadComponent: () => import('./pages/settings/payroll-settings/payroll-settings').then(c => c.PayrollSettings)
  },
  {
    path: 'settings/jobs',
    loadComponent: () => import('./pages/settings/job-settings/job-settings').then(c => c.JobSettings)
  },
  {
    path: 'settings/vacation',
    loadComponent: () => import('./pages/settings/vacation-settings/vacation-settings').then(c => c.VacationSettingsComponent)
  },
  {
    path: 'settings/kpis',
    loadComponent: () => import('./pages/settings/kpis-settings/kpis-settings').then(c => c.KpisSettings)
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding-dashboard/onboarding-dashboard').then(c => c.OnboardingDashboard)
  },
  {
    path: 'assets',
    loadComponent: () => import('./pages/assets-management/assets-management').then(c => c.AssetsManagement)
  },
  {
    path: 'branches',
    loadComponent: () => import('../organization/pages/branches-list/branches-list')
      .then(m => m.BranchesListComponent),
  },
  {
    path: 'documents',
    loadComponent: () => import('../resources/pages/documents-page/documents-page')
      .then(m => m.DocumentsPageComponent)
  },
  {
    path: 'policies',
    loadComponent: () => import('./pages/policies-page/policies-page')
      .then(m => m.PoliciesPageComponent)
  },
  {
    path: 'company-directory',
    loadComponent: () => import('./pages/directory-page/directory-page')
      .then(m => m.DirectoryPageComponent)
  },
  {
    path: 'announcements',
    loadComponent: () => import('./pages/announcements/announcements')
      .then(m => m.AnnouncementsPage)
  },

  // 👇 NUEVAS RUTAS DE GESTIÓN (Aprobaciones y Gastos) 👇
  {
    path: 'approvals', // Centro de Aprobaciones (Para Jefes)
    loadComponent: () => import('./pages/approvals/approvals')
      .then(c => c.ApprovalsPage)
  },
  {
    path: 'my-expenses', // Mis Gastos (Para Empleados - Lista)
    loadComponent: () => import('./pages/my-expenses/my-expenses')
      .then(c => c.MyExpensesPage)
  },
  {
    path: 'expenses/:id', // Detalle de un Reporte (Para Empleados - Agregar Facturas)
    loadComponent: () => import('./pages/expenses-detail/expenses-detail')
      .then(c => c.ExpensesDetailPage)
  },

  // 👇 SIEMPRE AL FINAL 👇
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