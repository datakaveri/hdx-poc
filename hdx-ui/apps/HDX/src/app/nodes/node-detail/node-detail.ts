import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MockDataService } from '../../shared/services/mock-data.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { AccessTier } from '../../shared/models';

@Component({
  selector: 'app-node-detail',
  standalone: true,
  imports: [RouterLink, NodeBadge, CardModule, TagModule, DecimalPipe],
  templateUrl: './node-detail.html',
  styleUrl: './node-detail.scss',
})
export class NodeDetailHome {
  private readonly mockData = inject(MockDataService);

  // Bound from the `:id` route param via withComponentInputBinding().
  readonly id = input.required<string>();

  readonly node = computed(() => this.mockData.getNode(this.id()));
  readonly datasets = computed(() => this.mockData.getDatasetsByNode(this.id()));
  readonly services = computed(() => this.mockData.getServicesByNode(this.id()));

  accessSeverity(access: AccessTier): 'success' | 'info' | 'warn' {
    if (access === 'open') return 'success';
    if (access === 'registered') return 'info';
    return 'warn';
  }
}
