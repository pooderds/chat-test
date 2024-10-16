import { Inject, Injectable } from '@angular/core';
import { Channel } from '../../../models/channel.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { HttpErrorService } from '../../utilities/http-error.service';
import { REST_URL } from '../../../tokens';

@Injectable({
  providedIn: 'root',
})
export class ChannelDataService {
  private path = 'channels';
  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string,
    private errorService: HttpErrorService,
  ) {}

  getChannels(): Observable<Channel[]> {
    return this.http
      .get<Channel[]>(`${this.url}/${this.path}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  createChannel(channel: Channel): Observable<Channel> {
    return this.http
      .post<Channel>(`${this.url}/${this.path}`, channel)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
