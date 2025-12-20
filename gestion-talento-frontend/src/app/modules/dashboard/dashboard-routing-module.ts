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
    path: 'my-profile', // URL: /dashboard/my-profile
    loadComponent: () => import('./pages/employee-profile/employee-profile').then(c => c.EmployeeProfile)
  },
  {
    path: 'recruitment',
    loadComponent: () => import('./pages/recruitment/recruitment').then(c => c.Recruitment)
  },
  {
    path: 'recruitment/new', // URL: /dashboard/recruitment/new
    loadComponent: () => import('./pages/create-vacancy/create-vacancy').then(c => c.CreateVacancy)
  },
  {
    path: 'recruitment/edit/:id', // Página de EDITAR
    loadComponent: () => import('./pages/create-vacancy/create-vacancy').then(c => c.CreateVacancy)
  },
  {
    path: 'recruitment/:id', // URL: /dashboard/recruitment/job-id-123
    loadComponent: () => import('./pages/vacancy-pipeline/vacancy-pipeline').then(c => c.VacancyPipeline)
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
    path: 'policies',
    loadComponent: () => import('./pages/policy-library/policy-library').then(c => c.PolicyLibrary)
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
    path: 'settings/branding', // Ruta completa
    loadComponent: () => import('./pages/settings/branding-settings/branding-settings').then(c => c.BrandingSettings)
  },
  {
    path: 'settings/modules', // Ruta completa
    loadComponent: () => import('./pages/settings/module-settings/module-settings').then(c => c.ModuleSettings)
  },
  {
    path: 'settings/users', // Ruta completa
    loadComponent: () => import('./pages/settings/user-settings/user-settings').then(c => c.UserSettings)
  },
  {
    path: 'settings/roles', // Ruta completa
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
    path: 'onboarding', // URL: /dashboard/onboarding
    loadComponent: () => import('./pages/onboarding-dashboard/onboarding-dashboard').then(c => c.OnboardingDashboard)
  },
  {
    path: 'assets', // URL: /dashboard/assets
    loadComponent: () => import('./pages/assets-management/assets-management').then(c => c.AssetsManagement)
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