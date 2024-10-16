import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpErrorService } from '../../utilities/http-error.service';
import { catchError, Observable } from 'rxjs';
import { UserChannel } from '../../../models/user-channel';
import { REST_URL } from '../../../tokens';

@Injectable({
  providedIn: 'root',
})
export class UsersChannelDataService {
  private path = 'user_channels';

  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string,
    private errorService: HttpErrorService,
  ) {}

  getUserChannels(): Observable<UserChannel[]> {
    return this.http
      .get<UserChannel[]>(`${this.url}/${this.path}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  createUserChanel(userChannel: UserChannel): Observable<UserChannel> {
    return this.http
      .post<UserChannel>(`${this.url}/${this.path}`, userChannel)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
