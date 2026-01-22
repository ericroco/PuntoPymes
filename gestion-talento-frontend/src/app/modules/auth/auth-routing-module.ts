import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateCompanyComponent } from './pages/create-company/create-company';
import { RegisterComponent } from './pages/register/register';
import { CompanySelectorComponent } from './pages/company-selector/company-selector';
import { ChangePasswordComponent } from './pages/change-password/change-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';

const routes: Routes = [
  // Rutas Públicas
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },

  // Rutas Protegidas (Requieren Token)
  {
    path: 'create-company',
    component: CreateCompanyComponent,
  },
  {
    path: 'select-company',
    component: CompanySelectorComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }