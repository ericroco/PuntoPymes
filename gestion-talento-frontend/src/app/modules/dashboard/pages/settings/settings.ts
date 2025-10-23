import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Necesario para routerLink en el HTML

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule], // RouterModule debe estar aquí
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export class Settings {
  constructor() { }
}