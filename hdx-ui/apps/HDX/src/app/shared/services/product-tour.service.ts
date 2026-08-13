import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TourChapter, TourStep } from '../models';

const TOUR_CHAPTERS: TourChapter[] = [
  {
    id: 'overview',
    title: 'Chapter 1 · HDX Overview & Federation',
    steps: [
      {
        id: 'ch1-intro',
        title: 'A federated health data exchange',
        description:
          "HDX is not a central data lake. A central Discovery & Governance entity indexes what's available across the network, while every federated node keeps its own data and services and runs its own control plane for access control and audit. Data is discovered centrally, but never leaves its source without consent.",
      },
      {
        id: 'ch1-nodes',
        route: '/nodes',
        selector: '[data-tour="node-grid"]',
        title: 'The federated nodes',
        description:
          'Each card here is an independent institution — its own infrastructure, its own control plane. Only metadata and pointers join the shared federated index; the underlying records stay put.',
      },
      {
        id: 'ch1-node-detail',
        route: '/nodes/node-a',
        selector: '[data-tour="node-hosted-content"]',
        title: 'What a node hosts',
        description: 'Open a node to see exactly what it contributes — the datasets and services it exposes to the rest of the federation.',
      },
    ],
  },
  {
    id: 'consumer',
    title: 'Chapter 2 · Consumer Flows',
    steps: [
      {
        id: 'ch2-datasets',
        route: '/data-plane',
        selector: '[data-tour="dataset-grid"]',
        title: 'Discover datasets',
        description: 'Every dataset from every node appears in one federated catalogue — filter by node or track, and scan standards at a glance.',
      },
      {
        id: 'ch2-dataset-metadata',
        route: '/datasets/ds-diabetic-glaucoma',
        selector: '[data-tour="dataset-access-panel"]',
        title: 'Read the metadata',
        description:
          'Standards, access tier, tags, and record counts are all visible before requesting anything. This dataset follows the mCXDE diabetes profile — worth exploring as a graph next.',
      },
      {
        id: 'ch2-mcxde-controls',
        route: '/data-formats/mcxde',
        selector: '[data-tour="concept-graph-controls"]',
        title: 'The mCXDE standard, as a graph',
        description:
          'Formats like mCXDE are part of the platform, not bolted onto one dataset. Overview returns to the top-level domains; Fit graph and the zoom buttons adjust the view.',
      },
      {
        id: 'ch2-mcxde-legend',
        route: '/data-formats/mcxde',
        selector: '[data-tour="concept-graph-legend"]',
        title: 'Toggle domains on and off',
        description: 'Each chip is a clinical domain in the model. Click one to hide or show it, narrowing a dense graph to what you care about.',
      },
      {
        id: 'ch2-mcxde-canvas',
        route: '/data-formats/mcxde',
        selector: '[data-tour="concept-graph-canvas"]',
        title: 'Drill into a concept',
        description: 'Click a domain node to expand its detail graph, or click a leaf concept to open its FHIR StructureDefinition and a worked example Bundle.',
      },
      {
        id: 'ch2-services',
        route: '/service-plane',
        selector: '[data-tour="service-grid"]',
        title: 'Discover services',
        description: 'Compute and data-processing services are catalogued the same way — filter by category, see which node hosts each one and which datasets it operates on.',
      },
      {
        id: 'ch2-dataset-access',
        route: '/datasets/ds-diabetic-glaucoma',
        selector: '[data-tour="dataset-access-panel"]',
        title: 'Request access, then download',
        description:
          "Non-owners request access here; the resource owner (or an admin) approves it before anything moves. Once granted, a download streams from the source node's Fileserver over an authenticated call — never a public link.",
      },
      {
        id: 'ch2-access-requests',
        route: '/profile/requests',
        selector: '[data-tour="access-requests-page"]',
        title: 'Track consent',
        description: 'Every access request — yours, or ones waiting on something you own — is tracked here. Approving a node grants everything hosted under it automatically.',
      },
      {
        id: 'ch2-service-access',
        route: '/services/svc-glaucoma-detection',
        selector: '[data-tour="service-access-panel"]',
        title: 'Services are gated the same way',
        description:
          "Requesting a service works exactly like requesting a dataset. Once you're consented, invoking it routes your data through the control plane's secure enclave chokepoint — a service only ever sees the specific dataset it's been granted, never a raw path into node-local storage.",
      },
      {
        id: 'ch2-try-service',
        route: '/services/svc-glaucoma-detection',
        selector: '[data-tour="try-service-btn"]',
        title: 'Try this service',
        description: 'Services with a live try-it flow show this button — click it to open the cohort screening demo.',
      },
      {
        id: 'ch2-demo-input',
        route: '/services/svc-glaucoma-detection/demo',
        selector: '[data-tour="demo-dataset-input"]',
        title: 'Route a dataset to the service',
        description:
          "We've pasted a dataset ID from the exchange — ds-diabetic-glaucoma, the Diabetic Glaucoma Screening Cohort — click Load Dataset to route it to the service.",
        autofill: 'ds-diabetic-glaucoma',
      },
      {
        id: 'ch2-demo-run',
        route: '/services/svc-glaucoma-detection/demo',
        selector: '[data-tour="demo-run-btn"]',
        title: 'Execute the service',
        description: 'Once the cohort is loaded, click Run Cohort Analysis to send every patient through the glaucoma screening model.',
      },
      {
        id: 'ch2-demo-results',
        route: '/services/svc-glaucoma-detection/demo',
        selector: '[data-tour="demo-results"]',
        title: 'Walk through the results',
        description:
          'Each row is one patient screened by the model. Click a row to expand its fundus photograph, the classification conclusion, and the raw FHIR input/output bundles exchanged for that patient.',
      },
    ],
  },
  {
    id: 'provider',
    title: 'Chapter 3 · Provider Flows',
    steps: [
      {
        id: 'ch3-onboarding-hub',
        route: '/onboarding',
        selector: '[data-tour="onboarding-grid"]',
        title: 'Bring an institution onto the exchange',
        description: 'A node, a dataset, or a service — every provider flow starts from one of these three wizards.',
      },
      {
        id: 'ch3-node-wizard',
        route: '/onboarding/node',
        selector: '[data-tour="node-wizard-stepper"]',
        title: 'Onboard a federated node',
        description:
          'An institution — say, ICMR — registers here to join the federation. The request stays pending until an HDX admin approves it; approval grants the requester the node_owner role and a control-plane identity scoped to their own node.',
      },
      {
        id: 'ch3-dataset-card',
        route: '/onboarding',
        selector: '[data-tour="onboard-dataset-card"]',
        title: 'Onboard a dataset',
        description:
          "Once approved as a node owner, publish a dataset under your node — basic info, standards and access tier, an optional sample file. It becomes discoverable in the Data Plane as soon as it's published.",
      },
      {
        id: 'ch3-service-card',
        route: '/onboarding',
        selector: '[data-tour="onboard-service-card"]',
        title: 'Onboard a service',
        description:
          'Register a compute or data-processing service against your node — which datasets it operates on, and an OpenAPI spec. It becomes discoverable and requestable in the Service Plane, just like Glaucoma Detection.',
      },
    ],
  },
];

/**
 * Drives the app-wide guided walkthrough (see `ProductTourOverlay`, mounted once
 * at app root like `ConfirmDialogService`/`ConfirmDialogHost`). Steps are grouped
 * into chapters purely for the checklist UI and progress display — internally
 * they're still one flat, index-addressable sequence so `next()`/`prev()` can
 * cross chapter boundaries seamlessly. `goTo()` lets the checklist jump straight
 * to any step regardless of chapter or current position.
 */
@Injectable({ providedIn: 'root' })
export class ProductTourService {
  private readonly router = inject(Router);

  readonly chapters = TOUR_CHAPTERS;
  readonly steps: TourStep[] = TOUR_CHAPTERS.flatMap((c) => c.steps);
  readonly total = this.steps.length;

  private readonly activeSignal = signal(false);
  private readonly indexSignal = signal(0);
  private readonly visitedSignal = signal<ReadonlySet<string>>(new Set());

  readonly active = this.activeSignal.asReadonly();
  readonly index = this.indexSignal.asReadonly();
  readonly visited = this.visitedSignal.asReadonly();
  readonly currentStep = computed<TourStep | null>(() => (this.activeSignal() ? this.steps[this.indexSignal()] : null));
  readonly currentChapter = computed<TourChapter | null>(() => {
    const step = this.currentStep();
    return step ? (this.chapters.find((c) => c.steps.includes(step)) ?? null) : null;
  });
  readonly chapterPosition = computed<{ index: number; total: number } | null>(() => {
    const step = this.currentStep();
    const chapter = this.currentChapter();
    return step && chapter ? { index: chapter.steps.indexOf(step) + 1, total: chapter.steps.length } : null;
  });
  readonly isFirst = computed(() => this.indexSignal() === 0);
  readonly isLast = computed(() => this.indexSignal() === this.steps.length - 1);

  start(): void {
    this.activeSignal.set(true);
    this.setIndex(0);
  }

  next(): void {
    if (this.isLast()) {
      this.end();
      return;
    }
    this.setIndex(this.indexSignal() + 1);
  }

  prev(): void {
    if (this.isFirst()) return;
    this.setIndex(this.indexSignal() - 1);
  }

  /** Jump directly to any step by id — what makes the checklist a real "pick anything, anytime" tour. */
  goTo(stepId: string): void {
    const idx = this.steps.findIndex((s) => s.id === stepId);
    if (idx === -1) return;
    this.activeSignal.set(true);
    this.setIndex(idx);
  }

  end(): void {
    this.activeSignal.set(false);
  }

  private setIndex(index: number): void {
    this.indexSignal.set(index);
    const step = this.steps[index];
    if (!this.visitedSignal().has(step.id)) {
      this.visitedSignal.update((v) => new Set(v).add(step.id));
    }
    const currentPath = this.router.url.split('?')[0];
    if (step.route && currentPath !== step.route) {
      this.router.navigateByUrl(step.route);
    }
  }
}
