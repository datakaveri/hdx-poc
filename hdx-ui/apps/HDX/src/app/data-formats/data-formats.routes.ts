import { Route } from '@angular/router';
import { DataFormatsHome } from './data-formats-home/data-formats-home';
import { DataFormatDetail } from './data-format-detail/data-format-detail';

export const dataFormatsRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: DataFormatsHome },
  { path: ':id', component: DataFormatDetail },
];
