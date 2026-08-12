import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WizardStepper } from '../../shared/components/wizard-stepper/wizard-stepper';
import { FileDropzone } from '../../shared/components/file-dropzone/file-dropzone';
import { DropdownOption, DropdownSelect } from '../../shared/components/dropdown-select/dropdown-select';
import { MockDataService } from '../../shared/services/mock-data.service';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { AccessTier, DataTrack, Visibility } from '../../shared/models';

const TRACK_OPTIONS: DropdownOption[] = [
  { label: 'Clinical', value: 'clinical' },
  { label: 'Genomics', value: 'genomics' },
  { label: 'Imaging', value: 'imaging' },
  { label: 'Public Health', value: 'public-health' },
];

const ACCESS_OPTIONS: DropdownOption[] = [
  { label: 'Open', value: 'open' },
  { label: 'Registered', value: 'registered' },
  { label: 'DAC approval', value: 'dac-approval' },
];

const STANDARD_CHOICES = [
  'FHIR',
  'SNOMED CT',
  'LOINC',
  'ICD',
  'DICOM',
  'DCAT',
  'GA4GH Beacon',
  'FHIR Genomics',
  'MolecularSequence',
  'mCXDE',
  'mCODE',
  'RxNorm',
  'EvidenceVariable',
  'NCIt',
];

/** Submits to Controlplane (see /controlplane at the repo root); a sample file, if attached, is uploaded to Fileserver. */
@Component({
  selector: 'app-dataset-onboarding',
  standalone: true,
  imports: [FormsModule, RouterLink, WizardStepper, DropdownSelect, FileDropzone],
  templateUrl: './dataset-onboarding.html',
  styleUrl: './dataset-onboarding.scss',
})
export class DatasetOnboarding {
  private readonly mockData = inject(MockDataService);
  private readonly fileUpload = inject(FileUploadService);
  private readonly selectedFiles = signal<File[]>([]);

  readonly steps = ['Basic Info', 'Standards & Access', 'Sample File', 'Review'];
  readonly trackOptions = TRACK_OPTIONS;
  readonly accessOptions = ACCESS_OPTIONS;
  readonly standardChoices = STANDARD_CHOICES;

  readonly nodeOptions: DropdownOption[] = this.mockData.getNodes().map((n) => ({ label: n.name, value: n.id }));

  readonly currentStep = signal(0);
  readonly submitted = signal(false);
  readonly showErrors = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly fileSaveError = signal<string | null>(null);

  readonly title = signal('');
  readonly description = signal('');
  readonly nodeId = signal('');
  readonly track = signal('');
  readonly standards = signal<string[]>([]);
  readonly access = signal('');
  readonly tagsInput = signal('');
  readonly recordCount = signal('');
  readonly visibility = signal<Visibility>('public');

  readonly tags = computed(() =>
    this.tagsInput()
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  );

  readonly nodeLabel = computed(() => this.nodeOptions.find((o) => o.value === this.nodeId())?.label ?? '—');
  readonly trackLabel = computed(() => this.trackOptions.find((o) => o.value === this.track())?.label ?? '—');
  readonly accessLabel = computed(() => this.accessOptions.find((o) => o.value === this.access())?.label ?? '—');
  readonly fileCount = computed(() => this.selectedFiles().length);

  onFilesChange(files: File[]): void {
    this.selectedFiles.set(files);
  }

  private readonly step0Valid = computed(
    () => !!this.title().trim() && !!this.description().trim() && !!this.nodeId() && !!this.track(),
  );
  private readonly step1Valid = computed(() => this.standards().length > 0 && !!this.access());

  readonly canGoNext = computed(() => {
    if (this.currentStep() === 0) return this.step0Valid();
    if (this.currentStep() === 1) return this.step1Valid();
    return true;
  });

  toggleStandard(standard: string): void {
    this.standards.update((cur) => (cur.includes(standard) ? cur.filter((s) => s !== standard) : [...cur, standard]));
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
    this.fileSaveError.set(null);
    try {
      const created = await this.mockData.createDataset({
        id: crypto.randomUUID(),
        nodeId: this.nodeId(),
        title: this.title().trim(),
        description: this.description().trim(),
        track: this.track() as DataTrack,
        recordCount: Number(this.recordCount()) || 0,
        standards: this.standards(),
        access: this.access() as AccessTier,
        tags: this.tags(),
        updatedAt: new Date().toISOString().slice(0, 10),
        visibility: this.visibility(),
      });
      this.submitted.set(true);

      const file = this.selectedFiles()[0];
      if (file) {
        try {
          const sampleFile = await this.fileUpload.uploadDatasetFile(created.id, file);
          await this.mockData.updateDataset(created.id, { sampleFile });
        } catch {
          this.fileSaveError.set('Dataset was created, but the sample file could not be uploaded.');
        }
      }
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
    this.fileSaveError.set(null);
    this.currentStep.set(0);
    this.title.set('');
    this.description.set('');
    this.nodeId.set('');
    this.track.set('');
    this.standards.set([]);
    this.access.set('');
    this.tagsInput.set('');
    this.recordCount.set('');
    this.visibility.set('public');
    this.selectedFiles.set([]);
  }
}
