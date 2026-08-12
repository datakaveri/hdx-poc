import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WizardStepper } from '../../shared/components/wizard-stepper/wizard-stepper';
import { DropdownOption, DropdownSelect } from '../../shared/components/dropdown-select/dropdown-select';
import { MockDataService } from '../../shared/services/mock-data.service';
import { NodeArchetype } from '../../shared/models';

const ARCHETYPE_OPTIONS: DropdownOption[] = [
  { label: 'Greenfield — native HDX stack from day one', value: 'greenfield' },
  { label: 'Brownfield — existing system wrapped by an adaptor', value: 'brownfield' },
];

/**
 * Submits to Controlplane (see /controlplane at the repo root) — a real
 * record is written to Elasticsearch, not just a local success screen. See
 * HDX_ARCHITECTURE_NOTES.md — greenfield/brownfield onboarding is exactly
 * the distinction Figure 1 draws between an ICMR-style node and a
 * private-hospital node wrapped by an HDX Data Adaptor.
 */
@Component({
  selector: 'app-node-onboarding',
  standalone: true,
  imports: [FormsModule, RouterLink, WizardStepper, DropdownSelect],
  templateUrl: './node-onboarding.html',
  styleUrl: './node-onboarding.scss',
})
export class NodeOnboarding {
  private readonly mockData = inject(MockDataService);

  readonly steps = ['Basic Info', 'Federation Details', 'Review'];
  readonly archetypeOptions = ARCHETYPE_OPTIONS;

  readonly currentStep = signal(0);
  readonly submitted = signal(false);
  readonly showErrors = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly name = signal('');
  readonly institution = signal('');
  readonly location = signal('');
  readonly description = signal('');
  readonly archetype = signal('');
  readonly onboardedVia = signal('');
  readonly contactEmail = signal('');

  readonly archetypeLabel = computed(() => this.archetypeOptions.find((o) => o.value === this.archetype())?.label ?? '—');

  private readonly step0Valid = computed(
    () => !!this.name().trim() && !!this.institution().trim() && !!this.location().trim() && !!this.description().trim(),
  );
  private readonly step1Valid = computed(() => !!this.archetype() && !!this.onboardedVia().trim());

  readonly canGoNext = computed(() => {
    if (this.currentStep() === 0) return this.step0Valid();
    if (this.currentStep() === 1) return this.step1Valid();
    return true;
  });

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
      await this.mockData.createNode({
        id: crypto.randomUUID(),
        name: this.name().trim(),
        institution: this.institution().trim(),
        location: this.location().trim(),
        archetype: this.archetype() as NodeArchetype,
        status: 'online',
        description: this.description().trim(),
        onboardedVia: this.onboardedVia().trim(),
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
    this.institution.set('');
    this.location.set('');
    this.description.set('');
    this.archetype.set('');
    this.onboardedVia.set('');
    this.contactEmail.set('');
  }
}
