import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { AUTH_USER } from '../../shared/constants';

export const GuestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser$.pipe(
    map((user) => {
      const isAuth = !!user;
      const localStorageUser = localStorage.getItem(AUTH_USER);
      if (!isAuth || !localStorageUser) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
  );
};
