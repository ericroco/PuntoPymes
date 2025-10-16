import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';

const routes: Routes = [
  {
    // Cuando la ruta sea /auth/login, muestra el componente de Login
    path: 'login',
    component: Login
  },
  {
    // Si alguien entra a /auth, redirígelo a /auth/login
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }