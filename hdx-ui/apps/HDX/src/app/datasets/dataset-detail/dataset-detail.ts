import { Component, OnInit, computed, effect, inject, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { MockDataService } from '../../shared/services/mock-data.service';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { RequestAccessButton } from '../../shared/components/request-access-button/request-access-button';
import { GlaucomaBundleList } from '../glaucoma-bundle-list/glaucoma-bundle-list';
import { AccessRequestService } from '../../shared/services/access-request.service';
import { AuthService } from '../../shared/services/auth.service';
import { AccessTier } from '../../shared/models';

@Component({
  selector: 'app-dataset-detail',
  standalone: true,
  imports: [RouterLink, NodeBadge, TagModule, DecimalPipe, RequestAccessButton, GlaucomaBundleList],
  templateUrl: './dataset-detail.html',
  styleUrl: './dataset-detail.scss',
})
export class DatasetDetailHome implements OnInit {
  private readonly mockData = inject(MockDataService);
  private readonly fileUpload = inject(FileUploadService);
  private readonly accessRequests = inject(AccessRequestService);
  private readonly auth = inject(AuthService);

  // Bound from the `:id` route param via withComponentInputBinding().
  readonly id = input.required<string>();

  readonly dataset = computed(() => this.mockData.getDataset(this.id()));

  /** Owner/admin always have full access; everyone else needs an approved request (direct or node-level). */
  readonly hasDataAccess = computed(() => {
    const ds = this.dataset();
    if (!ds || ds.visibility !== 'private') return true;
    if (this.auth.isAdmin() || (!!ds.ownerId && ds.ownerId === this.auth.userId())) return true;
    return this.accessRequests.statusFor('dataset', ds.id, ds.nodeId) === 'approved';
  });

  ngOnInit(): void {
    this.accessRequests.ensureMineLoaded();
  }

  constructor() {
    // Not in the (visibility-filtered) local cache yet — e.g. a direct link to
    // someone else's private dataset — try fetching it by id directly.
    effect(() => {
      const id = this.id();
      if (!this.mockData.getDataset(id)) {
        this.mockData.fetchDatasetById(id);
      }
    });
  }

  readonly node = computed(() => {
    const ds = this.dataset();
    return ds ? this.mockData.getNode(ds.nodeId) : undefined;
  });
  readonly compatibleServices = computed(() => this.mockData.getServicesForDataset(this.id()));

  readonly downloading = signal(false);
  readonly downloadError = signal<string | null>(null);
  readonly copied = signal(false);

  accessSeverity(access: AccessTier): 'success' | 'info' | 'warn' {
    if (access === 'open') return 'success';
    if (access === 'registered') return 'info';
    return 'warn';
  }

  hostLabel(nodeId: string): string {
    if (nodeId === 'platform') return 'Platform-wide';
    return this.mockData.getNode(nodeId)?.name ?? nodeId;
  }

  /** Lets a user hand this dataset's id to another flow (e.g. pasting it into the Glaucoma Detection service demo). */
  async copyDatasetId(): Promise<void> {
    const ds = this.dataset();
    if (!ds) return;
    await navigator.clipboard.writeText(ds.id);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /**
   * Fetched via HttpClient (not a plain <a href>) because the Fileserver's
   * /download route requires a Bearer token — something a browser-navigated
   * link can't attach — so we pull the blob in and trigger the save ourselves.
   */
  async downloadSampleFile(): Promise<void> {
    const sampleFile = this.dataset()?.sampleFile;
    if (!sampleFile) return;
    this.downloading.set(true);
    this.downloadError.set(null);
    try {
      const blob = await this.fileUpload.downloadDatasetFile(sampleFile);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sampleFile.filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      this.downloadError.set('Could not download the sample file.');
    } finally {
      this.downloading.set(false);
    }
  }
}
