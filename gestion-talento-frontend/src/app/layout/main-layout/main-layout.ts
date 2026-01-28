import { Component, ChangeDetectorRef, AfterViewChecked, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar'
import { trigger, transition, style, query, animate } from '@angular/animations';
import { GlobalChatComponent } from '../../shared/components/global-chat/global-chat';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Sidebar, GlobalChatComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' })
        ], { optional: true }),

        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class MainLayout implements AfterViewChecked {
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}