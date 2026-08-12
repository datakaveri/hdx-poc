import { LeafItem, RelEdge, RelNode, RingItem } from '../../../graph-explorer/graph-data';
import { ParsedOpenApiSpec } from './openapi-parser';

/** One ring per tag, one leaf per operation — the leaf label encodes "METHOD /path" so the tag→path→method shape of an OpenAPI doc fits the existing 2-level ring/leaf hierarchy view. */
export function buildEndpointHierarchy(spec: ParsedOpenApiSpec): RingItem[] {
  const byTag = new Map<string, LeafItem[]>();
  for (const op of spec.operations) {
    const leaf: LeafItem = {
      id: op.operationId,
      label: `${op.method} ${op.path}`,
      icon: 'endpoint',
      kind: 'endpoint',
      description: op.summary || `${op.method} ${op.path}`,
      meta: op.summary,
    };
    const bucket = byTag.get(op.tag);
    if (bucket) bucket.push(leaf);
    else byTag.set(op.tag, [leaf]);
  }

  return [...byTag.entries()].map(([tag, subs]) => ({
    id: tag,
    label: tag,
    icon: 'hub',
    count: subs.length,
    subs,
  }));
}

/** One node per schema, one edge per `$ref` between schemas — dangling refs (outside components.schemas) were already dropped by the parser. */
export function buildSchemaGraph(spec: ParsedOpenApiSpec): { relNodes: RelNode[]; relEdges: RelEdge[] } {
  const relNodes: RelNode[] = spec.schemas.map((schema) => ({
    id: schema.name,
    label: schema.name,
    icon: 'schema',
    kind: 'schema',
    nodeId: spec.title,
    nodeLabel: spec.title,
    description: `References ${schema.refs.length} other schema${schema.refs.length === 1 ? '' : 's'}.`,
  }));

  const relEdges: RelEdge[] = spec.schemas.flatMap((schema) =>
    schema.refs.map((target) => ({ source: schema.name, target, relation: 'references' as const, cross: false })),
  );

  return { relNodes, relEdges };
}
