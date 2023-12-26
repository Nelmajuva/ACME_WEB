import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { appState } from './+state/app.store';
import { AuthInterceptor } from './services/interceptors/auth/auth.interceptor';

const environment = {
  urlApi: isDevMode() ? `http://127.0.0.1:8000/api` : `production_url`,
};

const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appState),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};

export { appConfig, environment };
