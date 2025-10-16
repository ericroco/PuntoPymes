import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html', 
  styleUrl: './login.scss', 
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void => *', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class Login {
}