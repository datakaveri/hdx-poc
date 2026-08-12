import { Dataset } from '../shared/models/dataset.model';
import { FederatedNode } from '../shared/models/federated-node.model';
import { ServiceOffering } from '../shared/models/service-offering.model';
import { IconKey } from './graph-icons';

export type LeafKind = 'dataset' | 'service' | 'endpoint';
export type RelNodeKind = 'node' | LeafKind | 'schema';

export interface LeafItem {
  id: string;
  label: string;
  icon: IconKey;
  kind: LeafKind;
  description: string;
  meta: string;
}

export interface RingItem {
  id: string;
  label: string;
  icon: IconKey;
  count: number;
  subs: LeafItem[];
}

export interface RelNode {
  id: string;
  label: string;
  icon: IconKey;
  kind: RelNodeKind;
  nodeId: string;
  nodeLabel: string;
  description: string;
}

export type RelEdgeRelation = 'hosts' | 'operates-on' | 'references';

export interface RelEdge {
  source: string;
  target: string;
  relation: RelEdgeRelation;
  cross: boolean;
}

/**
 * Ring items = federated nodes + a "platform" hub for network-wide services
 * (mirrors knowledge_network.html's top-level DOMS). Each ring item's subs
 * are the datasets/services it hosts — what the hierarchy tab fans out.
 */
export function buildHierarchy(nodes: FederatedNode[], datasets: Dataset[], services: ServiceOffering[]): RingItem[] {
  const rings: RingItem[] = [
    {
      id: 'platform',
      label: 'HDX Federated Index',
      icon: 'hub',
      count: 0,
      subs: services
        .filter((s) => s.nodeId === 'platform')
        .map((s) => leafFromService(s)),
    },
    ...nodes.map((n) => ({
      id: n.id,
      label: n.name,
      icon: 'hub' as IconKey,
      count: 0,
      subs: [
        ...datasets.filter((d) => d.nodeId === n.id).map((d) => leafFromDataset(d)),
        ...services.filter((s) => s.nodeId === n.id).map((s) => leafFromService(s)),
      ],
    })),
  ];
  rings.forEach((r) => (r.count = r.subs.length));
  return rings;
}

function leafFromDataset(d: Dataset): LeafItem {
  return {
    id: d.id,
    label: d.title,
    icon: 'database',
    kind: 'dataset',
    description: d.description,
    meta: `${d.track} · ${d.recordCount.toLocaleString('en-US')} records`,
  };
}

function leafFromService(s: ServiceOffering): LeafItem {
  return {
    id: s.id,
    label: s.name,
    icon: 'bolt',
    kind: 'service',
    description: s.description,
    meta: s.category,
  };
}

/**
 * Relationship graph = the whole federation as one network: federated nodes
 * (+ the platform index) own datasets and services ("hosts" edges — the same
 * ownership the hierarchy tab fans out, just drawn persistently here instead
 * of on click), and services reach across that ownership to operate on
 * datasets ("operates-on" edges). "cross" only applies to operates-on edges —
 * a "hosts" edge is never cross-node by construction — and mirrors the
 * artifact's cross-domain flag: true when a service reaches into a dataset
 * hosted by a different node (real federation, not a service operating on
 * its own node's data).
 */
export function buildRelationships(
  nodes: FederatedNode[],
  datasets: Dataset[],
  services: ServiceOffering[],
): { relNodes: RelNode[]; relEdges: RelEdge[] } {
  const relNodes: RelNode[] = [];
  const relEdges: RelEdge[] = [];
  const nodeLabel = (id: string) => nodes.find((n) => n.id === id)?.name ?? id;

  relNodes.push({
    id: 'platform',
    label: 'HDX Federated Index',
    icon: 'hub',
    kind: 'node',
    nodeId: 'platform',
    nodeLabel: 'Federation-wide index',
    description: 'Harvests each node’s DCAT adaptor and hosts the network-wide services.',
  });

  for (const n of nodes) {
    relNodes.push({
      id: n.id,
      label: n.name,
      icon: 'hub',
      kind: 'node',
      nodeId: n.id,
      nodeLabel: n.institution,
      description: n.description,
    });
  }

  for (const d of datasets) {
    relNodes.push({
      id: d.id,
      label: d.title,
      icon: 'database',
      kind: 'dataset',
      nodeId: d.nodeId,
      nodeLabel: nodeLabel(d.nodeId),
      description: d.description,
    });
    relEdges.push({ source: d.nodeId, target: d.id, relation: 'hosts', cross: false });
  }

  for (const s of services) {
    const hostId = s.nodeId === 'platform' ? 'platform' : s.nodeId;
    relNodes.push({
      id: s.id,
      label: s.name,
      icon: 'bolt',
      kind: 'service',
      nodeId: s.nodeId,
      nodeLabel: s.nodeId === 'platform' ? 'Platform-wide' : nodeLabel(s.nodeId),
      description: s.description,
    });
    relEdges.push({ source: hostId, target: s.id, relation: 'hosts', cross: false });

    for (const datasetId of s.operatesOn) {
      const dataset = datasets.find((d) => d.id === datasetId);
      if (!dataset) continue;
      relEdges.push({
        source: s.id,
        target: datasetId,
        relation: 'operates-on',
        cross: s.nodeId === 'platform' || s.nodeId !== dataset.nodeId,
      });
    }
  }

  return { relNodes, relEdges };
}
