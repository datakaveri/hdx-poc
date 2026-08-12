import { Component, inject, signal } from '@angular/core';
import { MockDataService } from '../../shared/services/mock-data.service';
import { GraphIconDefs } from '../graph-icons';
import { buildHierarchy, buildRelationships } from '../graph-data';
import { HierarchyGraph } from '../hierarchy-graph/hierarchy-graph';
import { RelationshipGraph } from '../relationship-graph/relationship-graph';

type Tab = 'hier' | 'rel';

@Component({
  selector: 'app-graph-explorer-home',
  standalone: true,
  imports: [GraphIconDefs, HierarchyGraph, RelationshipGraph],
  templateUrl: './graph-explorer-home.html',
  styleUrl: './graph-explorer-home.scss',
})
export class GraphExplorerHome {
  private readonly mockData = inject(MockDataService);

  // Defaults to the connected network view — the hierarchy tab is a
  // drill-down on top of it, not the other way round, so it shouldn't be
  // the first thing a user has to click past to see how everything links up.
  readonly tab = signal<Tab>('rel');

  readonly rings = buildHierarchy(this.mockData.getNodes(), this.mockData.getDatasets(), this.mockData.getServices());
  private readonly relationships = buildRelationships(
    this.mockData.getNodes(),
    this.mockData.getDatasets(),
    this.mockData.getServices(),
  );
  readonly relNodes = this.relationships.relNodes;
  readonly relEdges = this.relationships.relEdges;

  setTab(tab: Tab): void {
    this.tab.set(tab);
  }
}
