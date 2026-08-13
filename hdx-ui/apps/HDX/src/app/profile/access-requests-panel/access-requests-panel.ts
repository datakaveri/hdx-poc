import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AccessRequestService } from '../../shared/services/access-request.service';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AccessRequest, AccessResourceType } from '../../shared/models';

@Component({
  selector: 'app-access-requests-panel',
  standalone: true,
  templateUrl: './access-requests-panel.html',
  styleUrl: './access-requests-panel.scss',
})
export class AccessRequestsPanel implements OnInit {
  private readonly accessRequests = inject(AccessRequestService);
  private readonly mockData = inject(MockDataService);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly decidingId = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);

  readonly mine = computed(() => this.accessRequests.mine());
  readonly toReview = computed(() => this.accessRequests.toReview());

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      await Promise.all([this.accessRequests.loadMine(), this.accessRequests.loadToReview()]);
      await this.resolveResourceLabels();
    } catch {
      this.loadError.set('Could not load access requests.');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * GET /datasets and /services exclude other owners' private resources, so
   * requests naming one of those won't resolve a title via the local cache.
   * Fetch each referenced dataset/service directly so resourceLabel() can
   * show a name instead of a raw id.
   */
  private async resolveResourceLabels(): Promise<void> {
    const all = [...this.mine(), ...this.toReview()];
    await Promise.all(
      all.map((r) => {
        if (r.resourceType === 'dataset') return this.mockData.fetchDatasetById(r.resourceId);
        if (r.resourceType === 'service') return this.mockData.fetchServiceById(r.resourceId);
        return Promise.resolve();
      }),
    );
  }

  resourceLabel(resourceType: AccessResourceType, resourceId: string): string {
    if (resourceType === 'node') return this.mockData.getNode(resourceId)?.name ?? resourceId;
    if (resourceType === 'dataset') return this.mockData.getDataset(resourceId)?.title ?? resourceId;
    return this.mockData.getServices().find((s) => s.id === resourceId)?.name ?? resourceId;
  }

  async approve(request: AccessRequest): Promise<void> {
    this.actionError.set(null);
    this.decidingId.set(request.id);
    try {
      await this.accessRequests.approve(request.id);
    } catch {
      this.actionError.set('Could not approve this request.');
    } finally {
      this.decidingId.set(null);
    }
  }

  async reject(request: AccessRequest): Promise<void> {
    this.actionError.set(null);
    this.decidingId.set(request.id);
    try {
      await this.accessRequests.reject(request.id);
    } catch {
      this.actionError.set('Could not reject this request.');
    } finally {
      this.decidingId.set(null);
    }
  }
}
