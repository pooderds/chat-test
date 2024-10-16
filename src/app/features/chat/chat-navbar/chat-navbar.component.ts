import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [ButtonModule, RouterLink, AsyncPipe, NgIf],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.scss',
})
export class ChatNavbarComponent {

  private authService = inject(AuthService);

  readonly currentUser$ = this.authService.authUser$

  logout(){
  this.authService.logOut()
  }

}
