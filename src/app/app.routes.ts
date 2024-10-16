import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { AuthGuard } from './features/auth/auth.guard.';
import { GuestGuard } from './features/auth/guest.guard';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/chat/chat.component').then((c) => c.ChatComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
    canActivate: [AuthGuard],
  },
];
