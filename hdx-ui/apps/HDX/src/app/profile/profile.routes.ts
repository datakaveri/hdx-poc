import { Route } from '@angular/router';
import { ProfileShell } from './profile-shell/profile-shell';
import { ProfileHome } from './profile-home/profile-home';
import { AccessRequestsPanel } from './access-requests-panel/access-requests-panel';
import { AdminPanel } from './admin-panel/admin-panel';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'nodes' },
      { path: 'nodes', component: ProfileHome },
      { path: 'requests', component: AccessRequestsPanel },
      { path: 'admin', component: AdminPanel },
    ],
  },
];
