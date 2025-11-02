import { Component } from '@angular/core';
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
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Adjust path

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
    MatDividerModule, // Add
    MatListModule,    // Add
    SubpageHeader
  ],
  templateUrl: './attendance-settings.html',
  styleUrls: ['./attendance-settings.scss']
})
export class AttendanceSettings{
  // Sample settings data (load from backend)
  settings = {
    standardStartTime: '09:00',
    standardEndTime: '18:00',
    latenessToleranceMinutes: 10,
    requireWifi: true,
    allowedWifiNetworks: ['OficinaPrincipal-WiFi', 'Bodega-WiFi'],
    requireGeofence: true,
    geofenceLink: '/dashboard/settings/geofence-map'
  };

  newWifiNetwork: string = '';

  constructor() {}

  addWifiNetwork(): void {
    if (this.newWifiNetwork && !this.settings.allowedWifiNetworks.includes(this.newWifiNetwork.trim())) {
      this.settings.allowedWifiNetworks.push(this.newWifiNetwork.trim());
      this.newWifiNetwork = ''; // Clear input
       // TODO: Call API (maybe save all settings at once later)
    }
  }

  removeWifiNetwork(ssid: string): void {
    this.settings.allowedWifiNetworks = this.settings.allowedWifiNetworks.filter(n => n !== ssid);
     // TODO: Call API
  }

  saveAttendanceSettings(): void {
    console.log('Saving Attendance Settings:', this.settings);
    // TODO: Call API Service to save the entire 'settings' object
    // Show success message
  }
}