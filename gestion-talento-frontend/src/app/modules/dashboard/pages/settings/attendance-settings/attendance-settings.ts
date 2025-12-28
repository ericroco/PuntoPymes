import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar SnackBar

// Components & Services
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
// 👇 IMPORTANTE: El servicio de configuración
import { CompanyConfigService } from '../../../services/company-config';

@Component({
  selector: 'app-attendance-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule, // No olvides esto
    SubpageHeader
  ],
  templateUrl: './attendance-settings.html',
  styleUrls: ['./attendance-settings.scss']
})
export class AttendanceSettings implements OnInit {

  // Inyecciones
  private configService = inject(CompanyConfigService);
  private snackBar = inject(MatSnackBar);

  isLoading = false;

  // Modelo de datos local (Mapeado al HTML)
  settings = {
    standardStartTime: '09:00', // Valor por defecto
    standardEndTime: '18:00',   // Valor por defecto
    latenessToleranceMinutes: 15, // Valor por defecto

    // --- Visual (No se guardan aún) ---
    requireWifi: false,
    allowedWifiNetworks: [] as string[],
    requireGeofence: false,
    geofenceLink: ''
  };

  newWifiNetwork: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadSettings();
  }

  // --- 1. CARGAR CONFIGURACIÓN DEL BACKEND ---
  loadSettings() {
    this.isLoading = true;
    this.configService.getConfig().subscribe({
      next: (config) => {
        const asistencia = config.asistencia || {};

        // Mapeamos lo que nos interesa
        if (asistencia.horaEntrada) this.settings.standardStartTime = asistencia.horaEntrada;
        if (asistencia.horaSalida) this.settings.standardEndTime = asistencia.horaSalida;
        if (asistencia.toleranciaRetraso !== undefined) this.settings.latenessToleranceMinutes = asistencia.toleranciaRetraso;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando configuración de asistencia:', err);
        this.isLoading = false;
      }
    });
  }

  // --- 2. GUARDAR SOLO HORARIOS Y TOLERANCIA ---
  saveAttendanceSettings(): void {
    this.isLoading = true;

    // Preparamos solo los datos que pediste guardar
    const configToSend = {
      asistencia: {
        horaEntrada: this.settings.standardStartTime,
        horaSalida: this.settings.standardEndTime,
        toleranciaRetraso: this.settings.latenessToleranceMinutes
        // No enviamos WiFi ni Geofence por ahora
      }
    };

    this.configService.updateConfig(configToSend).subscribe({
      next: () => {
        this.snackBar.open('Configuración de asistencia guardada', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error guardando:', err);
        this.snackBar.open('Error al guardar cambios', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  // --- MÉTODOS VISUALES (WIFI) ---
  // Se mantienen para que la UI funcione, aunque no guarden en BD todavía
  addWifiNetwork(): void {
    if (this.newWifiNetwork && !this.settings.allowedWifiNetworks.includes(this.newWifiNetwork.trim())) {
      this.settings.allowedWifiNetworks.push(this.newWifiNetwork.trim());
      this.newWifiNetwork = '';
    }
  }

  removeWifiNetwork(ssid: string): void {
    this.settings.allowedWifiNetworks = this.settings.allowedWifiNetworks.filter(n => n !== ssid);
  }
}