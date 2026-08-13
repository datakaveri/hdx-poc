import { Route } from '@angular/router';
import { DatasetDetailHome } from './dataset-detail/dataset-detail';

export const datasetsRoutes: Route[] = [{ path: ':id', component: DatasetDetailHome }];
