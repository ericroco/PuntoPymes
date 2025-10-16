import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 1. Import RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true, // 2. Mark as standalone
  imports: [
    RouterModule // 3. Add to imports
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {

}