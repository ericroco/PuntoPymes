import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components & Services
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { CompanyConfigService } from '../../../services/company-config';

@Component({
  selector: 'app-kpis-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatCardModule,
    MatSlideToggleModule, MatInputModule, MatFormFieldModule,
    MatIconModule, MatDividerModule, MatSnackBarModule,
    MatTooltipModule, SubpageHeader
  ],
  templateUrl: './kpis-settings.html',
  styleUrls: ['./kpis-settings.scss']
})
export class KpisSettings implements OnInit {
  private configService = inject(CompanyConfigService);
  private snackBar = inject(MatSnackBar);

  isLoading = false;

  // Modelo local con valores por defecto
  settings = {
    // Visibilidad
    mostrarHeadcount: true,
    mostrarDemografia: true,
    mostrar9Box: false, // Por defecto apagado (es avanzado)
    mostrarMasaSalarial: true,
    mostrarAsistencia: true,

    // Metas (Targets)
    metaAsistencia: 90,       // % mínimo aceptable
    metaRotacionMaxima: 5,    // % máximo aceptable
    metaNPS: 50               // Puntaje eNPS deseado
  };

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.isLoading = true;
    this.configService.getConfig().subscribe({
      next: (config) => {
        const kpis = config.kpis || {};

        // Mapeo seguro (si viene undefined, usamos el default del objeto settings)
        if (kpis.mostrarHeadcount !== undefined) this.settings.mostrarHeadcount = kpis.mostrarHeadcount;
        if (kpis.mostrarDemografia !== undefined) this.settings.mostrarDemografia = kpis.mostrarDemografia;
        if (kpis.mostrar9Box !== undefined) this.settings.mostrar9Box = kpis.mostrar9Box;
        if (kpis.mostrarMasaSalarial !== undefined) this.settings.mostrarMasaSalarial = kpis.mostrarMasaSalarial;
        if (kpis.mostrarAsistencia !== undefined) this.settings.mostrarAsistencia = kpis.mostrarAsistencia;

        if (kpis.metaAsistencia) this.settings.metaAsistencia = kpis.metaAsistencia;
        if (kpis.metaRotacionMaxima) this.settings.metaRotacionMaxima = kpis.metaRotacionMaxima;
        if (kpis.metaNPS) this.settings.metaNPS = kpis.metaNPS;

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  saveSettings() {
    this.isLoading = true;

    // Armamos el objeto parcial
    const configToSend = {
      kpis: {
        mostrarHeadcount: this.settings.mostrarHeadcount,
        mostrarDemografia: this.settings.mostrarDemografia,
        mostrar9Box: this.settings.mostrar9Box,
        mostrarMasaSalarial: this.settings.mostrarMasaSalarial,
        mostrarAsistencia: this.settings.mostrarAsistencia,

        metaAsistencia: this.settings.metaAsistencia,
        metaRotacionMaxima: this.settings.metaRotacionMaxima,
        metaNPS: this.settings.metaNPS
      }
    };

    this.configService.updateConfig(configToSend).subscribe({
      next: () => {
        this.snackBar.open('Preferencias de reportes guardadas', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Error al guardar', 'Cerrar');
        this.isLoading = false;
      }
    });
  }
}