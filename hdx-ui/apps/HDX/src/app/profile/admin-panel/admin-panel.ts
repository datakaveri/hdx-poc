import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AuthService } from '../../shared/services/auth.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { FederatedNode } from '../../shared/models';

/** Admin-only: lists pending node-creation requests and lets the platform admin approve them. */
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NodeBadge],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel implements OnInit {
  private readonly mockData = inject(MockDataService);
  readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly approvingId = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  private readonly pending = signal<FederatedNode[]>([]);

  readonly pendingNodes = computed(() => this.pending());

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  private async refresh(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.pending.set(await this.mockData.getPendingNodes());
    } catch {
      this.loadError.set('Could not load pending nodes — make sure you are signed in as a platform admin.');
    } finally {
      this.loading.set(false);
    }
  }

  async approve(node: FederatedNode): Promise<void> {
    this.actionError.set(null);
    this.approvingId.set(node.id);
    try {
      await this.mockData.approveNode(node.id);
      this.pending.update((nodes) => nodes.filter((n) => n.id !== node.id));
    } catch {
      this.actionError.set(`Could not approve "${node.name}".`);
    } finally {
      this.approvingId.set(null);
    }
  }
}
