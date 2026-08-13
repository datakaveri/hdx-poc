import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WizardStepper } from '../../shared/components/wizard-stepper/wizard-stepper';
import { DropdownOption, DropdownSelect } from '../../shared/components/dropdown-select/dropdown-select';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AuthService } from '../../shared/services/auth.service';
import { ServiceCategory, Visibility } from '../../shared/models';
import { ParsedOpenApiSpec } from './spec-diagram/openapi-parser';
import { SpecDiagramViewer } from './spec-diagram/spec-diagram-viewer/spec-diagram-viewer';
import { SpecParsedEvent, SpecUpload } from './spec-diagram/spec-upload/spec-upload';

const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: 'TEE / Secure Enclave', value: 'tee-enclave' },
  { label: 'MLOps as a Service', value: 'mlops' },
  { label: 'Federated Query Aggregation', value: 'federated-query' },
  { label: 'Federated Learning + DEPA', value: 'federated-learning' },
  { label: 'No-Code Editor', value: 'no-code-editor' },
  { label: 'Jupyter Sandbox', value: 'jupyter-sandbox' },
];

/**
 * Submits to Controlplane (see /controlplane at the repo root). Only reachable by an approved
 * node_owner — no host picker, the service is always published under the signed-in user's own
 * node (platform-wide services stay admin-only, via Swagger, matching Controlplane's own gate).
 * The API spec is parsed client-side and attached in the same create call — not a separate
 * post-submission upload — so it has to be collected before Review, not after.
 */
@Component({
  selector: 'app-service-onboarding',
  standalone: true,
  imports: [FormsModule, RouterLink, WizardStepper, DropdownSelect, SpecUpload, SpecDiagramViewer],
  templateUrl: './service-onboarding.html',
  styleUrl: './service-onboarding.scss',
})
export class ServiceOnboarding {
  private readonly mockData = inject(MockDataService);
  readonly auth = inject(AuthService);

  readonly steps = ['Basic Info', 'Datasets', 'API Spec', 'Review'];
  readonly categoryOptions = CATEGORY_OPTIONS;

  readonly myNodeName = computed(() => this.mockData.getNode(this.auth.nodeId() ?? '')?.name ?? '—');
  readonly datasetChoices = computed(() =>
    this.mockData
      .getDatasets()
      .filter((d) => d.nodeId === this.auth.nodeId())
      .map((d) => ({ id: d.id, title: d.title })),
  );

  readonly currentStep = signal(0);
  readonly submitted = signal(false);
  readonly showErrors = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly rawSpec = signal<string | null>(null);
  readonly parsedSpec = signal<ParsedOpenApiSpec | null>(null);
  readonly specError = signal<string | null>(null);

  readonly name = signal('');
  readonly description = signal('');
  readonly category = signal('');
  readonly operatesOn = signal<string[]>([]);
  readonly visibility = signal<Visibility>('public');

  readonly categoryLabel = computed(() => this.categoryOptions.find((o) => o.value === this.category())?.label ?? '—');
  readonly operatesOnTitles = computed(() =>
    this.operatesOn().map((id) => this.datasetChoices().find((d) => d.id === id)?.title ?? id),
  );

  private readonly step0Valid = computed(() => !!this.name().trim() && !!this.description().trim() && !!this.category());

  readonly canGoNext = computed(() => {
    if (this.currentStep() === 0) return this.step0Valid();
    return true;
  });

  toggleDataset(id: string): void {
    this.operatesOn.update((cur) => (cur.includes(id) ? cur.filter((d) => d !== id) : [...cur, id]));
  }

  setVisibility(visibility: Visibility): void {
    this.visibility.set(visibility);
  }

  onSpecParsed(event: SpecParsedEvent): void {
    this.rawSpec.set(event.raw);
    this.parsedSpec.set(event.parsed);
    this.specError.set(null);
  }

  next(): void {
    if (!this.canGoNext()) {
      this.showErrors.set(true);
      return;
    }
    this.showErrors.set(false);
    this.currentStep.update((s) => s + 1);
  }

  back(): void {
    this.currentStep.update((s) => Math.max(0, s - 1));
  }

  goToStep(index: number): void {
    this.currentStep.set(index);
  }

  async submit(): Promise<void> {
    const nodeId = this.auth.nodeId();
    if (!nodeId) return;
    this.submitting.set(true);
    this.submitError.set(null);
    try {
      await this.mockData.createService({
        id: crypto.randomUUID(),
        nodeId,
        name: this.name().trim(),
        category: this.category() as ServiceCategory,
        description: this.description().trim(),
        operatesOn: this.operatesOn(),
        visibility: this.visibility(),
        openApiSpec: this.rawSpec() ?? undefined,
      });
      this.submitted.set(true);
    } catch {
      this.submitError.set('Could not reach the controlplane API — make sure the backend stack is running.');
    } finally {
      this.submitting.set(false);
    }
  }

  addAnother(): void {
    this.submitted.set(false);
    this.showErrors.set(false);
    this.submitError.set(null);
    this.currentStep.set(0);
    this.name.set('');
    this.description.set('');
    this.category.set('');
    this.operatesOn.set([]);
    this.visibility.set('public');
    this.rawSpec.set(null);
    this.parsedSpec.set(null);
    this.specError.set(null);
  }
}
