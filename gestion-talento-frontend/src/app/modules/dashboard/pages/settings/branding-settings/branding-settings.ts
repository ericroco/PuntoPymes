import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';

import { CompanyService } from '../../../../../../app/core/services/company';
import { ThemeService } from '../../../../../../app/core/services/theme';
import { switchMap, of, tap, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-branding-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SubpageHeader,
  ],
  templateUrl: './branding-settings.html',
  styleUrls: ['./branding-settings.scss']
})
export class BrandingSettings implements OnInit {
  private companyService = inject(CompanyService);
  private themeService = inject(ThemeService);
  private snackBar = inject(MatSnackBar);

  // Estado del componente
  companyLogo: string | null = null;
  primaryColor: string = '#E74C3C';
  selectedFile: File | null = null;
  isLoading = false;
  isSaving = false;

  // Colores predefinidos para selección rápida
  presetColors = [
    { name: 'Rojo TalenTrack', value: '#E74C3C' },
    { name: 'Azul Corporativo', value: '#3498DB' },
    { name: 'Verde Empresarial', value: '#27AE60' },
    { name: 'Morado Moderno', value: '#9B59B6' },
    { name: 'Naranja Energético', value: '#E67E22' },
    { name: 'Turquesa', value: '#1ABC9C' },
    { name: 'Índigo', value: '#5C6BC0' },
    { name: 'Rosa', value: '#EC407A' },
  ];

  // Estado original para detectar cambios
  private originalColor: string = '#E74C3C';
  private originalLogo: string | null = null;

  ngOnInit(): void {
    this.loadSettings();
  }

  /**
   * Carga la configuración actual de la empresa
   */
  loadSettings(): void {
    this.isLoading = true;

    this.companyService.getMyCompany().subscribe({
      next: (empresa) => {
        if (empresa.branding) {
          // Guardar valores originales
          this.originalLogo = empresa.branding.logoUrl || null;
          this.originalColor = empresa.branding.primaryColor || '#E74C3C';

          // Aplicar a UI
          this.companyLogo = this.originalLogo;
          this.primaryColor = this.originalColor;

          // NO aplicar al theme aquí, ya debería estar aplicado desde el login
          // Solo si realmente es diferente del actual
          const currentColor = this.themeService.getCurrentPrimaryColor();
          if (currentColor !== this.primaryColor) {
            this.themeService.setPrimaryColor(this.primaryColor);
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando empresa:', err);
        this.snackBar.open('Error al cargar configuración', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  /**
   * Maneja la selección del archivo de logo
   */
  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      this.snackBar.open(
        'Formato no válido. Usa JPG, PNG, WebP o SVG',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    // Validar tamaño (2MB máximo)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.snackBar.open(
        'El logo debe pesar menos de 2MB',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    this.selectedFile = file;

    // Preview local inmediato
    const reader = new FileReader();
    reader.onload = () => {
      this.companyLogo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Preview del color en tiempo real (sin guardar)
   */
  onColorChange(color: string): void {
    // Aplicar preview temporal
    this.themeService.setPrimaryColor(color);
  }

  /**
   * Selecciona un color predefinido
   */
  selectPresetColor(color: string): void {
    this.primaryColor = color;
    this.onColorChange(color);
  }

  /**
   * Verifica si hay cambios sin guardar
   */
  hasUnsavedChanges(): boolean {
    return (
      this.primaryColor !== this.originalColor ||
      this.selectedFile !== null
    );
  }

  /**
     * Guarda la configuración de branding
     */
  saveBranding(): void {
    if (!this.hasUnsavedChanges() && !this.selectedFile) {
      this.snackBar.open('No hay cambios para guardar', 'Cerrar', {
        duration: 2000
      });
      return;
    }

    this.isSaving = true;

    // PASO 1: Upload de logo
    const uploadTask$ = this.selectedFile
      ? this.companyService.uploadLogo(this.selectedFile)
      : of({ url: this.companyLogo });

    uploadTask$.pipe(
      // PASO 2: Construir payload
      switchMap((uploadResult: any) => {
        let finalLogoUrl: string | undefined = undefined;

        if (this.selectedFile && uploadResult.url) {
          finalLogoUrl = uploadResult.url;
        } else if (this.companyLogo && this.companyLogo.startsWith('http')) {
          // Si tiene timestamp viejo, lo limpiamos antes de mandar al back
          finalLogoUrl = this.companyLogo.split('?')[0];
        }

        const payload = {
          logoUrl: finalLogoUrl,
          primaryColor: this.primaryColor
        };

        return this.companyService.updateBranding(payload);
      }),

      // PASO 3: Aplicar cambios (AQUÍ ESTÁ LA CORRECCIÓN 🔧)
      tap((updatedCompany: any) => {

        const rawLogoUrl = updatedCompany.branding?.logoUrl;

        if (rawLogoUrl) {
          // 🔥 EL TRUCO: Agregamos ?t=hora_actual
          // Esto engaña al navegador para que crea que es una imagen nueva y la descargue sí o sí.
          const timestamp = new Date().getTime();
          const logoWithTimestamp = `${rawLogoUrl}?t=${timestamp}`;

          // 1. Actualizamos la variable local para que se vea YA en este componente
          this.companyLogo = logoWithTimestamp;

          // 2. Guardamos el original limpio para detectar cambios futuros
          this.originalLogo = rawLogoUrl;

          // 3. Actualizamos el servicio global (Navbar, Sidebar, etc) con el timestamp
          this.themeService.applyCompanyBranding(
            {
              logoUrl: logoWithTimestamp, // <--- Enviamos la URL con truco
              primaryColor: updatedCompany.branding?.primaryColor
            },
            updatedCompany.nombre
          );
        } else {
          // Si se borró el logo
          this.companyLogo = null;
          this.originalLogo = null;
          this.themeService.applyCompanyBranding(updatedCompany.branding, updatedCompany.nombre);
        }

        this.originalColor = this.primaryColor;
      }),

      catchError((error) => {
        console.error('Error al guardar branding:', error);
        this.themeService.setPrimaryColor(this.originalColor);
        this.primaryColor = this.originalColor;

        // Restauramos logo original si falla
        if (this.originalLogo) {
          this.companyLogo = this.originalLogo;
        }

        this.snackBar.open('Error al guardar configuración.', 'Cerrar', { duration: 4000 });
        return of(null);
      }),

      finalize(() => {
        this.isSaving = false;
        this.selectedFile = null;
      })

    ).subscribe({
      next: (result) => {
        if (result) {
          this.snackBar.open('✅ Configuración guardada exitosamente', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }

  /**
   * Elimina el logo actual
   */
  removeLogo(): void {
    if (confirm('¿Estás seguro de eliminar el logo actual?')) {
      this.companyLogo = null;
      this.selectedFile = null;

      // Marcar como cambio no guardado
      // El usuario debe hacer clic en "Guardar" para confirmar
    }
  }

  /**
   * Resetea al tema por defecto de TalenTrack
   */
  resetToDefault(): void {
    if (confirm('¿Restaurar los colores por defecto de TalenTrack?')) {
      const defaultColor = '#E74C3C';
      this.primaryColor = defaultColor;
      this.themeService.setPrimaryColor(defaultColor);
    }
  }

  /**
   * Cancela cambios y restaura valores originales
   */
  cancelChanges(): void {
    // Revertir color
    this.primaryColor = this.originalColor;
    this.themeService.setPrimaryColor(this.originalColor);

    // Revertir logo
    this.companyLogo = this.originalLogo;
    this.selectedFile = null;

    this.snackBar.open('Cambios descartados', 'Cerrar', { duration: 2000 });
  }

  /**
   * Verifica si el color actual es claro u oscuro
   * (Para mostrar texto blanco o negro sobre el color)
   */
  isColorLight(): boolean {
    return this.themeService.isLightColor(this.primaryColor);
  }
}