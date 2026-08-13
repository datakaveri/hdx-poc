import { NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { ProductTourService } from '../../services/product-tour.service';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TourDisplay {
  highlight: Rect;
  /** Full-viewport minus `highlight`, as 4 bands — blocks clicks everywhere except the spotlighted element. */
  blockers: Rect[];
  popover: { top: number; left: number; width: number };
  above: boolean;
}

const HIGHLIGHT_PADDING = 8;
const POPOVER_WIDTH = 340;
const POPOVER_EST_HEIGHT = 190;
const VIEWPORT_MARGIN = 16;
const LOCATE_RETRY_MS = 60;
const LOCATE_MAX_ATTEMPTS = 40;

/**
 * Mounted once at app root (see app.html), like `ConfirmDialogHost` — reads
 * `ProductTourService`'s current step and, whenever it changes, locates the
 * step's target element (retrying, since a route change may still be loading
 * its lazy chunk) and renders a spotlight ring + popover around it.
 */
@Component({
  selector: 'app-product-tour-overlay',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './product-tour-overlay.html',
  styleUrl: './product-tour-overlay.scss',
})
export class ProductTourOverlay {
  readonly tour = inject(ProductTourService);

  readonly display = signal<TourDisplay | null>(null);

  private currentEl: HTMLElement | null = null;
  private locateAttempt = 0;
  private locateTimer?: ReturnType<typeof setTimeout>;
  private pendingAutofill?: string;

  readonly checklistCollapsed = signal(false);

  constructor() {
    effect(() => {
      const step = this.tour.currentStep();
      clearTimeout(this.locateTimer);
      this.currentEl = null;
      if (!step?.selector) {
        // No selector = a centered, un-anchored slide (chapter intros) — reuses the
        // same "target not found" fallback rendering, just without ever trying to locate one.
        this.display.set(null);
        return;
      }
      this.locateAttempt = 0;
      this.pendingAutofill = step.autofill;
      this.locate(step.selector);
    });
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onViewportChange(): void {
    if (this.currentEl) this.measure(this.currentEl);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.tour.active()) this.tour.end();
  }

  private locate(selector: string): void {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      this.currentEl = el;
      this.applyAutofill(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.locateTimer = setTimeout(() => this.measure(el), 300);
      return;
    }
    if (this.locateAttempt++ < LOCATE_MAX_ATTEMPTS) {
      this.locateTimer = setTimeout(() => this.locate(selector), LOCATE_RETRY_MS);
    } else {
      this.display.set(null);
    }
  }

  /**
   * Fills the target (or the first input/textarea inside it) with the step's
   * `autofill` value, dispatching a real `input` event so Angular's NgModel
   * value accessor (which listens for that event, not property assignment)
   * picks up the change — a plain `el.value = ...` alone wouldn't update the
   * bound signal.
   */
  private applyAutofill(el: HTMLElement): void {
    const value = this.pendingAutofill;
    if (!value) return;
    this.pendingAutofill = undefined;
    const target = (el.matches('input, textarea') ? el : el.querySelector('input, textarea')) as HTMLInputElement | null;
    if (!target || target.value === value) return;
    target.value = value;
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }

  private measure(el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const highlight = {
      top: r.top - HIGHLIGHT_PADDING,
      left: r.left - HIGHLIGHT_PADDING,
      width: r.width + HIGHLIGHT_PADDING * 2,
      height: r.height + HIGHLIGHT_PADDING * 2,
    };

    const fitsBelow = r.bottom + VIEWPORT_MARGIN + POPOVER_EST_HEIGHT <= viewportH;
    const fitsAbove = r.top - VIEWPORT_MARGIN - POPOVER_EST_HEIGHT >= 0;
    const above = !fitsBelow && fitsAbove;

    const top = above
      ? Math.max(VIEWPORT_MARGIN, r.top - VIEWPORT_MARGIN - POPOVER_EST_HEIGHT)
      : Math.min(r.bottom + VIEWPORT_MARGIN, viewportH - POPOVER_EST_HEIGHT - VIEWPORT_MARGIN);
    const left = Math.min(Math.max(r.left, VIEWPORT_MARGIN), viewportW - POPOVER_WIDTH - VIEWPORT_MARGIN);

    this.display.set({ highlight, blockers: this.computeBlockers(highlight, viewportW, viewportH), popover: { top, left, width: POPOVER_WIDTH }, above });
  }

  /**
   * Clicks anywhere on the page should be swallowed during the tour EXCEPT on
   * the spotlighted element itself — some steps (the glaucoma demo) require
   * the user to actually click the highlighted button to progress. A single
   * full-page scrim can't leave a click-through hole, so we cover everything
   * but the highlight with 4 bands (top/bottom/left/right) instead.
   */
  private computeBlockers(highlight: Rect, viewportW: number, viewportH: number): Rect[] {
    const hTop = Math.max(0, highlight.top);
    const hBottom = Math.min(viewportH, highlight.top + highlight.height);
    const hLeft = Math.max(0, highlight.left);
    const hRight = Math.min(viewportW, highlight.left + highlight.width);

    return [
      { top: 0, left: 0, width: viewportW, height: hTop },
      { top: hBottom, left: 0, width: viewportW, height: Math.max(0, viewportH - hBottom) },
      { top: hTop, left: 0, width: hLeft, height: hBottom - hTop },
      { top: hTop, left: hRight, width: Math.max(0, viewportW - hRight), height: hBottom - hTop },
    ];
  }
}
