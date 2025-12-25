import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importa tu servicio de Auth
import { AuthService } from './modules/auth/services/auth';
import { ThemeService } from './core/services/theme';

@Component({
  selector: 'app-root',
  standalone: true, // Esto ya lo tenías implícito o explícito
  imports: [RouterOutlet],
  templateUrl: './app.html', // Verifica si es .html o .component.html en tu proyecto
  styleUrl: './app.scss'     // Verifica si es .scss o .css
})
export class App implements OnInit {
  protected readonly title = signal('gestion-talento-frontend');

  // Inyectamos el servicio
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Lógica para aplicar el tema guardado al recargar la página (F5)
    this.applyStoredTheme();
    this.themeService.getCurrentPrimaryColor();
  }

  private applyStoredTheme() {
    const brandingStr = localStorage.getItem('companyBranding');

    if (brandingStr) {
      try {
        const branding = JSON.parse(brandingStr);

        // Si existe un color primario guardado, lo aplicamos al CSS global
        if (branding.primaryColor) {
          document.documentElement.style.setProperty('--color-primary', branding.primaryColor);
          // Aquí podrías aplicar más variables si las tienes (secondary, accent, etc.)
        }
      } catch (e) {
        console.error('Error al leer branding local:', e);
      }
    }
  }
}