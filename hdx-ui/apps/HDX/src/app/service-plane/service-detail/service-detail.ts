import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../shared/services/mock-data.service';
import { NodeBadge } from '../../shared/components/node-badge/node-badge';
import { RequestAccessButton } from '../../shared/components/request-access-button/request-access-button';
import { parseOpenApiSpec } from '../../onboarding/service-onboarding/spec-diagram/openapi-parser';
import { SpecDiagramViewer } from '../../onboarding/service-onboarding/spec-diagram/spec-diagram-viewer/spec-diagram-viewer';
import { ServiceCategory } from '../../shared/models';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'tee-enclave': 'TEE / Secure Enclave',
  mlops: 'MLOps as a Service',
  'federated-query': 'Federated Query Aggregation',
  'federated-learning': 'Federated Learning + DEPA',
  'no-code-editor': 'No-Code Editor',
  'jupyter-sandbox': 'Jupyter Sandbox',
};

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, NodeBadge, RequestAccessButton, SpecDiagramViewer],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetailHome {
  private readonly mockData = inject(MockDataService);

  // Bound from the `:id` route param via withComponentInputBinding().
  readonly id = input.required<string>();

  readonly service = computed(() => this.mockData.getServices().find((s) => s.id === this.id()));

  constructor() {
    // Not in the (visibility-filtered) local cache yet — e.g. a direct link to
    // someone else's private service — try fetching it by id directly.
    effect(() => {
      const id = this.id();
      if (!this.mockData.getServices().some((s) => s.id === id)) {
        this.mockData.fetchServiceById(id);
      }
    });
  }

  readonly node = computed(() => {
    const svc = this.service();
    return svc && svc.nodeId !== 'platform' ? this.mockData.getNode(svc.nodeId) : undefined;
  });
  readonly operatesOnDatasets = computed(() => {
    const svc = this.service();
    if (!svc) return [];
    return svc.operatesOn.map((id) => this.mockData.getDataset(id)).filter((d) => !!d);
  });

  readonly categoryLabel = computed(() => {
    const category = this.service()?.category;
    return category ? CATEGORY_LABELS[category] : '';
  });

  readonly parsedSpec = computed(() => {
    const raw = this.service()?.openApiSpec;
    if (!raw) return undefined;
    try {
      return parseOpenApiSpec(raw);
    } catch {
      return undefined;
    }
  });

  hostLabel(nodeId: string): string {
    if (nodeId === 'platform') return 'Platform-wide';
    return this.mockData.getNode(nodeId)?.name ?? nodeId;
  }
}
