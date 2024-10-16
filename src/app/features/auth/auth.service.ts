import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { LoginData } from './auth.types';
import { User } from '../../core/models/user.interface';
import { UserStateService } from '../../core/services/state/user-state/user-state.service';
import { AUTH_USER } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private userService = inject(UserStateService);

  private authUser = new BehaviorSubject<User | null>(null);
  authUser$ = this.authUser.asObservable();

  logIn(loginData: LoginData): Observable<User | undefined> {
    return this.userService.users$.pipe(
      map((users) =>
        users.find(({ username }) => loginData.username === username),
      ),
      tap((user) => {
        if (!user) {
          throw `User does not exist`;
        }
        if (loginData.password !== user.password) {
          throw `Password is incorrect`;
        }
        user.is_online = true;
        localStorage.setItem(AUTH_USER, JSON.stringify(user));
        this.userService.updateUser(user).subscribe()
        this.authUser.next(user);
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  logOut() {
    const authUser = this.authUser.getValue();
    if (authUser) {
      authUser.is_online = false
      this.userService.updateUser(authUser).subscribe();
      this.authUser.next(null);
      localStorage.removeItem(AUTH_USER);
      this.router.navigate(['/login']);
    }
  }

  checkAuth() {
    const stringifyAuthUser = localStorage.getItem(AUTH_USER);
    if (stringifyAuthUser) {
      const authUser = JSON.parse(stringifyAuthUser);
      this.authUser.next(authUser);
    }
  }

  private handleError(errMsg: string): Observable<never> {
    return throwError(() => errMsg);
  }
}
