import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../services/auth.service';
import { ProductTourService } from '../../services/product-tour.service';
import { UserMenu } from '../user-menu/user-menu';

const NAV_LINKS = [
  { path: '/nodes', label: 'Federated Nodes', tourId: 'nav-nodes' },
  { path: '/data-plane', label: 'Data Plane' },
  { path: '/service-plane', label: 'Service Plane' },
  { path: '/graph-explorer', label: 'Graph Explorer' },
  { path: '/data-formats', label: 'Data Formats', tourId: 'nav-data-formats' },
  { path: '/onboarding', label: 'Onboarding', tourId: 'nav-onboarding' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UserMenu],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  private readonly keycloak = inject(Keycloak);
  readonly auth = inject(AuthService);
  readonly tour = inject(ProductTourService);

  readonly navLinks = NAV_LINKS;

  get username(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
