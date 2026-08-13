import { Route } from '@angular/router';
import { ServiceDetailHome } from './service-detail/service-detail';
import { GlaucomaDemo } from './glaucoma-demo/glaucoma-demo';

export const servicesRoutes: Route[] = [
  { path: ':id/demo', component: GlaucomaDemo },
  { path: ':id', component: ServiceDetailHome },
];
