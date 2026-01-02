import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withFetch, withInterceptors, HttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// 👇 1. IMPORTS DE TRADUCCIÓN (Solo el Core)
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs'; // Necesario para el cargador manual

// 👇 2. CARGADOR MANUAL (ELIMINAMOS EL ERROR DE LIBRERÍA)
// Esta clase pequeña reemplaza a TranslateHttpLoader y hace lo mismo: buscar el JSON.
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    // ✅ Quita el "./" y usa ruta absoluta desde assets
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

// 👇 3. FACTORY QUE USA NUESTRO CARGADOR MANUAL
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

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

    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' },

    // 👇 4. CONFIGURACIÓN DEL MÓDULO
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};