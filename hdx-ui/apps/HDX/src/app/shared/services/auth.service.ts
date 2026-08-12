import { Injectable, computed, inject } from '@angular/core';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

/**
 * Derives role/ownership state from the Keycloak token. `tokenParsed` on the
 * `Keycloak` instance isn't itself reactive, so every computed here re-reads
 * it off `KEYCLOAK_EVENT_SIGNAL` (already used the same way in app.config.ts
 * to gate the app initializer) — any auth event (Ready, AuthSuccess, a
 * silent token refresh) is a point where the token may have changed.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = inject(Keycloak);
  private readonly event = inject(KEYCLOAK_EVENT_SIGNAL);

  private readonly tokenParsed = computed(() => {
    this.event();
    return this.keycloak.tokenParsed;
  });

  readonly userId = computed(() => this.tokenParsed()?.sub);
  readonly username = computed(() => this.tokenParsed()?.['preferred_username'] as string | undefined);
  readonly roles = computed(() => this.tokenParsed()?.realm_access?.roles ?? []);
  readonly nodeId = computed(() => this.tokenParsed()?.['node_id'] as string | undefined);
  readonly isAdmin = computed(() => this.roles().includes('hdx_admin'));
  readonly isNodeOwner = computed(() => this.roles().includes('node_owner'));
}
