import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  includeBearerTokenInterceptor,
  provideKeycloak,
} from 'keycloak-angular';
import { filter, firstValueFrom } from 'rxjs';
import { appRoutes } from './app.routes';
import { HdxThemePreset } from './hdx-theme-preset';
import { MockDataService } from './shared/services/mock-data.service';
import { environment } from '../environments/environment';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Gates the whole app behind Keycloak login (realm "hdx", client "hdx-ui")
    // — see keycloak/ at the repo root for the docker-compose bootstrap.
    provideKeycloak({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'login-required',
        pkceMethod: 'S256',
      },
    }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    // Attaches the Keycloak access token only to our own backends — never to
    // third-party URLs — per keycloak-angular's explicit-URL-pattern design.
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        { urlPattern: new RegExp(`^${escapeRegExp(environment.controlplaneUrl)}/`) },
        { urlPattern: new RegExp(`^${escapeRegExp(environment.fileserverUrl)}/`) },
      ],
    },
    // Blocks first render until the controlplane-backed mock data has loaded,
    // so every component's synchronous getNodes()/getDatasets()/getServices()
    // read already has real data (see MockDataService). Angular runs all
    // provideAppInitializers concurrently (not in registration order), so
    // this one explicitly waits for Keycloak's own "Ready" event first —
    // otherwise MockDataService.load() can race Keycloak's login-required
    // flow and fire its HTTP calls before an access token exists, getting 401s.
    provideAppInitializer(async () => {
      // Both inject() calls must happen synchronously, before any `await` —
      // the injection context is only valid for the non-awaited portion of
      // this function (NG0203 otherwise).
      const keycloakEvent = inject(KEYCLOAK_EVENT_SIGNAL);
      const mockData = inject(MockDataService);
      await firstValueFrom(toObservable(keycloakEvent).pipe(filter((e) => e.type === KeycloakEventType.Ready)));
      await mockData.load();
    }),
    providePrimeNG({
      theme: {
        preset: HdxThemePreset,
        options: { darkModeSelector: false },
      },
    }),
  ],
};
