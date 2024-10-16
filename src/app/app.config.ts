import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { REST_URL } from './core/tokens';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: REST_URL, useValue: environment.baseUrl },
  ],
};
