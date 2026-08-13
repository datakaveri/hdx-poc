import { FhirSample, LegendItem, MasterLayoutConfig } from '../concept-graph/concept-graph.types';

export const mcodeLegendItems: LegendItem[] = [
  { type: 'disease', label: 'Disease' },
  { type: 'assessment', label: 'Assessment' },
  { type: 'genomics', label: 'Genomics' },
  { type: 'treatment', label: 'Treatment' },
  { type: 'outcome', label: 'Outcome' },
  { type: 'patient', label: 'Patient' },
  { type: 'external', label: 'External profiles' },
];

export const mcodeHintHtml =
  'Click a colored domain node to open the mCODE profiles and elements in that group. Click ' +
  '<strong>Cancer Patient</strong> for the patient-focused view. Use <strong>Overview</strong> to return; drag to pan ' +
  'and use the mouse wheel or buttons to zoom.';

export const mcodeSvgAriaLabel = 'Interactive mCODE STU4 oncology concept graph';

// The source embeds no FHIR samples, so this is never actually invoked, but the
// shared component requires a subtitle renderer regardless of dataset.
export function mcodeFhirSubtitle(sample: FhirSample): string {
  return (
    'FHIR R4 profile/example view. ' +
    `Base resource: <a href="${sample.baseUrl}" target="_blank" rel="noopener noreferrer">${sample.resource}</a>. ` +
    'Design references: <a href="https://build.fhir.org/ig/HL7/fhir-mCODE-ig/StructureDefinition-mcode-primary-cancer-condition.html" ' +
    'target="_blank" rel="noopener noreferrer">mCODE Primary Cancer Condition</a> and ' +
    '<a href="https://build.fhir.org/ig/HL7/fhir-mCODE-ig/StructureDefinition-mcode-tumor-size.html" ' +
    'target="_blank" rel="noopener noreferrer">mCODE Tumor Size</a>.'
  );
}

// Poster-style overview using the established clinical graph view (see
// DiabeticGlaucoma/mCODE_STU4_cancer.html renderMaster). Content is mCODE
// STU4; the domain boxes are pedagogical groupings.
export const mcodeMasterLayout: MasterLayoutConfig = {
  layoutWidth: 3800,
  layoutHeight: 2450,
  cx: 1800,
  cy: 1080,
  zones: {
    external: { catX: 3020, catY: 250, gridX: 2690, gridY: 405, cols: 3, gapX: 245, gapY: 108 },
    disease: { catX: 700, catY: 760, gridX: 150, gridY: 925, cols: 3, gapX: 255, gapY: 108 },
    assessment: { catX: 3020, catY: 830, gridX: 2740, gridY: 985, cols: 2, gapX: 285, gapY: 112 },
    genomics: { catX: 720, catY: 1775, gridX: 380, gridY: 1935, cols: 3, gapX: 285, gapY: 118 },
    outcome: { catX: 1840, catY: 1800, gridX: 1540, gridY: 1960, cols: 3, gapX: 285, gapY: 118 },
    treatment: { catX: 3020, catY: 1660, gridX: 2720, gridY: 1815, cols: 2, gapX: 300, gapY: 116 },
  },
};
