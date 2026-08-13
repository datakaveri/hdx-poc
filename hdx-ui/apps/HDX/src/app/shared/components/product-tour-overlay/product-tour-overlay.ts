import { NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { ProductTourService } from '../../services/product-tour.service';

interface TourDisplay {
  highlight: { top: number; left: number; width: number; height: number };
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

  constructor() {
    effect(() => {
      const step = this.tour.currentStep();
      clearTimeout(this.locateTimer);
      this.currentEl = null;
      if (!step) {
        this.display.set(null);
        return;
      }
      this.locateAttempt = 0;
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

    this.display.set({ highlight, popover: { top, left, width: POPOVER_WIDTH }, above });
  }
}
