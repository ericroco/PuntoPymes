import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // For routerLink
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subpage-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './subpage-header.html',
  styleUrls: ['./subpage-header.scss']
})
export class SubpageHeader {
  @Input({ required: true }) title: string = ''; // Title is required
  @Input() backRoute: string | any[] | null | undefined; // Optional back route
  @Input() backTooltip: string = 'Volver'; // Default tooltip text

  constructor() {}
}