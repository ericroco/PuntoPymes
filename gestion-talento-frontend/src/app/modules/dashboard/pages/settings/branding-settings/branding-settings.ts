import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import FormsModule if using ngModel, ReactiveFormsModule if using reactive forms
import { FormsModule } from '@angular/forms';
// Import Material modules if needed (e.g., MatButtonModule)
import { MatButtonModule } from '@angular/material/button';
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';



@Component({
  selector: 'app-branding-settings',
  standalone: true, // Make it standalone
  imports: [
    CommonModule,
    FormsModule, // For ngModel potentially
    MatButtonModule,
    SubpageHeader,
  ], // Add necessary imports
  templateUrl: './branding-settings.html',
  styleUrls: ['./branding-settings.scss']
})
export class BrandingSettings {
  companyLogo: string | ArrayBuffer | null = 'assets/logo.svg'; // Placeholder or loaded logo
  primaryColor: string = '#E74C3C'; // Default color

  constructor() { }

  // Placeholder function for handling logo upload
  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.companyLogo = reader.result;
      reader.readAsDataURL(file);
      // TODO: Add logic to actually upload the file
      console.log('Logo selected:', file.name);
    }
  }

   // Placeholder function for saving changes
  saveBranding(): void {
    console.log('Saving branding:', { logo: '...', color: this.primaryColor });
     // TODO: Call API to save settings
  }
}