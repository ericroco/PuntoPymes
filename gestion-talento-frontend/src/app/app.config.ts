import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    // 2. AÑADE ESTE PROVEEDOR
    // Esto configura el primer día de la semana (Lunes para 'es-EC')
    // y los formatos de fecha para toda la aplicación.
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' }
  ]
};