import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core'; // 👈 Importante

interface UserConfig {
    theme?: 'light' | 'dark';
    lang?: 'es' | 'en';
}

@Injectable({
    providedIn: 'root'
})
export class UserConfigService {
    private http = inject(HttpClient);
    private translate = inject(TranslateService); // 👈 Inyectamos el servicio de traducción
    private apiUrl = `${environment.apiUrl}/usuarios/configuracion`;

    // Estado Reactivo
    private configSubject = new BehaviorSubject<UserConfig>({ theme: 'light', lang: 'es' });
    public config$ = this.configSubject.asObservable();

    constructor() {
        // 1. Configuración inicial de idiomas
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang('es');

        // 2. Al iniciar la app, leemos del navegador
        this.loadFromLocalStorage();
    }

    /**
     * Se llama al hacer Login exitoso para traer la config real de la base de datos.
     */
    syncWithBackend(configFromDb: any) {
        if (configFromDb) {
            const current = this.configSubject.value;
            // Fusionamos lo local con lo que viene de la DB
            const merged: UserConfig = { ...current, ...configFromDb };

            // Aplicamos visualmente (sin guardar en backend de nuevo)
            this.applyTheme(merged.theme);

            // Si viene idioma, lo aplicamos
            if (merged.lang) {
                this.translate.use(merged.lang);
            }

            // Actualizamos estado y localStorage
            this.configSubject.next(merged);
            localStorage.setItem('user_config', JSON.stringify(merged));
        }
    }

    /**
     * Cambia el tema (Toggle) y guarda
     */
    toggleTheme() {
        const current = this.configSubject.value;
        const newTheme = current.theme === 'dark' ? 'light' : 'dark';

        // 1. Aplicar visualmente
        this.applyTheme(newTheme);

        // 2. Actualizar todo (Estado, LocalStorage, Backend)
        this.updateConfig({ ...current, theme: newTheme });
    }

    /**
     * Cambia el idioma y guarda (NUEVO MÉTODO)
     */
    setLanguage(lang: 'es' | 'en') {
        const current = this.configSubject.value;

        // 1. Si ya es el mismo idioma, no hacemos nada
        if (current.lang === lang) return;

        // 2. Aplicar idioma en la librería
        this.translate.use(lang);

        // 3. Actualizar todo (Estado, LocalStorage, Backend)
        this.updateConfig({ ...current, lang: lang });
    }

    // --- Lógica Privada ---

    /**
     * Centraliza la lógica de guardar cambios (LocalStorage + Backend)
     */
    private updateConfig(newConfig: UserConfig) {
        // A. Actualizamos el Subject (para que la UI reaccione)
        this.configSubject.next(newConfig);

        // B. Guardamos en el navegador (para recargas)
        localStorage.setItem('user_config', JSON.stringify(newConfig));

        // C. Guardamos en el Backend (Persistencia de usuario)
        this.http.patch(this.apiUrl, newConfig).subscribe({
            error: (err) => console.error('Error guardando configuración de usuario', err)
        });
    }

    private loadFromLocalStorage() {
        const saved = localStorage.getItem('user_config');
        if (saved) {
            const config = JSON.parse(saved);
            this.configSubject.next(config);

            // Aplicar Tema guardado
            this.applyTheme(config.theme);

            // Aplicar Idioma guardado
            if (config.lang) {
                this.translate.use(config.lang);
            }
        } else {
            // Valores por defecto
            this.applyTheme('light');
            this.translate.use('es');
        }
    }

    private applyTheme(theme: string | undefined) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}