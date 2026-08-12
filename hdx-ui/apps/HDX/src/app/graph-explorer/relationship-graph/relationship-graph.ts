import { AfterViewInit, Component, ElementRef, HostListener, effect, inject, input, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RelEdge, RelEdgeRelation, RelNode } from '../graph-data';

interface Pos {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface RenderNode extends RelNode {
  x: number;
  y: number;
  r: number;
  degree: number;
}

interface RenderEdge extends RelEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const ITERATIONS = 450;
const REPULSION_K = 19000;
const SPRING_TARGET_HOSTS = 120;
const SPRING_TARGET_OPERATES = 190;
const SPRING_TARGET_REFERENCES = 150;
const SPRING_K = 0.02;
const CENTER_K = 0.004;
const DAMPING = 0.82;
const COLLISION_PAD = 44;

/**
 * Ports knowledge_network.html's tab-2 force-directed graph: a synchronous
 * N-iteration spring/repulsion relaxation (no external physics library),
 * re-run whenever the data or the "cross-node only" filter changes.
 * Positions persist across re-layouts (see `pos`) so toggling the filter
 * doesn't reset the whole graph — it settles from where it already was.
 */
@Component({
  selector: 'app-relationship-graph',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './relationship-graph.html',
  styleUrl: './relationship-graph.scss',
})
export class RelationshipGraph implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly svgRef = viewChild<ElementRef<SVGSVGElement>>('svgEl');

  readonly relNodes = input.required<RelNode[]>();
  readonly relEdges = input.required<RelEdge[]>();
  /** Federation-specific copy/controls (cross-node filter, hosts/operates-on legend) — off for domains like a schema-reference graph that only has one relation kind. */
  readonly showCrossFilter = input(true);
  readonly hint = input(
    'Select a node or service to isolate its connections, or a link to see what it connects. Selecting a dataset opens its detail page directly.',
  );

  readonly crossOnly = signal(false);
  readonly selectedId = signal<string | null>(null);
  readonly selectedEdge = signal<RenderEdge | null>(null);
  readonly tooltip = signal<{ x: number; y: number; html: string } | null>(null);

  readonly renderNodes = signal<RenderNode[]>([]);
  readonly renderEdges = signal<RenderEdge[]>([]);

  private readonly pos = new Map<string, Pos>();
  private dims = { w: 900, h: 640 };

  constructor() {
    effect(() => {
      this.relNodes();
      this.relEdges();
      this.crossOnly();
      queueMicrotask(() => this.relayout());
    });
  }

  ngAfterViewInit(): void {
    this.measure();
    this.relayout();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.measure();
    this.relayout();
  }

  private measure(): void {
    const svg = this.svgRef()?.nativeElement;
    if (!svg) return;
    this.dims = { w: svg.clientWidth || 900, h: svg.clientHeight || 640 };
  }

  toggleCrossOnly(): void {
    this.crossOnly.update((v) => !v);
  }

  private relayout(): void {
    const { w, h } = this.dims;
    const edges = this.relEdges().filter((e) => !this.crossOnly() || e.cross);
    const degree = new Map<string, number>();
    edges.forEach((e) => {
      degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
      degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
    });
    const live = this.relNodes().filter((n) => (degree.get(n.id) ?? 0) > 0);

    live.forEach((n, i) => {
      if (this.pos.has(n.id)) return;
      const a = (i / live.length) * Math.PI * 2;
      this.pos.set(n.id, { x: w / 2 + Math.cos(a) * w * 0.28, y: h / 2 + Math.sin(a) * h * 0.3, vx: 0, vy: 0 });
    });

    const radius = (n: RelNode) => {
      const base = n.kind === 'node' ? 16 : 12;
      return base + Math.min(degree.get(n.id) ?? 0, 8) * 2.2;
    };
    const radiusById = new Map(live.map((n) => [n.id, radius(n)]));

    for (let it = 0; it < ITERATIONS; it++) {
      for (let a = 0; a < live.length; a++) {
        for (let b = a + 1; b < live.length; b++) {
          const pi = this.pos.get(live[a].id)!;
          const pj = this.pos.get(live[b].id)!;
          const dx = pj.x - pi.x;
          const dy = pj.y - pi.y;
          const d2 = dx * dx + dy * dy || 1;
          const d = Math.sqrt(d2);
          const rep = REPULSION_K / d2;
          const fx = (dx / d) * rep;
          const fy = (dy / d) * rep;
          pi.vx -= fx;
          pi.vy -= fy;
          pj.vx += fx;
          pj.vy += fy;

          const minD = radiusById.get(live[a].id)! + radiusById.get(live[b].id)! + COLLISION_PAD;
          if (d < minD) {
            const push = ((minD - d) * 0.34) / d;
            pi.x -= dx * push;
            pi.y -= dy * push;
            pj.x += dx * push;
            pj.y += dy * push;
          }
        }
      }

      edges.forEach((e) => {
        const pi = this.pos.get(e.source);
        const pj = this.pos.get(e.target);
        if (!pi || !pj) return;
        const dx = pj.x - pi.x;
        const dy = pj.y - pi.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const target =
          e.relation === 'hosts'
            ? SPRING_TARGET_HOSTS
            : e.relation === 'references'
              ? SPRING_TARGET_REFERENCES
              : SPRING_TARGET_OPERATES;
        const f = (d - target) * SPRING_K;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        pi.vx += fx;
        pi.vy += fy;
        pj.vx -= fx;
        pj.vy -= fy;
      });

      live.forEach((n) => {
        const p = this.pos.get(n.id)!;
        p.vx += (w / 2 - p.x) * CENTER_K;
        p.vy += (h / 2 - p.y) * CENTER_K;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        const r = radiusById.get(n.id)! + 36;
        p.x = Math.max(r, Math.min(w - r, p.x));
        p.y = Math.max(r + 8, Math.min(h - r, p.y));
      });
    }

    this.renderNodes.set(
      live.map((n) => {
        const p = this.pos.get(n.id)!;
        return { ...n, x: p.x, y: p.y, r: radiusById.get(n.id)!, degree: degree.get(n.id) ?? 0 };
      }),
    );
    this.renderEdges.set(
      edges.map((e) => {
        const pi = this.pos.get(e.source)!;
        const pj = this.pos.get(e.target)!;
        return { ...e, x1: pi.x, y1: pi.y, x2: pj.x, y2: pj.y };
      }),
    );
  }

  isNodeDim(id: string): boolean {
    const sel = this.selectedId();
    if (sel === null) return false;
    if (sel === id) return false;
    return !this.renderEdges().some((e) => (e.source === sel && e.target === id) || (e.target === sel && e.source === id));
  }

  isEdgeDim(edge: RenderEdge): boolean {
    const sel = this.selectedId();
    if (sel === null) return false;
    return edge.source !== sel && edge.target !== sel;
  }

  /** Dataset nodes jump straight to their detail page; node/service nodes select for neighborhood isolation. */
  pickNode(node: RenderNode, event: Event): void {
    event.stopPropagation();
    if (node.kind === 'dataset') {
      this.router.navigate(['/datasets', node.id]);
      return;
    }
    this.selectedId.update((cur) => (cur === node.id ? null : node.id));
    this.selectedEdge.set(null);
  }

  pickEdge(edge: RenderEdge, event: Event): void {
    event.stopPropagation();
    this.selectedEdge.set(edge);
  }

  clearSelection(): void {
    this.selectedId.set(null);
    this.selectedEdge.set(null);
  }

  nodeById(id: string): RenderNode | undefined {
    return this.renderNodes().find((n) => n.id === id);
  }

  relationLabel(relation: RelEdgeRelation): string {
    if (relation === 'hosts') return ' hosts ';
    if (relation === 'references') return ' references ';
    return ' → ';
  }

  showTip(event: MouseEvent, html: string): void {
    const box = this.elementRef.nativeElement.querySelector('.graphbox') as HTMLElement;
    const b = box.getBoundingClientRect();
    this.tooltip.set({ x: event.clientX - b.left, y: event.clientY - b.top, html });
  }

  hideTip(): void {
    this.tooltip.set(null);
  }
}
