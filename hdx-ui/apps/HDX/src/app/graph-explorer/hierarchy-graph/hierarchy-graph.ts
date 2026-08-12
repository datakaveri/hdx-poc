import { Component, ElementRef, HostListener, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeafItem, RingItem } from '../graph-data';

interface Pt {
  x: number;
  y: number;
  a: number;
}

interface RingVisual extends RingItem {
  x: number;
  y: number;
  r: number;
  open: boolean;
  dim: boolean;
}

interface SubVisual extends LeafItem {
  x: number;
  y: number;
  r: number;
  linkPath: string;
  selected: boolean;
}

const RING_MIN_R = 26;
const SUB_R = 15;

@Component({
  selector: 'app-hierarchy-graph',
  standalone: true,
  templateUrl: './hierarchy-graph.html',
  styleUrl: './hierarchy-graph.scss',
})
export class HierarchyGraph {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly svgRef = viewChild<ElementRef<SVGSVGElement>>('svgEl');

  readonly rings = input.required<RingItem[]>();
  readonly emptyHint = input(
    'Select a node to open what it hosts — datasets open their detail page, services show inline.',
  );

  readonly dims = signal({ w: 900, h: 640 });
  readonly openIdx = signal(-1);
  readonly selectedLeaf = signal<LeafItem | null>(null);
  readonly tooltip = signal<{ x: number; y: number; html: string } | null>(null);

  readonly hint = computed(() => {
    const idx = this.openIdx();
    if (idx < 0) return this.emptyHint();
    return `Now select something hosted by ${this.rings()[idx]?.label}.`;
  });

  private readonly ringPositions = computed<Pt[]>(() => {
    const { w, h } = this.dims();
    const rings = this.rings();
    const cx = w / 2;
    const cy = h / 2;
    const rx = Math.min(w * 0.4, 340);
    const ry = h * 0.34;
    return rings.map((_, i) => {
      const a = -Math.PI / 2 + (i / rings.length) * Math.PI * 2;
      return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, a };
    });
  });

  readonly ringNodes = computed<RingVisual[]>(() => {
    const rings = this.rings();
    const positions = this.ringPositions();
    const openIdx = this.openIdx();
    return rings.map((ring, i) => {
      const p = positions[i];
      const open = i === openIdx;
      const r = ringRadius(ring.count) * (open ? 1.15 : 1);
      return { ...ring, x: p.x, y: p.y, r, open, dim: openIdx >= 0 && !open };
    });
  });

  readonly subNodes = computed<SubVisual[]>(() => {
    const openIdx = this.openIdx();
    if (openIdx < 0) return [];
    const ring = this.rings()[openIdx];
    const p = this.ringPositions()[openIdx];
    const { w, h } = this.dims();
    const subs = ring.subs;
    if (!subs.length) return [];
    const spread = Math.min(Math.PI * 0.95, 0.58 * subs.length);
    const step = subs.length > 1 ? spread / (subs.length - 1) : 0;
    const selected = this.selectedLeaf();

    return subs.map((leaf, j) => {
      const base = p.a + Math.PI;
      const a = base - spread / 2 + step * j;
      const r = Math.min(w, h) * (j % 2 ? 0.3 : 0.2);
      const pad = SUB_R + 54;
      const sx = clamp(p.x + Math.cos(a) * r, pad, w - pad);
      const sy = clamp(p.y + Math.sin(a) * r, SUB_R + 16, h - pad);
      const linkPath = `M${p.x} ${p.y} Q${(p.x + sx) / 2 + Math.cos(a) * 6} ${(p.y + sy) / 2 + Math.sin(a) * 6} ${sx} ${sy}`;
      return { ...leaf, x: sx, y: sy, r: SUB_R, linkPath, selected: selected?.id === leaf.id };
    });
  });

  constructor() {
    effect(() => {
      this.rings();
      this.measure();
    });
  }

  private measure(): void {
    const svg = this.svgRef()?.nativeElement;
    if (!svg) return;
    const w = svg.clientWidth || 900;
    const h = svg.clientHeight || 640;
    if (w !== this.dims().w || h !== this.dims().h) this.dims.set({ w, h });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.measure();
  }

  pickRing(i: number): void {
    this.openIdx.update((cur) => (cur === i ? -1 : i));
    this.selectedLeaf.set(null);
  }

  /** Dataset leaves jump straight to their detail page; service leaves show an inline detail card. */
  pickLeaf(leaf: LeafItem, event: Event): void {
    event.stopPropagation();
    if (leaf.kind === 'dataset') {
      this.router.navigate(['/datasets', leaf.id]);
      return;
    }
    this.selectedLeaf.update((cur) => (cur?.id === leaf.id ? null : leaf));
  }

  collapseAll(): void {
    this.openIdx.set(-1);
    this.selectedLeaf.set(null);
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

function ringRadius(count: number): number {
  return RING_MIN_R + Math.sqrt(count) * 6;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
