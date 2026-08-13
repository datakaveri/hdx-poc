import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, SidebarItem } from '../../shared/components/sidebar/sidebar';
import { AuthService } from '../../shared/services/auth.service';

const BASE_ITEMS: SidebarItem[] = [
  { label: 'My Nodes', route: '/profile/nodes' },
  { label: 'Access Requests', route: '/profile/requests', tourId: 'sidebar-requests' },
];

@Component({
  selector: 'app-profile-shell',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './profile-shell.html',
  styleUrl: './profile-shell.scss',
})
export class ProfileShell {
  private readonly auth = inject(AuthService);

  readonly items = computed(() =>
    this.auth.isAdmin() ? [...BASE_ITEMS, { label: 'Admin Panel', route: '/profile/admin' }] : BASE_ITEMS,
  );
}
