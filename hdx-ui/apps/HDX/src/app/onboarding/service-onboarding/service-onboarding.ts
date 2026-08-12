import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WizardStepper } from '../../shared/components/wizard-stepper/wizard-stepper';
import { DropdownOption, DropdownSelect } from '../../shared/components/dropdown-select/dropdown-select';
import { MockDataService } from '../../shared/services/mock-data.service';
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

/** Submits to Controlplane (see /controlplane at the repo root). */
@Component({
  selector: 'app-service-onboarding',
  standalone: true,
  imports: [FormsModule, RouterLink, WizardStepper, DropdownSelect, SpecUpload, SpecDiagramViewer],
  templateUrl: './service-onboarding.html',
  styleUrl: './service-onboarding.scss',
})
export class ServiceOnboarding {
  private readonly mockData = inject(MockDataService);

  readonly steps = ['Basic Info', 'Hosting & Datasets', 'Review'];
  readonly categoryOptions = CATEGORY_OPTIONS;

  readonly hostOptions: DropdownOption[] = [
    { label: 'Platform-wide (network-level service)', value: 'platform' },
    ...this.mockData.getNodes().map((n) => ({ label: n.name, value: n.id })),
  ];

  readonly datasetChoices = this.mockData.getDatasets().map((d) => ({ id: d.id, title: d.title }));

  readonly currentStep = signal(0);
  readonly submitted = signal(false);
  readonly showErrors = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly createdServiceId = signal<string | null>(null);
  readonly parsedSpec = signal<ParsedOpenApiSpec | null>(null);
  readonly specSaveError = signal<string | null>(null);

  readonly name = signal('');
  readonly description = signal('');
  readonly category = signal('');
  readonly hostId = signal('');
  readonly operatesOn = signal<string[]>([]);
  readonly visibility = signal<Visibility>('public');

  readonly categoryLabel = computed(() => this.categoryOptions.find((o) => o.value === this.category())?.label ?? '—');
  readonly hostLabel = computed(() => this.hostOptions.find((o) => o.value === this.hostId())?.label ?? '—');
  readonly operatesOnTitles = computed(() =>
    this.operatesOn().map((id) => this.datasetChoices.find((d) => d.id === id)?.title ?? id),
  );

  private readonly step0Valid = computed(() => !!this.name().trim() && !!this.description().trim() && !!this.category());
  private readonly step1Valid = computed(() => !!this.hostId());

  readonly canGoNext = computed(() => {
    if (this.currentStep() === 0) return this.step0Valid();
    if (this.currentStep() === 1) return this.step1Valid();
    return true;
  });

  toggleDataset(id: string): void {
    this.operatesOn.update((cur) => (cur.includes(id) ? cur.filter((d) => d !== id) : [...cur, id]));
  }

  setVisibility(visibility: Visibility): void {
    this.visibility.set(visibility);
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
    this.submitting.set(true);
    this.submitError.set(null);
    try {
      const created = await this.mockData.createService({
        id: crypto.randomUUID(),
        nodeId: this.hostId(),
        name: this.name().trim(),
        category: this.category() as ServiceCategory,
        description: this.description().trim(),
        operatesOn: this.operatesOn(),
        visibility: this.visibility(),
      });
      this.createdServiceId.set(created.id);
      this.submitted.set(true);
    } catch {
      this.submitError.set('Could not reach the controlplane API — make sure the backend stack is running.');
    } finally {
      this.submitting.set(false);
    }
  }

  async onSpecParsed(event: SpecParsedEvent): Promise<void> {
    this.specSaveError.set(null);
    const id = this.createdServiceId();
    if (!id) return;
    try {
      await this.mockData.updateService(id, { openApiSpec: event.raw });
      this.parsedSpec.set(event.parsed);
    } catch {
      this.specSaveError.set('Parsed the spec, but could not save it against the service record.');
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
    this.hostId.set('');
    this.operatesOn.set([]);
    this.visibility.set('public');
    this.createdServiceId.set(null);
    this.parsedSpec.set(null);
    this.specSaveError.set(null);
  }
}
