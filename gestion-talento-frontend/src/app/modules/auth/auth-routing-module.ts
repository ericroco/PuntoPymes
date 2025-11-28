import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateCompanyComponent } from './pages/create-company/create-company';
import { RegisterComponent } from './pages/register/register';
import { CompanySelectorComponent } from './pages/company-selector/company-selector';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create-company',
    component: CreateCompanyComponent
  },
  {
    path: 'select-company',
    component: CompanySelectorComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }