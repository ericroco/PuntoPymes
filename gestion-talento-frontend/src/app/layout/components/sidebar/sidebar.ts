import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importar CommonModule para *ngIf
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule], // <--- Asegúrate de tener CommonModule
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  public authService = inject(AuthService);

  companyLogo: string = 'assets/logo.svg';
  companyName: string = 'Punto PyMES';

  // Variable para controlar la vista
  isAdmin: boolean = false;

  ngOnInit() {
    this.companyLogo = this.authService.getCompanyLogo();
    this.companyName = this.authService.getCompanyName();

    // Verificamos el rol
    this.isAdmin = this.authService.isAdmin();
  }
}