import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
 
  
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/main-layout/main-layout').then(c => c.MainLayout),
    loadChildren: () => import('./modules/dashboard/dashboard-routing-module').then(r => r.DashboardRoutingModule)
  },

  // Si alguien entra a la URL raíz, lo enviamos a /auth
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Si la URL no coincide con ninguna anterior, también lo enviamos a /auth
  {
    path: '**',
    redirectTo: 'auth'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }