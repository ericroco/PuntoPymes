import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth'; // Importar AuthService

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  private authService = inject(AuthService);

  companyLogo: string = 'assets/logo.svg'; // Default
  companyName: string = 'TalenTrack Empresa'; // Default

  ngOnInit() {
    this.companyLogo = this.authService.getCompanyLogo();
    this.companyName = this.authService.getCompanyName();
  }
}