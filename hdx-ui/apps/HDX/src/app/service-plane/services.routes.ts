import { Route } from '@angular/router';
import { ServiceDetailHome } from './service-detail/service-detail';

export const servicesRoutes: Route[] = [{ path: ':id', component: ServiceDetailHome }];
