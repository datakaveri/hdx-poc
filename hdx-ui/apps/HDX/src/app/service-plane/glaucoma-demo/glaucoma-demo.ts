import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FhirService } from '../../shared/services/fhir.service';
import { GLAUCOMA_PATIENTS, glaucomaResourceIds } from '../../shared/data/glaucoma-patients.data';
import { redactMediaData, redactPatientIdentity } from '../../shared/utils/redact-fhir-media';

interface MediaResource {
  content?: { contentType?: string; data?: string };
}

interface ObservationResource {
  interpretation?: { coding?: { code?: string; display?: string }[] }[];
}

interface DiagnosticReportResource {
  conclusion?: string;
}

interface PatientDetail {
  loading: boolean;
  error: string | null;
  imageDataUrl: string | null;
  inputBundleJson: string | null;
  outputBundleJson: string | null;
  conclusion: string | null;
}

const RUN_STATUS_MESSAGES = [
  'Decoding fundus images…',
  'Running glaucoma classification model across cohort…',
  'Compiling FHIR DiagnosticReport for each patient…',
  'Aggregating cohort results…',
];

const COHORT_NAME = 'Diabetic Glaucoma Screening Cohort';

type Phase = 'idle' | 'loaded' | 'running' | 'done';

/**
 * POC "try it" flow for the Glaucoma Detection service — no real inference or
 * dataset lookup: pasting any dataset id always resolves to the same demo
 * cohort, and the FHIR Observation/DiagnosticReport results were precomputed
 * and pushed to the FHIR server alongside the input bundles (see
 * fhir/upload.sh). "Running" the service is a timed spinner over a rotating
 * status line, then the already-existing per-patient results are revealed as
 * a table (same shape as DiabeticGlaucoma/patient_labels.csv).
 */
@Component({
  selector: 'app-glaucoma-demo',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './glaucoma-demo.html',
  styleUrl: './glaucoma-demo.scss',
})
export class GlaucomaDemo {
  private readonly fhir = inject(FhirService);

  // Bound from the `:id` route param (the service id) via withComponentInputBinding().
  readonly id = input.required<string>();
  readonly isGlaucomaService = computed(() => this.id() === 'svc-glaucoma-detection');

  readonly patients = GLAUCOMA_PATIENTS;
  readonly positiveCount = this.patients.filter((p) => p.hasGlaucoma).length;

  readonly datasetIdInput = signal('');
  readonly cohortName = signal<string | null>(null);
  readonly phase = signal<Phase>('idle');
  readonly statusMessage = signal('');
  private statusTimer?: ReturnType<typeof setInterval>;
  private cooldownTimer?: ReturnType<typeof setTimeout>;

  readonly filterText = signal('');
  readonly filteredPatients = computed(() => {
    const q = this.filterText().trim().toLowerCase();
    if (!q) return this.patients;
    return this.patients.filter((p) => `pt-${p.id}`.includes(q) || p.labelText.toLowerCase().includes(q));
  });

  readonly expandedId = signal<string | null>(null);
  private readonly details = signal<Record<string, PatientDetail>>({});

  detailFor(id: string): PatientDetail | undefined {
    return this.details()[id];
  }

  loadDataset(): void {
    const trimmed = this.datasetIdInput().trim();
    if (!trimmed) return;
    this.resetRun();
    // PoC: no real dataset lookup — any pasted dataset id resolves to this demo cohort.
    this.cohortName.set(COHORT_NAME);
    this.phase.set('loaded');
  }

  changeDataset(): void {
    this.datasetIdInput.set('');
    this.cohortName.set(null);
    this.resetRun();
    this.phase.set('idle');
  }

  runCohortAnalysis(): void {
    if (this.phase() === 'running') return;
    this.resetRun();
    this.phase.set('running');

    let statusIndex = 0;
    this.statusMessage.set(RUN_STATUS_MESSAGES[0]);
    this.statusTimer = setInterval(() => {
      statusIndex = Math.min(statusIndex + 1, RUN_STATUS_MESSAGES.length - 1);
      this.statusMessage.set(RUN_STATUS_MESSAGES[statusIndex]);
    }, 700);

    const cooldownMs = 2800 + Math.random() * 1400;
    this.cooldownTimer = setTimeout(() => {
      if (this.statusTimer) clearInterval(this.statusTimer);
      this.phase.set('done');
    }, cooldownMs);
  }

  async toggleExpand(id: string): Promise<void> {
    if (this.expandedId() === id) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(id);
    if (this.details()[id]) return;

    this.details.update((d) => ({
      ...d,
      [id]: { loading: true, error: null, imageDataUrl: null, inputBundleJson: null, outputBundleJson: null, conclusion: null },
    }));
    const { bundleId, mediaId, observationId, diagnosticReportId, resultBundleId } = glaucomaResourceIds(id);
    try {
      const [bundle, media, observation, report, outputBundle] = await Promise.all([
        this.fhir.getResource<Record<string, unknown>>('Bundle', bundleId),
        this.fhir.getResource<MediaResource>('Media', mediaId),
        this.fhir.getResource<ObservationResource>('Observation', observationId),
        this.fhir.getResource<DiagnosticReportResource>('DiagnosticReport', diagnosticReportId),
        this.fhir.getResource<Record<string, unknown>>('Bundle', resultBundleId),
      ]);
      const imageDataUrl =
        media.content?.data && media.content?.contentType ? `data:${media.content.contentType};base64,${media.content.data}` : null;
      this.details.update((d) => ({
        ...d,
        [id]: {
          loading: false,
          error: null,
          imageDataUrl,
          inputBundleJson: JSON.stringify(redactPatientIdentity(redactMediaData(bundle)), null, 2),
          outputBundleJson: JSON.stringify(redactPatientIdentity(outputBundle), null, 2),
          conclusion: report.conclusion ?? (observation.interpretation?.[0]?.coding?.[0]?.display ?? null),
        },
      }));
    } catch {
      this.details.update((d) => ({
        ...d,
        [id]: {
          loading: false,
          error: 'Could not load this patient\'s FHIR record.',
          imageDataUrl: null,
          inputBundleJson: null,
          outputBundleJson: null,
          conclusion: null,
        },
      }));
    }
  }

  private resetRun(): void {
    if (this.cooldownTimer) clearTimeout(this.cooldownTimer);
    if (this.statusTimer) clearInterval(this.statusTimer);
    this.statusMessage.set('');
    this.filterText.set('');
    this.expandedId.set(null);
    this.details.set({});
  }
}
