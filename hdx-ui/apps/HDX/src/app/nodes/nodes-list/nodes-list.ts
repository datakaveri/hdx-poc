import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../shared/services/mock-data.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';

@Component({
  selector: 'app-nodes-list',
  standalone: true,
  imports: [RouterLink, NodeBadge],
  templateUrl: './nodes-list.html',
  styleUrl: './nodes-list.scss',
})
export class NodesListHome {
  private readonly mockData = inject(MockDataService);

  readonly nodes = this.mockData.getNodes();

  datasetCount(nodeId: string): number {
    return this.mockData.getDatasetsByNode(nodeId).length;
  }

  serviceCount(nodeId: string): number {
    return this.mockData.getServicesByNode(nodeId).length;
  }
}
