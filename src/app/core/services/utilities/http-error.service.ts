import { HttpErrorResponse } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {MessageService} from "primeng/api";
import {NotificationMessageSeverity, NotificationMessageTitle} from "../../../shared/constants";

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  private messageService = inject(MessageService);

  formatError(err: HttpErrorResponse) {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.statusText} `;
    }
    return errorMessage;
  }

  public handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.formatError(err);
    this.messageService.add({
      severity: NotificationMessageSeverity.error,
      summary: NotificationMessageTitle.error,
      detail: formattedMessage,
    });
    return throwError(() => formattedMessage);
  }
}
