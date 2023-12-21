import { provideRouter } from '@angular/router';
import { ApplicationConfig, isDevMode } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { appState } from './+state/app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appState),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
