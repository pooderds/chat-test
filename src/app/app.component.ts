import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { UserStateService } from './core/services/state/user-state/user-state.service';
import { AuthService } from './features/auth/auth.service';
import { UserChannelStateService } from './core/services/state/user-channel-state/user-channel-state.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HttpClientModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'chat';
  private userService = inject(UserStateService);
  private userChannelService = inject(UserChannelStateService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.userService.init();
    this.userChannelService.init();
    this.authService.checkAuth();
  }
}
