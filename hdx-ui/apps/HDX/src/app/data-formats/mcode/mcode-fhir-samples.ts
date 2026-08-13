// DiabeticGlaucoma/mCODE_STU4_cancer.html embeds no worked FHIR
// StructureDefinition/Bundle examples (its fhirSamples map is empty in the
// source), so there is nothing to attach JSON badges to and nothing to
// extract into fhir/structure_definitions or fhir/patient_bundles for mCODE.

import { FhirSample } from '../concept-graph/concept-graph.types';

export const mcodeFhirSamples: Record<string, FhirSample> = {};
