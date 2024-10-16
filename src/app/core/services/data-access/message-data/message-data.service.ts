import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpErrorService } from '../../utilities/http-error.service';
import { catchError, Observable } from 'rxjs';
import { Message } from '../../../models/message.interface';
import { REST_URL } from '../../../tokens';

@Injectable({
  providedIn: 'root',
})
export class MessageDataService {
  private path = 'messages';

  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string,
    private errorService: HttpErrorService,
  ) {}

  getMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>(`${this.url}/${this.path}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  createMessage(msg: Message): Observable<Message> {
    return this.http
      .post<Message>(`${this.url}/${this.path}`, msg)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
