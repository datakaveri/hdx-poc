import { Component, computed, input, signal } from '@angular/core';
import { GraphIconDefs } from '../../../../graph-explorer/graph-icons';
import { HierarchyGraph } from '../../../../graph-explorer/hierarchy-graph/hierarchy-graph';
import { RelationshipGraph } from '../../../../graph-explorer/relationship-graph/relationship-graph';
import { ParsedOpenApiSpec } from '../openapi-parser';
import { buildEndpointHierarchy, buildSchemaGraph } from '../spec-graph-data';

type Tab = 'endpoints' | 'schemas';

/** Same tabbed hierarchy/relationship pattern as graph-explorer-home, retargeted at one uploaded OpenAPI spec instead of the whole federation. */
@Component({
  selector: 'app-spec-diagram-viewer',
  standalone: true,
  imports: [GraphIconDefs, HierarchyGraph, RelationshipGraph],
  templateUrl: './spec-diagram-viewer.html',
  styleUrl: './spec-diagram-viewer.scss',
})
export class SpecDiagramViewer {
  readonly spec = input.required<ParsedOpenApiSpec>();

  readonly tab = signal<Tab>('endpoints');

  readonly rings = computed(() => buildEndpointHierarchy(this.spec()));
  private readonly schemaGraph = computed(() => buildSchemaGraph(this.spec()));
  readonly relNodes = computed(() => this.schemaGraph().relNodes);
  readonly relEdges = computed(() => this.schemaGraph().relEdges);

  setTab(tab: Tab): void {
    this.tab.set(tab);
  }
}
