import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import { AUTH_USER } from '../../shared/constants';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser$.pipe(
    map((user) => {
      const isAuth = !!user;
      const authUser = localStorage.getItem(AUTH_USER);
      if (isAuth || authUser) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }),
  );
};
