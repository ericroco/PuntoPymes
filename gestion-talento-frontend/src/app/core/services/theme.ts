// src/app/core/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    // Observables para componentes reactivos
    private primaryColorSubject = new BehaviorSubject<string>('#E74C3C');
    public primaryColor$: Observable<string> = this.primaryColorSubject.asObservable();

    private companyLogoSubject = new BehaviorSubject<string | null>(null);
    public companyLogo$: Observable<string | null> = this.companyLogoSubject.asObservable();

    private companyNameSubject = new BehaviorSubject<string>('TalenTrack');
    public companyName$: Observable<string> = this.companyNameSubject.asObservable();

    constructor() {
        // Inicializar cargando del storage
        this.loadFromStorage();
    }

    /**
     * Carga el tema al iniciar la app (F5)
     */
    private loadFromStorage(): void {
        try {
            // 1. Intentamos leer el objeto nuevo (JSON)
            const brandingJson = localStorage.getItem('companyBranding');
            const storedName = localStorage.getItem('companyName');

            if (brandingJson) {
                const data = JSON.parse(brandingJson);
                // Aplicamos sin volver a guardar en storage (false)
                if (data.primaryColor) this.setPrimaryColor(data.primaryColor, false);
                if (data.logoUrl) this.setLogo(data.logoUrl, false);
            } else {
                // 2. Fallback: Intentamos leer claves sueltas (formato antiguo)
                const legacyColor = localStorage.getItem('primaryColor');
                const legacyLogo = localStorage.getItem('companyLogo');

                if (legacyColor) this.setPrimaryColor(legacyColor, false);
                else this.initializeDefaultTheme();

                if (legacyLogo) this.setLogo(legacyLogo, false);
            }

            if (storedName) {
                this.companyNameSubject.next(storedName);
            }
        } catch (e) {
            console.warn('Error leyendo storage de tema', e);
            this.initializeDefaultTheme();
        }
    }

    private initializeDefaultTheme(): void {
        const defaultColor = '#E74C3C';
        this.setPrimaryColor(defaultColor, false);
    }

    /**
     * Establece el color primario, actualiza CSS y LocalStorage
     * @param saveToStorage Si es true, guarda en localStorage (usar al editar). Si es false, solo aplica visual (usar al cargar).
     */
    setPrimaryColor(color: string, saveToStorage: boolean = true): void {
        if (!color || !this.isValidHexColor(color)) {
            console.warn(`Color inválido: ${color}. Usando color por defecto.`);
            color = '#E74C3C';
        }

        // --- 1. ACTUALIZACIÓN VISUAL INMEDIATA (CSS) ---
        const root = document.documentElement;

        // Variable principal
        root.style.setProperty('--primary-color', color);

        // Mapeos para tu nuevo SCSS y Material
        root.style.setProperty('--color-primary', color);
        root.style.setProperty('--mat-sys-primary', color);
        root.style.setProperty('--mdc-protected-button-container-color', color);

        // Generar variante oscura (Tu lógica original)
        const darkerColor = this.darkenColor(color, -20);
        root.style.setProperty('--primary-color-dark', darkerColor);
        root.style.setProperty('--color-primary-dark', darkerColor);

        // Generar RGB para opacidades
        const rgb = this.hexToRgb(color);
        if (rgb) {
            root.style.setProperty(
                '--color-primary-rgb',
                `${rgb.r}, ${rgb.g}, ${rgb.b}`
            );
        }

        // --- 2. ACTUALIZACIÓN REACTIVA ---
        this.primaryColorSubject.next(color);

        // --- 3. PERSISTENCIA (LocalStorage) ---
        if (saveToStorage) {
            // Guardamos en el objeto JSON companyBranding
            this.updateBrandingStorage({ primaryColor: color });
            // Guardamos también la clave suelta por si acaso
            localStorage.setItem('primaryColor', color);

            console.log(`✅ Color aplicado y guardado: ${color}`);
        }
    }

    /**
     * Actualiza el logo
     */
    setLogo(logoUrl: string | null, saveToStorage: boolean = true): void {
        this.companyLogoSubject.next(logoUrl);

        if (saveToStorage) {
            this.updateBrandingStorage({ logoUrl: logoUrl });

            if (logoUrl) localStorage.setItem('companyLogo', logoUrl);
            else localStorage.removeItem('companyLogo');
        }
    }

    /**
     * Helper para actualizar parcialmente el JSON en localStorage
     */
    private updateBrandingStorage(changes: { primaryColor?: string, logoUrl?: string | null }) {
        try {
            const currentStr = localStorage.getItem('companyBranding');
            const currentData = currentStr ? JSON.parse(currentStr) : {};

            const newData = { ...currentData, ...changes };
            localStorage.setItem('companyBranding', JSON.stringify(newData));
        } catch (e) {
            console.error('Error guardando branding json', e);
        }
    }

    /**
     * Actualiza el nombre de la empresa
     */
    setCompanyName(name: string): void {
        this.companyNameSubject.next(name);
        localStorage.setItem('companyName', name);
    }

    /**
     * Aplica todo el branding (usar tras login)
     */
    applyCompanyBranding(branding: { logoUrl?: string | null; primaryColor?: string }, companyName?: string): void {
        if (branding.primaryColor) {
            this.setPrimaryColor(branding.primaryColor);
        }
        if (branding.logoUrl !== undefined) {
            this.setLogo(branding.logoUrl);
        }
        if (companyName) {
            this.setCompanyName(companyName);
        }
        console.log('✅ Branding completo aplicado');
    }

    /**
     * Restaura desde storage (para AppComponent)
     */
    restoreBrandingFromStorage(): boolean {
        this.loadFromStorage();
        return true;
    }

    /**
     * Limpia todo (Logout)
     */
    clearBranding(): void {
        localStorage.removeItem('primaryColor');
        localStorage.removeItem('companyLogo');
        localStorage.removeItem('companyName');
        localStorage.removeItem('companyBranding');

        this.initializeDefaultTheme();
        this.companyLogoSubject.next(null);
        this.companyNameSubject.next('TalenTrack');
    }

    /**
     * Recarga la página actual (Útil si quieres forzar limpieza de caché visual)
     */
    reloadPage(): void {
        window.location.reload();
    }

    // ============================================
    // GETTERS (Tus funciones originales intactas)
    // ============================================

    getCurrentPrimaryColor(): string {
        return this.primaryColorSubject.value;
    }

    getCurrentLogo(): string | null {
        return this.companyLogoSubject.value;
    }

    getCurrentCompanyName(): string {
        return this.companyNameSubject.value;
    }

    // ============================================
    // UTILIDADES DE COLOR (Tus funciones originales intactas)
    // ============================================

    private isValidHexColor(hex: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    private darkenColor(col: string, amt: number): string {
        let usePound = false;
        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }
        let num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255; else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255; else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255; else if (g < 0) g = 0;
        const result = (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
        return (usePound ? '#' : '') + result;
    }

    rgbToHex(r: number, g: number, b: number): string {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    isLightColor(hex: string): boolean {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return true;
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        return luminance > 0.5;
    }

    lightenColor(hex: string, percent: number = 85): string {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        const factor = percent / 100;
        return this.rgbToHex(
            Math.round(rgb.r + (255 - rgb.r) * factor),
            Math.round(rgb.g + (255 - rgb.g) * factor),
            Math.round(rgb.b + (255 - rgb.b) * factor)
        );
    }
}