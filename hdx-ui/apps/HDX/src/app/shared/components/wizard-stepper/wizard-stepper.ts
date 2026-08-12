import { Component, input, output } from '@angular/core';

/**
 * Presentational numbered-circle stepper, matching apps/IUDX's
 * onboarding wizard shell (ngsild-home.component) — circle per step,
 * checkmark once passed, connecting line filled in as you progress.
 * Steps before `current` are clickable so users can jump back.
 */
@Component({
  selector: 'app-wizard-stepper',
  standalone: true,
  templateUrl: './wizard-stepper.html',
  styleUrl: './wizard-stepper.scss',
})
export class WizardStepper {
  readonly steps = input.required<string[]>();
  readonly current = input.required<number>();
  readonly stepSelect = output<number>();

  onStepClick(index: number): void {
    if (index < this.current()) this.stepSelect.emit(index);
  }
}
