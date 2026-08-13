import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  route: string;
  tourId?: string;
}

/**
 * Small routing-based sidebar (child-route tabs, not local tab-state) —
 * links are shareable/back-button-safe. A deliberately much smaller version
 * of apps/IUDX's shared sidebar pattern (no collapse/mobile-drawer behavior,
 * not needed at this app's scope).
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly items = input.required<SidebarItem[]>();
}
