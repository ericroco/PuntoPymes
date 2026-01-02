import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Asegúrate de que la ruta sea correcta

interface UserConfig {
    theme?: 'light' | 'dark';
    lang?: 'es' | 'en';
    // Aquí podrás agregar más cosas a futuro (sidebarCollapsed, notifications, etc.)
}

@Injectable({
    providedIn: 'root' // Esto lo hace disponible en TODA la app (Sidebar, Navbar, Settings)
})
export class UserConfigService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/usuarios/configuracion`; // La ruta que creamos en el Gateway

    // Estado Reactivo (Para que los botones sepan si están activos o no)
    private configSubject = new BehaviorSubject<UserConfig>({ theme: 'light', lang: 'es' });
    public config$ = this.configSubject.asObservable();

    constructor() {
        // 1. Al iniciar la app, leemos del navegador (LocalStorage)
        // Esto evita el "parpadeo blanco" antes de que cargue el backend.
        this.loadFromLocalStorage();
    }

    /**
     * Se llama al hacer Login exitoso para traer la config real de la base de datos.
     */
    syncWithBackend(configFromDb: any) {
        if (configFromDb) {
            // Si la DB tiene datos, actualizamos el estado local
            const current = this.configSubject.value;
            const merged = { ...current, ...configFromDb };

            this.applyTheme(merged.theme);
            this.configSubject.next(merged);

            // Actualizamos localStorage para la próxima vez
            localStorage.setItem('user_config', JSON.stringify(merged));
        }
    }

    /**
     * Cambia el tema (Toggle) y guarda en Backend
     */
    toggleTheme() {
        const current = this.configSubject.value;
        const newTheme = current.theme === 'dark' ? 'light' : 'dark';

        // 1. Aplicar visualmente YA (Feedback instantáneo)
        this.applyTheme(newTheme);

        // 2. Actualizar estado
        const newConfig = { ...current, theme: newTheme };
        this.configSubject.next(newConfig as UserConfig);
        localStorage.setItem('user_config', JSON.stringify(newConfig));

        // 3. Guardar en Backend (Silenciosamente)
        this.http.patch(this.apiUrl, { theme: newTheme }).subscribe({
            error: (err) => console.error('Error guardando preferencia de tema', err)
        });
    }

    // --- Lógica Privada ---

    private loadFromLocalStorage() {
        const saved = localStorage.getItem('user_config');
        if (saved) {
            const config = JSON.parse(saved);
            this.configSubject.next(config);
            this.applyTheme(config.theme);
        } else {
            // Por defecto Light si es la primera vez en este PC
            this.applyTheme('light');
        }
    }

    private applyTheme(theme: string) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}