import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MockDataService } from '../../shared/services/mock-data.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { DropdownOption, DropdownSelect } from '../../shared/components/dropdown-select/dropdown-select';
import { DataTrack } from '../../shared/models';

@Component({
  selector: 'app-data-plane-home',
  standalone: true,
  imports: [CardModule, TagModule, NodeBadge, DecimalPipe, DropdownSelect, RouterLink],
  templateUrl: './data-plane-home.html',
  styleUrl: './data-plane-home.scss',
})
export class DataPlaneHome {
  private readonly mockData = inject(MockDataService);

  readonly nodes = this.mockData.getNodes();
  readonly datasets = this.mockData.getDatasets();

  readonly nodeOptions: DropdownOption[] = [
    { label: 'All federated nodes', value: 'all' },
    ...this.nodes.map((n) => ({ label: n.name, value: n.id })),
  ];

  readonly trackOptions: DropdownOption[] = [
    { label: 'All tracks', value: 'all' },
    { label: 'Clinical', value: 'clinical' },
    { label: 'Genomics', value: 'genomics' },
    { label: 'Imaging', value: 'imaging' },
    { label: 'Public Health', value: 'public-health' },
  ];

  readonly selectedNodeId = signal<string>('all');
  readonly selectedTrack = signal<string>('all');

  readonly filteredDatasets = computed(() => {
    const nodeId = this.selectedNodeId();
    const track = this.selectedTrack();
    return this.datasets.filter(
      (d) => (nodeId === 'all' || d.nodeId === nodeId) && (track === 'all' || d.track === (track as DataTrack)),
    );
  });

  nodeFor(nodeId: string) {
    return this.mockData.getNode(nodeId);
  }

  accessSeverity(access: string): 'success' | 'info' | 'warn' {
    if (access === 'open') return 'success';
    if (access === 'registered') return 'info';
    return 'warn';
  }
}
