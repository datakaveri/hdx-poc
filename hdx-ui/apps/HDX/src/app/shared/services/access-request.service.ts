import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccessRequest, AccessRequestStatus, AccessResourceType } from '../models';

const API_BASE = environment.controlplaneUrl;

/**
 * Client for Controlplane's /access-requests API. `mine` backs `statusFor()`
 * (used by detail pages to render "Request Access"/"Pending"/"Access granted"),
 * `toReview` backs the Profile → Access Requests "requests to review" list.
 * Both are lazily loaded — call `ensureMineLoaded()`/`loadToReview()` from
 * whichever component first needs them.
 */
@Injectable({ providedIn: 'root' })
export class AccessRequestService {
  private readonly http = inject(HttpClient);

  private readonly mineSignal = signal<AccessRequest[]>([]);
  private readonly toReviewSignal = signal<AccessRequest[]>([]);
  private mineLoaded = false;

  readonly mine = this.mineSignal.asReadonly();
  readonly toReview = this.toReviewSignal.asReadonly();

  async loadMine(): Promise<void> {
    const list = await firstValueFrom(this.http.get<AccessRequest[]>(`${API_BASE}/access-requests/mine`));
    this.mineSignal.set(list);
    this.mineLoaded = true;
  }

  async ensureMineLoaded(): Promise<void> {
    if (!this.mineLoaded) await this.loadMine();
  }

  async loadToReview(): Promise<void> {
    const list = await firstValueFrom(this.http.get<AccessRequest[]>(`${API_BASE}/access-requests/to-review`));
    this.toReviewSignal.set(list);
  }

  async requestAccess(resourceType: AccessResourceType, resourceId: string): Promise<AccessRequest> {
    const created = await firstValueFrom(
      this.http.post<AccessRequest>(`${API_BASE}/access-requests`, { resourceType, resourceId }),
    );
    this.mineSignal.update((cur) => [...cur, created]);
    return created;
  }

  async approve(id: string): Promise<void> {
    const updated = await firstValueFrom(this.http.post<AccessRequest>(`${API_BASE}/access-requests/${id}/approve`, {}));
    this.toReviewSignal.update((cur) => cur.filter((r) => r.id !== id));
    this.mineSignal.update((cur) => cur.map((r) => (r.id === id ? updated : r)));
  }

  async reject(id: string): Promise<void> {
    const updated = await firstValueFrom(this.http.post<AccessRequest>(`${API_BASE}/access-requests/${id}/reject`, {}));
    this.toReviewSignal.update((cur) => cur.filter((r) => r.id !== id));
    this.mineSignal.update((cur) => cur.map((r) => (r.id === id ? updated : r)));
  }

  /** For datasets, also resolves true if an approved node-level grant covers the dataset's own node. */
  statusFor(resourceType: AccessResourceType, resourceId: string, nodeId?: string): AccessRequestStatus | 'none' {
    const mine = this.mineSignal();
    const direct = mine.find((r) => r.resourceType === resourceType && r.resourceId === resourceId);
    if (direct) return direct.status;
    if (resourceType === 'dataset' && nodeId) {
      const nodeGrant = mine.find((r) => r.resourceType === 'node' && r.resourceId === nodeId && r.status === 'approved');
      if (nodeGrant) return 'approved';
    }
    return 'none';
  }
}
