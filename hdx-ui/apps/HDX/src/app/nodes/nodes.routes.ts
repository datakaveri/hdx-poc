import { Route } from '@angular/router';
import { NodesListHome } from './nodes-list/nodes-list';
import { NodeDetailHome } from './node-detail/node-detail';

export const nodesRoutes: Route[] = [
  { path: '', component: NodesListHome },
  { path: ':id', component: NodeDetailHome },
];
