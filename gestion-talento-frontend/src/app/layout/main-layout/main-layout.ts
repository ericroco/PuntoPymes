import { Component, ChangeDetectorRef, AfterViewChecked, inject, OnInit } from '@angular/core'; // Agrega OnInit
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar'
import { trigger, transition, style, query, animate } from '@angular/animations';
import { GlobalChatComponent } from '../../shared/components/global-chat/global-chat';

// 👇 IMPORTAR SERVICIOS
import { CompanyService } from '../../core/services/company';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Sidebar, GlobalChatComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' })
        ], { optional: true }),

        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
// 👇 Implementar OnInit
export class MainLayout implements AfterViewChecked, OnInit {
  private cdr = inject(ChangeDetectorRef);

  // 👇 INYECTAR SERVICIOS
  private companyService = inject(CompanyService);
  private themeService = inject(ThemeService);

  // 👇 LÓGICA DE CARGA DE BRANDING
  ngOnInit() {
    this.loadCompanyBranding();
  }

  loadCompanyBranding() {
    this.companyService.getMyCompany().subscribe({
      next: (company) => {
        // Asumiendo que tu backend devuelve un objeto 'configuracion' o campos directos
        // Ajusta 'company.branding' según la respuesta real de tu backend
        const branding = company.branding || company.configuracion?.branding || {};

        // 🔥 ESTA ES LA CLAVE: Forzar la aplicación del tema
        this.themeService.applyCompanyBranding({
          primaryColor: branding.primaryColor || '#E74C3C', // Fallback
          logoUrl: branding.logoUrl
        }, company.nombre);
      },
      error: (err) => console.error('Error cargando branding', err)
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}