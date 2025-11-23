import { Component, ChangeDetectorRef, AfterViewChecked, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
// 👇 1. IMPORTAR ESTO
import { trigger, transition, style, query, animate } from '@angular/animations';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Sidebar],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  // 👇 2. AGREGAR ESTE BLOQUE 'animations'
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Estilo inicial para la página que entra
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' })
        ], { optional: true }),

        // Animación de entrada
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class MainLayout implements AfterViewChecked {
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // 👇 3. AGREGAR ESTE MÉTODO (Si lo usas en el HTML como prepareRoute(outlet))
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}