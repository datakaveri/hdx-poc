import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TourStep } from '../models';

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    selector: '[data-tour="logo"]',
    title: 'Welcome to HDX',
    description:
      'A quick tour of the federation console: browsing federated nodes, onboarding new data, exploring data formats, and requesting access to private resources.',
  },
  {
    id: 'nav-nodes',
    route: '/nodes',
    selector: '[data-tour="nav-nodes"]',
    title: 'Federated Nodes',
    description: 'Every institution on the exchange keeps its own data — only metadata is shared with the federated index.',
  },
  {
    id: 'node-grid',
    route: '/nodes',
    selector: '[data-tour="node-grid"]',
    title: 'Browse nodes',
    description: 'Each card shows how many datasets and services a node hosts. Click through to drill into what it offers.',
  },
  {
    id: 'nav-onboarding',
    route: '/onboarding',
    selector: '[data-tour="nav-onboarding"]',
    title: 'Onboarding',
    description: 'Bring a new node, dataset, or service onto the exchange from here.',
  },
  {
    id: 'onboarding-grid',
    route: '/onboarding',
    selector: '[data-tour="onboarding-grid"]',
    title: 'Guided wizards',
    description:
      'Each card launches a step-by-step wizard. Onboard your node first — once it is approved, dataset and service onboarding open up under it.',
  },
  {
    id: 'nav-data-formats',
    route: '/data-formats',
    selector: '[data-tour="nav-data-formats"]',
    title: 'Data Formats',
    description: 'The clinical data models the federation understands, with their FHIR profiles and worked examples.',
  },
  {
    id: 'format-grid',
    route: '/data-formats',
    selector: '[data-tour="format-grid"]',
    title: 'Standards & profiles',
    description:
      'Each format links to its StructureDefinition profiles and a worked example bundle — a useful reference when preparing a dataset for onboarding.',
  },
  {
    id: 'sidebar-requests',
    route: '/profile/requests',
    selector: '[data-tour="sidebar-requests"]',
    title: 'Access Requests',
    description: 'Track requests you have made, and decide on requests waiting for anything you own.',
  },
  {
    id: 'access-requests-page',
    route: '/profile/requests',
    selector: '[data-tour="access-requests-page"]',
    title: 'Requesting access',
    description:
      "On any private dataset, service, or node you can't yet see, a Request Access button appears on its detail page. Approving a node request also grants every dataset and service hosted under it.",
  },
];

/**
 * Drives the app-wide guided walkthrough (see `ProductTourOverlay`, mounted once
 * at app root like `ConfirmDialogService`/`ConfirmDialogHost`). Steps can each
 * name a route to navigate to before the overlay locates and spotlights their
 * target element, so a single tour can walk across multiple feature areas.
 */
@Injectable({ providedIn: 'root' })
export class ProductTourService {
  private readonly router = inject(Router);

  readonly steps = TOUR_STEPS;
  readonly total = this.steps.length;

  private readonly activeSignal = signal(false);
  private readonly indexSignal = signal(0);

  readonly active = this.activeSignal.asReadonly();
  readonly index = this.indexSignal.asReadonly();
  readonly currentStep = computed<TourStep | null>(() => (this.activeSignal() ? this.steps[this.indexSignal()] : null));
  readonly isFirst = computed(() => this.indexSignal() === 0);
  readonly isLast = computed(() => this.indexSignal() === this.steps.length - 1);

  start(): void {
    this.indexSignal.set(0);
    this.activeSignal.set(true);
    this.navigateToCurrentStep();
  }

  next(): void {
    if (this.isLast()) {
      this.end();
      return;
    }
    this.indexSignal.update((i) => i + 1);
    this.navigateToCurrentStep();
  }

  prev(): void {
    if (this.isFirst()) return;
    this.indexSignal.update((i) => i - 1);
    this.navigateToCurrentStep();
  }

  end(): void {
    this.activeSignal.set(false);
  }

  private navigateToCurrentStep(): void {
    const route = this.steps[this.indexSignal()].route;
    const currentPath = this.router.url.split('?')[0];
    if (route && currentPath !== route) {
      this.router.navigateByUrl(route);
    }
  }
}
