import { Component, computed, input } from '@angular/core';
import { NodeArchetype, NodeStatus } from '../../models';

@Component({
  selector: 'app-node-badge',
  standalone: true,
  templateUrl: './node-badge.html',
  styleUrl: './node-badge.scss',
})
export class NodeBadge {
  readonly archetype = input.required<NodeArchetype>();
  readonly status = input<NodeStatus | undefined>(undefined);

  readonly archetypeLabel = computed(() => (this.archetype() === 'greenfield' ? 'Greenfield' : 'Brownfield'));
}
