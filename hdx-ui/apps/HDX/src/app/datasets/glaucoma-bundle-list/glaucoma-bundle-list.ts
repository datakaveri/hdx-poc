import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FhirService } from '../../shared/services/fhir.service';
import { GLAUCOMA_PATIENTS, glaucomaResourceIds } from '../../shared/data/glaucoma-patients.data';
import { redactMediaData, redactPatientIdentity } from '../../shared/utils/redact-fhir-media';

interface MediaResource {
  content?: { contentType?: string; data?: string };
}

interface ExpandedDetail {
  bundleJson: string;
  imageDataUrl: string | null;
  loading: boolean;
  error: string | null;
}

/** Browses the 110 Diabetic Glaucoma patient bundles pushed to the FHIR server by fhir/upload.sh. */
@Component({
  selector: 'app-glaucoma-bundle-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './glaucoma-bundle-list.html',
  styleUrl: './glaucoma-bundle-list.scss',
})
export class GlaucomaBundleList {
  private readonly fhir = inject(FhirService);

  readonly patients = GLAUCOMA_PATIENTS;
  readonly filterText = signal('');
  readonly expandedId = signal<string | null>(null);
  private readonly details = signal<Record<string, ExpandedDetail>>({});

  readonly filteredPatients = computed(() => {
    const q = this.filterText().trim().toLowerCase();
    if (!q) return this.patients;
    return this.patients.filter((p) => `pt-${p.id}`.toLowerCase().includes(q) || p.labelText.toLowerCase().includes(q));
  });

  detailFor(id: string): ExpandedDetail | undefined {
    return this.details()[id];
  }

  async toggleExpand(id: string): Promise<void> {
    if (this.expandedId() === id) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(id);
    if (this.details()[id]) return;

    this.details.update((d) => ({ ...d, [id]: { bundleJson: '', imageDataUrl: null, loading: true, error: null } }));
    const { bundleId, mediaId } = glaucomaResourceIds(id);
    try {
      const [bundle, media] = await Promise.all([
        this.fhir.getResource<Record<string, unknown>>('Bundle', bundleId),
        this.fhir.getResource<MediaResource>('Media', mediaId),
      ]);
      const imageDataUrl =
        media.content?.data && media.content?.contentType ? `data:${media.content.contentType};base64,${media.content.data}` : null;
      this.details.update((d) => ({
        ...d,
        [id]: {
          bundleJson: JSON.stringify(redactPatientIdentity(redactMediaData(bundle)), null, 2),
          imageDataUrl,
          loading: false,
          error: null,
        },
      }));
    } catch {
      this.details.update((d) => ({
        ...d,
        [id]: { bundleJson: '', imageDataUrl: null, loading: false, error: 'Could not load this bundle from the FHIR server.' },
      }));
    }
  }
}
