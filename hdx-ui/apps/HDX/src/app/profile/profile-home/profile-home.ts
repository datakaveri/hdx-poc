import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../shared/services/mock-data.service';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { AuthService } from '../../shared/services/auth.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { Dataset, FederatedNode, ServiceOffering } from '../../shared/models';

/** One node plus the datasets/services owned under it — the tree's per-node branch. */
interface NodeBranch {
  node: FederatedNode;
  datasets: Dataset[];
  services: ServiceOffering[];
}

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [RouterLink, NodeBadge],
  templateUrl: './profile-home.html',
  styleUrl: './profile-home.scss',
})
export class ProfileHome {
  private readonly mockData = inject(MockDataService);
  private readonly fileUpload = inject(FileUploadService);
  readonly auth = inject(AuthService);

  readonly deletingId = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly downloadingKey = signal<string | null>(null);

  readonly myNodes = computed(() => this.mockData.getNodes().filter((n) => n.ownerId === this.auth.userId()));

  readonly branches = computed<NodeBranch[]>(() => {
    const userId = this.auth.userId();
    const datasets = this.mockData.getDatasets().filter((d) => d.ownerId === userId);
    const services = this.mockData.getServices().filter((s) => s.ownerId === userId);
    return this.myNodes().map((node) => ({
      node,
      datasets: datasets.filter((d) => d.nodeId === node.id),
      services: services.filter((s) => s.nodeId === node.id),
    }));
  });

  async downloadSampleFile(dataset: Dataset): Promise<void> {
    const sampleFile = dataset.sampleFile;
    if (!sampleFile) return;
    this.downloadingKey.set(sampleFile.key);
    try {
      const blob = await this.fileUpload.downloadDatasetFile(sampleFile);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sampleFile.filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      this.actionError.set('Could not download the sample file.');
    } finally {
      this.downloadingKey.set(null);
    }
  }

  async deleteNode(node: FederatedNode): Promise<void> {
    if (!confirm(`Delete "${node.name}"? This also deletes every dataset and service registered under it.`)) return;
    this.actionError.set(null);
    this.deletingId.set(node.id);
    try {
      await this.mockData.deleteNode(node.id);
    } catch {
      this.actionError.set(`Could not delete "${node.name}".`);
    } finally {
      this.deletingId.set(null);
    }
  }

  async deleteDataset(dataset: Dataset): Promise<void> {
    if (!confirm(`Delete dataset "${dataset.title}"?`)) return;
    this.actionError.set(null);
    this.deletingId.set(dataset.id);
    try {
      await this.mockData.deleteDataset(dataset.id);
    } catch {
      this.actionError.set(`Could not delete "${dataset.title}".`);
    } finally {
      this.deletingId.set(null);
    }
  }

  async deleteService(service: ServiceOffering): Promise<void> {
    if (!confirm(`Delete service "${service.name}"?`)) return;
    this.actionError.set(null);
    this.deletingId.set(service.id);
    try {
      await this.mockData.deleteService(service.id);
    } catch {
      this.actionError.set(`Could not delete "${service.name}".`);
    } finally {
      this.deletingId.set(null);
    }
  }
}
