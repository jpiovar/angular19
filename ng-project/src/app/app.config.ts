import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';

import { reducer as records } from './state/records/records.reducer';
import { reducer as spinner } from './state/spinner/spinner.reducer';

import { RecordsEffects } from './state/records/records.effects';
import { environment } from '../environments/environment';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { isDevMode } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ records, spinner }),
    provideEffects([RecordsEffects]),
    !environment.production ? provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }) : []
  ]
};
