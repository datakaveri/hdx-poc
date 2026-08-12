import { Component, ElementRef, HostListener, computed, effect, inject, signal, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { ConceptNode, ConceptType, DetailGraph, detailGraphs, master } from './mcxde-graph-data';
import { fhirSamples } from './mcxde-fhir-samples';

// Ported from the standalone diabetes_mCxDE_v6_fhirImaging.html concept-graph
// prototype: same d3.hierarchy/d3.tree layout math and interaction model,
// re-scoped from `document` globals to this component's own view and state.

interface NodeSize {
  w: number;
  h: number;
  r?: number;
  font?: number;
}

type PositionedNode = d3.HierarchyNode<ConceptNode> & { x: number; y: number };
type DetailNode = d3.HierarchyPointNode<ConceptNode> & { _x: number; _y: number };

type FhirTab = 'profile' | 'bundle';
type View = 'master' | 'detail';

const TYPE_COLOR_VAR: Record<string, string> = {
  patient: '--patient',
  disease: '--disease',
  assessment: '--assessment',
  tech: '--tech',
  treatment: '--treatment',
  outcome: '--outcome',
  context: '--context',
  external: '--external',
};

const LEGEND_ITEMS: { type: ConceptType; label: string }[] = [
  { type: 'disease', label: 'Disease' },
  { type: 'assessment', label: 'Assessment' },
  { type: 'tech', label: 'Monitoring / Tech' },
  { type: 'treatment', label: 'Treatment' },
  { type: 'outcome', label: 'Outcome' },
  { type: 'patient', label: 'Patient' },
  { type: 'context', label: 'Special context' },
  { type: 'external', label: 'External / common' },
];

@Component({
  selector: 'app-mcxde-graph',
  standalone: true,
  templateUrl: './mcxde-graph.html',
  styleUrl: './mcxde-graph.scss',
})
export class McxdeGraph {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly svgRef = viewChild.required<ElementRef<SVGSVGElement>>('graphSvg');

  readonly currentView = signal<View>('master');
  readonly currentGraphKey = signal<string | null>(null);
  readonly currentGraphTitle = computed(() => {
    const key = this.currentGraphKey();
    return key ? detailGraphs[key]?.title ?? '' : '';
  });

  readonly activeFhirSampleKey = signal<string | null>(null);
  readonly activeFhirTab = signal<FhirTab>('profile');
  readonly copyLabel = signal('Copy JSON');

  readonly legendItems = LEGEND_ITEMS;
  readonly hiddenTypes = signal<ReadonlySet<ConceptType>>(new Set());

  readonly activeSample = computed(() => {
    const key = this.activeFhirSampleKey();
    return key ? fhirSamples[key] : null;
  });
  readonly fhirCode = computed(() => {
    const sample = this.activeSample();
    if (!sample) return '';
    return JSON.stringify(this.activeFhirTab() === 'profile' ? sample.profile : sample.bundle, null, 2);
  });

  private readonly fhirCloseBtnRef = viewChild<ElementRef<HTMLButtonElement>>('fhirCloseBtn');

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private viewport!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private zoomBehavior!: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private color: Record<string, string> = {};
  private renderBounds: { x: number; y: number; width: number; height: number } | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | undefined;
  private initialized = false;

  constructor() {
    effect(() => {
      // Trigger once the view (and #graphSvg) exists.
      this.svgRef();
      if (this.initialized) return;
      this.initialized = true;
      queueMicrotask(() => this.init());
    });

    effect(() => {
      if (this.activeFhirSampleKey()) {
        requestAnimationFrame(() => this.fhirCloseBtnRef()?.nativeElement.focus());
      }
    });

    effect(() => {
      this.hiddenTypes();
      this.applyTypeFilter();
    });
  }

  toggleType(type: ConceptType): void {
    this.hiddenTypes.update((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  private applyTypeFilter(): void {
    if (!this.viewport) return;
    const hidden = this.hiddenTypes();
    this.viewport
      .selectAll<SVGGraphicsElement, unknown>('[data-domain]')
      .transition()
      .duration(150)
      .attr('opacity', function () {
        const domain = this.getAttribute('data-domain') as ConceptType | null;
        return domain && hidden.has(domain) ? 0.12 : 1;
      });
  }

  private init(): void {
    this.svg = d3.select(this.svgRef().nativeElement);
    this.color = Object.fromEntries(
      Object.entries(TYPE_COLOR_VAR).map(([type, varName]) => [type, this.css(varName)]),
    );

    this.viewport = this.svg.append('g').attr('class', 'viewport');
    this.zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.22, 2.6])
      .on('zoom', (event) => this.viewport.attr('transform', event.transform));
    this.svg.call(this.zoomBehavior);

    this.renderMaster(false);
  }

  private css(name: string): string {
    return getComputedStyle(this.host.nativeElement).getPropertyValue(name).trim();
  }

  @HostListener('window:resize')
  onResize(): void {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if (this.currentView() === 'master') this.renderMaster(false);
      else this.renderDetail(this.currentGraphKey(), false);
    }, 120);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.activeFhirSampleKey()) this.closeFHIRModal();
  }

  showMaster(): void {
    this.currentView.set('master');
    this.currentGraphKey.set(null);
    this.renderMaster(true);
  }

  openDetail(key: string | null | undefined): void {
    if (!key || !detailGraphs[key]) return;
    this.currentView.set('detail');
    this.currentGraphKey.set(key);
    this.renderDetail(key, true);
  }

  zoomBy(factor: number): void {
    this.svg.transition().duration(180).call(this.zoomBehavior.scaleBy, factor);
  }

  closeFHIRModal(): void {
    this.activeFhirSampleKey.set(null);
  }

  openFHIRSample(key: string | null | undefined): void {
    if (!key || !fhirSamples[key]) return;
    this.activeFhirSampleKey.set(key);
    this.activeFhirTab.set('profile');
  }

  setFHIRTab(tab: FhirTab): void {
    this.activeFhirTab.set(tab);
  }

  async copyFhir(): Promise<void> {
    const text = this.fhirCode();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.copyLabel.set('Copied');
    } catch {
      this.copyLabel.set('Select / copy');
    }
    setTimeout(() => this.copyLabel.set('Copy JSON'), 1200);
  }

  private clearGraph(): void {
    this.viewport.selectAll('*').remove();
  }

  private renderMaster(animate: boolean): void {
    this.clearGraph();

    // Poster-style overview: each domain gets its own generous zone around
    // the central patient. This preserves every profile from the master graph
    // without forcing 50+ cards onto a single radial ring.
    const layoutWidth = 3650;
    const layoutHeight = 2050;
    const cx = 1675;
    const cy = 1060;

    const root = d3.hierarchy(master) as PositionedNode;
    const categories = (root.children ?? []) as PositionedNode[];
    root.x = cx;
    root.y = cy;

    // Only node positions are explicit. Category enclosures are calculated
    // from the actual node extents below, so every pale box fully contains
    // its category content and remains correct as the model evolves.
    const zones: Record<string, { catX: number; catY: number; gridX: number; gridY: number; cols: number; gapX: number; gapY: number }> = {
      disease: { catX: 900, catY: 820, gridX: 190, gridY: 180, cols: 3, gapX: 260, gapY: 118 },
      assessment: { catX: 2190, catY: 830, gridX: 2300, gridY: 170, cols: 3, gapX: 250, gapY: 108 },
      external: { catX: 1675, catY: 260, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
      context: { catX: 660, catY: 1320, gridX: 200, gridY: 1460, cols: 2, gapX: 295, gapY: 130 },
      tech: { catX: 1280, catY: 1480, gridX: 1100, gridY: 1625, cols: 3, gapX: 260, gapY: 125 },
      outcome: { catX: 2290, catY: 1480, gridX: 2080, gridY: 1625, cols: 3, gapX: 290, gapY: 118 },
      treatment: { catX: 3220, catY: 1360, gridX: 3100, gridY: 1510, cols: 2, gapX: 260, gapY: 120 },
    };

    const profileNodes: PositionedNode[] = [];
    categories.forEach((cat) => {
      const zone = zones[cat.data.id];
      if (!zone) return;
      cat.x = zone.catX;
      cat.y = zone.catY;

      (cat.children ?? []).forEach((kid, i) => {
        const k = kid as PositionedNode;
        const col = i % zone.cols;
        const row = Math.floor(i / zone.cols);
        k.x = zone.gridX + col * zone.gapX;
        k.y = zone.gridY + row * zone.gapY;
        profileNodes.push(k);
      });
    });

    const masterNodeSize = (d: PositionedNode): NodeSize => {
      if (d.depth === 0) return { w: 310, h: 102 };
      if (d.depth === 1) return { w: 258, h: 72 };
      return { w: 218, h: 52 };
    };

    const categoryEnclosure = (cat: PositionedNode) => {
      const members = [cat, ...((cat.children ?? []) as PositionedNode[])];
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      members.forEach((n) => {
        const size = masterNodeSize(n);
        minX = Math.min(minX, n.x - size.w / 2);
        maxX = Math.max(maxX, n.x + size.w / 2);
        minY = Math.min(minY, n.y - size.h / 2);
        maxY = Math.max(maxY, n.y + size.h / 2);
      });

      const padX = cat.data.id === 'external' ? 48 : 58;
      const padY = cat.data.id === 'external' ? 42 : 56;
      return { x: minX - padX, y: minY - padY, w: maxX - minX + padX * 2, h: maxY - minY + padY * 2 };
    };

    const enclosureById = new Map(categories.map((cat) => [cat.data.id, categoryEnclosure(cat)]));

    const zoneLayer = this.viewport.append('g').attr('class', 'domain-zones');
    categories.forEach((cat) => {
      const z = enclosureById.get(cat.data.id);
      if (!z) return;
      zoneLayer
        .append('rect')
        .attr('x', z.x)
        .attr('y', z.y)
        .attr('width', z.w)
        .attr('height', z.h)
        .attr('rx', 30)
        .attr('ry', 30)
        .attr('fill', this.color[cat.data.type] || this.color['external'])
        .attr('fill-opacity', cat.data.id === 'external' ? 0.075 : 0.05)
        .attr('stroke', this.color[cat.data.type] || this.color['external'])
        .attr('stroke-opacity', 0.34)
        .attr('stroke-width', 1.5)
        .attr('data-domain', cat.data.type);
    });

    const links: { source: PositionedNode; target: PositionedNode; cls: string }[] = [];
    categories.forEach((cat) => links.push({ source: root, target: cat, cls: cat.data.id === 'external' ? 'support' : '' }));
    categories.forEach((cat) => (cat.children ?? []).forEach((kid) => links.push({ source: cat, target: kid as PositionedNode, cls: '' })));

    const edgeLayer = this.viewport.append('g').attr('class', 'edges');
    edgeLayer
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('class', (d) => `edge ${d.cls || ''}`)
      .attr('d', (d) => this.curvedNodeLink(d.source, d.target, masterNodeSize))
      .attr('data-domain', (d) => d.target.data.type);

    const allNodes: PositionedNode[] = [root, ...categories, ...profileNodes];
    const nodeLayer = this.viewport.append('g').attr('class', 'nodes');
    const groups = nodeLayer
      .selectAll<SVGGElement, PositionedNode>('g.node')
      .data(allNodes, (d) => d.data.id)
      .join('g')
      .attr('class', (d) => `node ${this.nodeClass(d)} ${this.isExpandable(d) ? 'expandable' : ''} ${this.hasFHIRSample(d) ? 'fhir-sample' : ''}`)
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .attr('role', (d) => (this.isExpandable(d) || this.hasFHIRSample(d) ? 'button' : null))
      .attr('tabindex', (d) => (this.isExpandable(d) || this.hasFHIRSample(d) ? 0 : null))
      .attr('aria-label', (d) =>
        this.hasFHIRSample(d) ? `Open FHIR JSON example for ${d.data.name}` : this.isExpandable(d) ? `Open ${d.data.name} details` : d.data.name,
      )
      .attr('data-domain', (d) => d.data.type);

    this.addNodeRectsAndText(groups, (d) => {
      const size = masterNodeSize(d);
      if (d.depth === 0) return { ...size, r: 23, font: 30 };
      if (d.depth === 1) return { ...size, r: 17, font: 22 };
      return { ...size, r: 14, font: 17 };
    });

    groups
      .filter((d) => this.isExpandable(d))
      .on('click', (event, d) => {
        event.stopPropagation();
        this.openDetail(d.data.expandable);
      })
      .on('keydown', (event: KeyboardEvent, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.openDetail(d.data.expandable);
        }
      });

    groups.filter((d) => this.isExpandable(d)).call((sel) => this.addClickBadge(sel));

    groups
      .filter((d) => this.hasFHIRSample(d))
      .on('click.fhir', (event, d) => {
        event.stopPropagation();
        this.openFHIRSample(d.data.fhirSample);
      })
      .on('keydown.fhir', (event: KeyboardEvent, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.openFHIRSample(d.data.fhirSample);
        }
      })
      .call((sel) => this.addJsonBadge(sel));

    if (animate) {
      zoneLayer.attr('opacity', 0).transition().duration(260).attr('opacity', 1);
      groups.attr('opacity', 0).transition().duration(300).attr('opacity', 1);
      edgeLayer.attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    }

    this.renderBounds = { x: 0, y: 0, width: layoutWidth, height: layoutHeight };
    this.applyTypeFilter();
    requestAnimationFrame(() => this.fitGraph());
  }

  private renderDetail(key: string | null, animate: boolean): void {
    this.clearGraph();
    if (!key) return;
    const graph: DetailGraph | undefined = detailGraphs[key];
    if (!graph) return;

    const svgNode = this.svg.node()!;
    const width = Math.max(1050, svgNode.clientWidth || 1200);
    const height = Math.max(760, svgNode.clientHeight || 800);

    const root = d3.hierarchy(graph.data);
    const nodeCount = root.descendants().length;
    const leafCount = root.leaves().length;
    const layoutHeight = Math.max(height - 120, Math.min(2400, 42 * leafCount + 110));
    const maxDepth = d3.max(root.descendants(), (d) => d.depth) || 1;
    const layoutWidth = Math.max(width - 180, 900 + Math.max(0, maxDepth - 2) * 230);
    void nodeCount;

    const tree = d3
      .tree<ConceptNode>()
      .size([layoutHeight, layoutWidth - 320])
      .separation((a, b) => (a.parent === b.parent ? 1.05 : 1.3));
    tree(root);

    // D3 tree uses x as vertical and y as horizontal. Offset into canvas.
    const nodes = root.descendants() as DetailNode[];
    nodes.forEach((d) => {
      d._x = d.y + 130;
      d._y = d.x + 70;
    });

    const detailNodeSize = (d: DetailNode): Required<NodeSize> => {
      if (d.depth === 0) return { w: 222, h: 60, r: 16, font: 20 };
      if (d.depth === 1) return { w: 238, h: 46, r: 13, font: 15 };
      if (d.depth === 2) return { w: 212, h: 34, r: 10, font: 13 };
      return { w: 196, h: 31, r: 10, font: 12 };
    };

    // Tree edges connect to the visible card boundaries rather than to the
    // node centres. This keeps lines from appearing to run through cards.
    const linkGen = d3
      .linkHorizontal<unknown, { x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y);

    const edgeLayer = this.viewport.append('g').attr('class', 'edges').attr('data-domain', graph.type);
    edgeLayer
      .selectAll('path')
      .data(root.links() as { source: DetailNode; target: DetailNode }[])
      .join('path')
      .attr('class', 'edge')
      .attr('d', (d) => {
        const ss = detailNodeSize(d.source);
        const ts = detailNodeSize(d.target);
        return linkGen({
          source: { x: d.source._x + ss.w / 2, y: d.source._y },
          target: { x: d.target._x - ts.w / 2, y: d.target._y },
        });
      });

    const byId = new Map(nodes.map((d) => [d.data.id, d]));
    const crossLayer = this.viewport.append('g').attr('class', 'cross-links').attr('data-domain', graph.type);

    // Cross-links are semantic relationships between profile cards. Anchor
    // each relationship on the two *facing* card edges (bottom of the upper
    // card / top of the lower card). Adjacent cards get the shortest direct
    // connection. Longer relationships briefly leave the card vertically,
    // move into a clearly separated lane to the left, then re-enter at the
    // facing edge of the destination card. This keeps endpoints intuitive
    // while preventing a long dotted line from cutting through intervening
    // cards.
    interface CrossSpec {
      a: DetailNode;
      b: DetailNode;
      upper: DetailNode;
      lower: DetailNode;
      label: string;
      idx: number;
      gap: number;
      intervening: number;
      upperSize: Required<NodeSize>;
      lowerSize: Required<NodeSize>;
      direct: boolean;
      laneIndex?: number;
      [offsetKey: string]: unknown;
    }

    const crossSpecs: CrossSpec[] = (graph.crossLinks || [])
      .map(([from, to, label], idx): CrossSpec | null => {
        const a = byId.get(from);
        const b = byId.get(to);
        if (!a || !b) return null;
        const upper = a._y <= b._y ? a : b;
        const lower = a._y <= b._y ? b : a;
        const upperSize = detailNodeSize(upper);
        const lowerSize = detailNodeSize(lower);
        const upperAnchorY = upper._y + upperSize.h / 2;
        const lowerAnchorY = lower._y - lowerSize.h / 2;
        const gap = Math.max(0, lowerAnchorY - upperAnchorY);
        const intervening = nodes.filter((n) => n.depth === upper.depth && n !== upper && n !== lower && n._y > upper._y && n._y < lower._y).length;
        return { a, b, upper, lower, label, idx, gap, intervening, upperSize, lowerSize, direct: intervening === 0 };
      })
      .filter((s): s is CrossSpec => s !== null);

    // Long links are given spacious, deterministic lanes. The longest
    // relationships sit furthest left; shorter ones remain closer to the
    // cards. This avoids the nearly-overlapping bundle seen previously.
    const routed = crossSpecs.filter((s) => !s.direct).sort((p, q) => q.intervening - p.intervening || q.gap - p.gap || p.idx - q.idx);
    routed.forEach((s, laneIndex) => {
      s.laneIndex = laneIndex;
    });

    // Give every relationship its own attachment point when several dotted
    // lines meet the same card edge. Direct adjacent links stay near the
    // centre; longer routed links occupy distinct points across the left
    // portion of the facing edge, matching the side on which their lanes run.
    const anchorGroups = new Map<string, { spec: CrossSpec; node: DetailNode; side: string; size: Required<NodeSize> }[]>();
    const registerAnchor = (spec: CrossSpec, node: DetailNode, side: string, size: Required<NodeSize>) => {
      const key = `${node.data.id}:${side}`;
      if (!anchorGroups.has(key)) anchorGroups.set(key, []);
      anchorGroups.get(key)!.push({ spec, node, side, size });
    };
    crossSpecs.forEach((spec) => {
      registerAnchor(spec, spec.upper, 'bottom', spec.upperSize);
      registerAnchor(spec, spec.lower, 'top', spec.lowerSize);
    });

    anchorGroups.forEach((items) => {
      const directItems = items.filter((i) => i.spec.direct);
      const routedItems = items.filter((i) => !i.spec.direct).sort((a, b) => (a.spec.laneIndex ?? 0) - (b.spec.laneIndex ?? 0) || a.spec.idx - b.spec.idx);

      directItems.forEach((item, i) => {
        // Normally there is only one direct relation per side. If there are
        // more, fan them gently around the centre rather than stacking them.
        item.spec[`${item.node.data.id}_${item.side}_offset`] = (i - (directItems.length - 1) / 2) * 22;
      });

      const usable = items[0].size.w * 0.31;
      routedItems.forEach((item, i) => {
        const t = routedItems.length === 1 ? 0.5 : i / (routedItems.length - 1);
        // Keep routed attachment points predominantly on the left half so
        // their short connector stubs do not cross one another unnecessarily.
        item.spec[`${item.node.data.id}_${item.side}_offset`] = -usable + t * (usable * 0.82);
      });
    });

    crossSpecs.forEach((spec) => {
      const { upper, lower, label, direct } = spec;
      const upperOffset = (spec[`${upper.data.id}_bottom_offset`] as number) || 0;
      const lowerOffset = (spec[`${lower.data.id}_top_offset`] as number) || 0;
      const upperAnchor = { x: upper._x + upperOffset, y: upper._y + spec.upperSize.h / 2 };
      const lowerAnchor = { x: lower._x + lowerOffset, y: lower._y - spec.lowerSize.h / 2 };

      let pathD: string;
      let labelX: number;
      let labelY: number;
      const labelRotation = -90;

      if (direct) {
        // The nearest points of adjacent cards are their facing top/bottom
        // edges, so simply connect those points.
        pathD = `M${upperAnchor.x},${upperAnchor.y} L${lowerAnchor.x},${lowerAnchor.y}`;
        labelX = upperAnchor.x - 8;
        labelY = (upperAnchor.y + lowerAnchor.y) / 2;
      } else {
        const leftEdge = Math.min(upper._x - spec.upperSize.w / 2, lower._x - spec.lowerSize.w / 2);
        const laneX = leftEdge - 34 - (spec.laneIndex ?? 0) * 30;
        const stub = 18;
        const radius = 12;
        const startStubY = upperAnchor.y + stub;
        const endStubY = lowerAnchor.y - stub;

        // Rounded orthogonal route: leave the closest edge vertically,
        // peel left into a dedicated lane, travel past intervening cards,
        // then return to the closest edge of the destination card.
        pathD = [
          `M${upperAnchor.x},${upperAnchor.y}`,
          `L${upperAnchor.x},${startStubY - radius}`,
          `Q${upperAnchor.x},${startStubY} ${upperAnchor.x - radius},${startStubY}`,
          `L${laneX + radius},${startStubY}`,
          `Q${laneX},${startStubY} ${laneX},${startStubY + radius}`,
          `L${laneX},${endStubY - radius}`,
          `Q${laneX},${endStubY} ${laneX + radius},${endStubY}`,
          `L${lowerAnchor.x - radius},${endStubY}`,
          `Q${lowerAnchor.x},${endStubY} ${lowerAnchor.x},${endStubY + radius}`,
          `L${lowerAnchor.x},${lowerAnchor.y}`,
        ].join(' ');

        labelX = laneX - 6;
        labelY = (startStubY + endStubY) / 2;
      }

      crossLayer.append('path').attr('class', 'cross-edge').attr('d', pathD);
      crossLayer
        .append('text')
        .attr('class', 'cross-label')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('transform', `rotate(${labelRotation} ${labelX} ${labelY})`)
        .text(label);
    });

    const nodeLayer = this.viewport.append('g').attr('class', 'nodes').attr('data-domain', graph.type);
    const groups = nodeLayer
      .selectAll<SVGGElement, DetailNode>('g.node')
      .data(nodes, (d) => d.data.id)
      .join('g')
      .attr('class', (d) => `node ${this.nodeClass(d)} ${d.depth === 0 || d.data.expandable ? 'expandable' : ''} ${this.hasFHIRSample(d) ? 'fhir-sample' : ''}`)
      .attr('transform', (d) => `translate(${d._x},${d._y})`)
      .attr('role', (d) => (d.depth === 0 || d.data.expandable || this.hasFHIRSample(d) ? 'button' : null))
      .attr('tabindex', (d) => (d.depth === 0 || d.data.expandable || this.hasFHIRSample(d) ? 0 : null))
      .attr('aria-label', (d) =>
        this.hasFHIRSample(d)
          ? `Open FHIR JSON example for ${d.data.name}`
          : d.depth === 0
            ? 'Return to overview'
            : d.data.expandable
              ? `Open ${d.data.name} details`
              : d.data.name,
      );

    this.addNodeRectsAndText(groups, detailNodeSize);

    groups
      .filter((d) => d.depth === 0)
      .on('click', (event) => {
        event.stopPropagation();
        this.showMaster();
      });

    groups
      .filter((d) => !!d.data.expandable)
      .on('click', (event, d) => {
        event.stopPropagation();
        this.openDetail(d.data.expandable);
      });

    groups.filter((d) => d.depth === 0 || !!d.data.expandable).call((sel) => this.addClickBadge(sel));

    groups
      .filter((d) => this.hasFHIRSample(d))
      .on('click.fhir', (event, d) => {
        event.stopPropagation();
        this.openFHIRSample(d.data.fhirSample);
      })
      .on('keydown.fhir', (event: KeyboardEvent, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.openFHIRSample(d.data.fhirSample);
        }
      })
      .call((sel) => this.addJsonBadge(sel));

    if (animate) {
      groups.attr('opacity', 0).transition().duration(280).attr('opacity', 1);
      edgeLayer.attr('opacity', 0).transition().duration(280).attr('opacity', 1);
      crossLayer.attr('opacity', 0).transition().delay(100).duration(280).attr('opacity', 1);
    }

    this.renderBounds = { x: 20, y: 20, width: layoutWidth, height: layoutHeight + 130 };
    this.applyTypeFilter();
    requestAnimationFrame(() => this.fitGraph());
  }

  private addNodeRectsAndText<D extends { data: ConceptNode; depth: number }>(
    selection: d3.Selection<SVGGElement, D, SVGGElement, unknown>,
    sizeFn: (d: D) => Required<NodeSize>,
  ): void {
    const self = this;
    selection.each(function (d) {
      const g = d3.select(this);
      const s = sizeFn(d);
      const fill = self.nodeFill(d);

      g.append('rect').attr('x', -s.w / 2).attr('y', -s.h / 2).attr('width', s.w).attr('height', s.h).attr('rx', s.r).attr('ry', s.r).attr('fill', fill);

      const lines = self.wrapLabel(d.data.name, s.w - 22, s.font, d.depth <= 1 ? 2 : 2);
      const text = g
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('class', d.depth <= 1 ? 'label-main' : 'label-sub')
        .style('font-size', `${s.font}px`);

      const lineHeight = s.font * 1.16;
      const y0 = -((lines.length - 1) * lineHeight) / 2 + 1;
      lines.forEach((line, i) => {
        text.append('tspan').attr('x', 0).attr('y', y0 + i * lineHeight).text(line);
      });
    });
  }

  private addClickBadge<D>(selection: d3.Selection<SVGGElement, D, SVGGElement, unknown>): void {
    selection.each(function () {
      const g = d3.select(this);
      const bbox = this.getBBox();
      const badge = g.append('g').attr('class', 'click-badge').attr('transform', `translate(${bbox.x + bbox.width - 7},${bbox.y + 7})`);
      badge.append('circle').attr('r', 8);
      badge.append('text').text('+');
    });
  }

  private addJsonBadge<D>(selection: d3.Selection<SVGGElement, D, SVGGElement, unknown>): void {
    selection.each(function () {
      const g = d3.select(this);
      const bbox = this.getBBox();
      const badge = g.append('g').attr('class', 'json-badge').attr('transform', `translate(${bbox.x + bbox.width - 24},${bbox.y + 9})`);
      badge.append('rect').attr('x', -18).attr('y', -8).attr('width', 36).attr('height', 16).attr('rx', 6).attr('ry', 6);
      badge.append('text').text('JSON');
    });
  }

  private hasFHIRSample(d: { data: ConceptNode }): boolean {
    return Boolean(d.data.fhirSample && fhirSamples[d.data.fhirSample]);
  }

  private nodeClass(d: { data: ConceptNode }): string {
    if (d.data.type === 'element') return 'element';
    if (d.data.type === 'value') return 'value';
    return 'profile';
  }

  private nodeFill(d: { data: ConceptNode }): string {
    if (d.data.type === 'element' || d.data.type === 'value') return '#ffffff';
    return this.color[d.data.type] || this.color['external'];
  }

  private isExpandable(d: { data: ConceptNode }): boolean {
    return Boolean(d.data.expandable);
  }

  private curvedLink(x1: number, y1: number, x2: number, y2: number): string {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.max(1, Math.hypot(dx, dy));
    const offset = Math.min(28, length * 0.07);
    const nx = -dy / length;
    const ny = dx / length;
    return `M${x1},${y1} Q${mx + nx * offset},${my + ny * offset} ${x2},${y2}`;
  }

  private rectEdgePoint(node: { x: number; y: number }, toward: { x: number; y: number }, sizeFn: (d: any) => NodeSize): { x: number; y: number } {
    const s = sizeFn(node);
    const dx = toward.x - node.x;
    const dy = toward.y - node.y;
    if (dx === 0 && dy === 0) return { x: node.x, y: node.y };

    const halfW = s.w / 2;
    const halfH = s.h / 2;
    const scaleX = dx === 0 ? Infinity : halfW / Math.abs(dx);
    const scaleY = dy === 0 ? Infinity : halfH / Math.abs(dy);
    const t = Math.min(scaleX, scaleY);
    return { x: node.x + dx * t, y: node.y + dy * t };
  }

  private curvedNodeLink(source: { x: number; y: number }, target: { x: number; y: number }, sizeFn: (d: any) => NodeSize): string {
    const start = this.rectEdgePoint(source, target, sizeFn);
    const end = this.rectEdgePoint(target, source, sizeFn);
    return this.curvedLink(start.x, start.y, end.x, end.y);
  }

  private wrapLabel(text: string, maxWidth: number, fontSize: number, maxLines: number): string[] {
    const approxChar = fontSize * 0.56;
    const maxChars = Math.max(8, Math.floor(maxWidth / approxChar));
    const words = String(text).split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= maxChars || !line) {
        line = candidate;
      } else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    if (lines.length <= maxLines) return lines;
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]?$/, '') + '…';
    return kept;
  }

  fitGraph(): void {
    if (!this.renderBounds || !this.svg) return;
    const svgNode = this.svg.node()!;
    const vw = svgNode.clientWidth || 1200;
    const vh = svgNode.clientHeight || 800;
    const padX = this.currentView() === 'master' ? 55 : 75;
    const padY = this.currentView() === 'master' ? 55 : 75;
    const scale = Math.min(1.28, (vw - padX * 2) / this.renderBounds.width, (vh - padY * 2) / this.renderBounds.height);
    const tx = (vw - this.renderBounds.width * scale) / 2 - this.renderBounds.x * scale;
    const ty = (vh - this.renderBounds.height * scale) / 2 - this.renderBounds.y * scale;
    this.svg.transition().duration(320).call(this.zoomBehavior.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
  }
}
