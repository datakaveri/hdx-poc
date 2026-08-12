import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MockDataService } from '../../shared/services/mock-data.service';
import { ServiceCategory } from '../../shared/models';

interface CategoryMeta {
  label: string;
  icon: string;
}

const CATEGORY_META: Record<ServiceCategory, CategoryMeta> = {
  'tee-enclave': { label: 'TEE / Secure Enclave', icon: 'pi pi-shield' },
  mlops: { label: 'MLOps as a Service', icon: 'pi pi-cog' },
  'federated-query': { label: 'Federated Query Aggregation', icon: 'pi pi-share-alt' },
  'federated-learning': { label: 'Federated Learning + DEPA', icon: 'pi pi-sitemap' },
  'no-code-editor': { label: 'No-Code Editor', icon: 'pi pi-table' },
  'jupyter-sandbox': { label: 'Jupyter Sandbox', icon: 'pi pi-code' },
};

@Component({
  selector: 'app-service-plane-home',
  standalone: true,
  imports: [CardModule, TagModule, RouterLink],
  templateUrl: './service-plane-home.html',
  styleUrl: './service-plane-home.scss',
})
export class ServicePlaneHome {
  private readonly mockData = inject(MockDataService);

  readonly services = this.mockData.getServices();
  readonly datasets = this.mockData.getDatasets();
  readonly nodes = this.mockData.getNodes();

  readonly categories = Object.keys(CATEGORY_META) as ServiceCategory[];
  readonly selectedCategory = signal<ServiceCategory | 'all'>('all');

  readonly filteredServices = computed(() => {
    const category = this.selectedCategory();
    return category === 'all' ? this.services : this.services.filter((s) => s.category === category);
  });

  categoryMeta(category: ServiceCategory) {
    return CATEGORY_META[category];
  }

  hostLabel(nodeId: string) {
    if (nodeId === 'platform') return 'Platform-wide';
    return this.mockData.getNode(nodeId)?.name ?? nodeId;
  }

  datasetsFor(ids: string[]) {
    return ids.map((id) => ({ id, title: this.datasets.find((d) => d.id === id)?.title ?? id }));
  }
}
