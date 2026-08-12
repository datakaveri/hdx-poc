import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'nodes' },
  {
    path: 'nodes',
    loadChildren: () => import('./nodes/nodes.routes').then((m) => m.nodesRoutes),
  },
  {
    path: 'data-plane',
    loadChildren: () => import('./data-plane/data-plane.routes').then((m) => m.dataPlaneRoutes),
  },
  {
    path: 'datasets',
    loadChildren: () => import('./datasets/datasets.routes').then((m) => m.datasetsRoutes),
  },
  {
    path: 'service-plane',
    loadChildren: () => import('./service-plane/service-plane.routes').then((m) => m.servicePlaneRoutes),
  },
  {
    path: 'graph-explorer',
    loadChildren: () => import('./graph-explorer/graph-explorer.routes').then((m) => m.graphExplorerRoutes),
  },
  {
    path: 'data-formats',
    loadChildren: () => import('./data-formats/data-formats.routes').then((m) => m.dataFormatsRoutes),
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.routes').then((m) => m.onboardingRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
];
