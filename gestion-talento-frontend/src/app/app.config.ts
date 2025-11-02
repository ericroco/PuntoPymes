import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

// 1. IMPORTA EL TOKEN DE LOCALE
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),

    // 2. AÑADE ESTE PROVEEDOR
    // Esto configura el primer día de la semana (Lunes para 'es-EC')
    // y los formatos de fecha para toda la aplicación.
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' }
  ]
};