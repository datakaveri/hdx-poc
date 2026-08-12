import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FederatedNode } from '../models/federated-node.model';
import { Dataset } from '../models/dataset.model';
import { ServiceOffering } from '../models/service-offering.model';
import { environment } from '../../../environments/environment';

const API_BASE = environment.controlplaneUrl;

/**
 * Backed by the Controlplane service (see /controlplane at the repo root,
 * Elasticsearch-backed) instead of a real HDX federated-index API. `load()`
 * is awaited by an APP_INITIALIZER in app.config.ts so every component's
 * first read of getNodes()/getDatasets()/getServices() already has real
 * data; create*()/update*() write through to Controlplane and update the
 * matching in-memory signal, so any component constructed after that (e.g.
 * via a route navigation back to a list page) sees it too.
 */
@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  private readonly nodesSignal = signal<FederatedNode[]>([]);
  private readonly datasetsSignal = signal<Dataset[]>([]);
  private readonly servicesSignal = signal<ServiceOffering[]>([]);

  async load(): Promise<void> {
    const [nodes, datasets, services] = await Promise.all([
      firstValueFrom(this.http.get<FederatedNode[]>(`${API_BASE}/nodes`)),
      firstValueFrom(this.http.get<Dataset[]>(`${API_BASE}/datasets`)),
      firstValueFrom(this.http.get<ServiceOffering[]>(`${API_BASE}/services`)),
    ]);
    this.nodesSignal.set(nodes);
    this.datasetsSignal.set(datasets);
    this.servicesSignal.set(services);
  }

  getNodes(): FederatedNode[] {
    return this.nodesSignal();
  }

  getNode(id: string): FederatedNode | undefined {
    return this.nodesSignal().find((n) => n.id === id);
  }

  getDatasets(): Dataset[] {
    return this.datasetsSignal();
  }

  getDataset(id: string): Dataset | undefined {
    return this.datasetsSignal().find((d) => d.id === id);
  }

  getDatasetsByNode(nodeId: string): Dataset[] {
    return this.datasetsSignal().filter((d) => d.nodeId === nodeId);
  }

  getServices(): ServiceOffering[] {
    return this.servicesSignal();
  }

  getServicesByNode(nodeId: string): ServiceOffering[] {
    return this.servicesSignal().filter((s) => s.nodeId === nodeId);
  }

  /** Services registered to operate on this dataset — the reverse of ServiceOffering.operatesOn. */
  getServicesForDataset(datasetId: string): ServiceOffering[] {
    return this.servicesSignal().filter((s) => s.operatesOn.includes(datasetId));
  }

  async createNode(node: FederatedNode): Promise<FederatedNode> {
    const created = await firstValueFrom(this.http.post<FederatedNode>(`${API_BASE}/nodes`, node));
    this.nodesSignal.update((nodes) => [...nodes, created]);
    return created;
  }

  async createDataset(dataset: Dataset): Promise<Dataset> {
    const created = await firstValueFrom(this.http.post<Dataset>(`${API_BASE}/datasets`, dataset));
    this.datasetsSignal.update((datasets) => [...datasets, created]);
    return created;
  }

  async createService(service: ServiceOffering): Promise<ServiceOffering> {
    const created = await firstValueFrom(this.http.post<ServiceOffering>(`${API_BASE}/services`, service));
    this.servicesSignal.update((services) => [...services, created]);
    return created;
  }

  async updateService(id: string, patch: Partial<ServiceOffering>): Promise<ServiceOffering> {
    const updated = await firstValueFrom(this.http.patch<ServiceOffering>(`${API_BASE}/services/${id}`, patch));
    this.servicesSignal.update((services) => services.map((s) => (s.id === id ? updated : s)));
    return updated;
  }

  async updateDataset(id: string, patch: Partial<Dataset>): Promise<Dataset> {
    const updated = await firstValueFrom(this.http.patch<Dataset>(`${API_BASE}/datasets/${id}`, patch));
    this.datasetsSignal.update((datasets) => datasets.map((d) => (d.id === id ? updated : d)));
    return updated;
  }

  async deleteNode(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API_BASE}/nodes/${id}`));
    this.nodesSignal.update((nodes) => nodes.filter((n) => n.id !== id));
    // A node delete cascades to its datasets/services server-side — drop them locally too.
    this.datasetsSignal.update((datasets) => datasets.filter((d) => d.nodeId !== id));
    this.servicesSignal.update((services) => services.filter((s) => s.nodeId !== id));
  }

  async deleteDataset(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API_BASE}/datasets/${id}`));
    this.datasetsSignal.update((datasets) => datasets.filter((d) => d.id !== id));
  }

  async deleteService(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${API_BASE}/services/${id}`));
    this.servicesSignal.update((services) => services.filter((s) => s.id !== id));
  }

  getPendingNodes(): Promise<FederatedNode[]> {
    return firstValueFrom(this.http.get<FederatedNode[]>(`${API_BASE}/nodes/pending`));
  }

  async approveNode(id: string): Promise<FederatedNode> {
    const approved = await firstValueFrom(this.http.post<FederatedNode>(`${API_BASE}/nodes/${id}/approve`, {}));
    // The admin's own nodesSignal never had this node (it belongs to a different
    // owner and was pending), so insert it now that it's live rather than
    // waiting for a future full reload to pick it up.
    this.nodesSignal.update((nodes) => (nodes.some((n) => n.id === id) ? nodes : [...nodes, approved]));
    return approved;
  }
}
