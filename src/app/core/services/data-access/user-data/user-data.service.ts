import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';
import { User } from '../../../models/user.interface';
import { HttpErrorService } from '../../utilities/http-error.service';
import { REST_URL } from '../../../tokens';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private path = 'users';
  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string,
    private errorService: HttpErrorService,
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.url}/${this.path}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .patch<User>(`${this.url}/${this.path}/${user.id}`, user)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
