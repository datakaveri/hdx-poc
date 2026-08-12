import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';

const BASE_NAV_LINKS = [
  { path: '/nodes', label: 'Federated Nodes' },
  { path: '/data-plane', label: 'Data Plane' },
  { path: '/service-plane', label: 'Service Plane' },
  { path: '/graph-explorer', label: 'Graph Explorer' },
  { path: '/data-formats', label: 'Data Formats' },
  { path: '/onboarding', label: 'Onboarding' },
  { path: '/profile', label: 'Profile' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  private readonly keycloak = inject(Keycloak);
  private readonly auth = inject(AuthService);

  readonly navLinks = computed(() =>
    this.auth.isAdmin() ? [...BASE_NAV_LINKS, { path: '/admin/approvals', label: 'Admin' }] : BASE_NAV_LINKS,
  );

  get username(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
