import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Overview } from './pages/overview/overview'; // Mantenemos la importación

@NgModule({
  declarations: [
    // LO QUITAMOS DE AQUÍ
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Overview // Y LO AÑADIMOS AQUÍ
  ]
})
export class DashboardModule { }