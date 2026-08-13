import { FhirSample, LegendItem, MasterLayoutConfig } from '../concept-graph/concept-graph.types';

export const mcxdeLegendItems: LegendItem[] = [
  { type: 'disease', label: 'Disease' },
  { type: 'assessment', label: 'Assessment' },
  { type: 'tech', label: 'Monitoring / Tech' },
  { type: 'treatment', label: 'Treatment' },
  { type: 'outcome', label: 'Outcome' },
  { type: 'patient', label: 'Patient' },
  { type: 'context', label: 'Special context' },
  { type: 'external', label: 'External / common' },
];

export const mcxdeHintHtml =
  'Click a colored domain node to open its detailed subgraph. Click the root node in a detailed view—or ' +
  '<strong>Overview</strong>—to collapse back to the initial graph. Drag to pan; use the mouse wheel or buttons to zoom.';

export const mcxdeSvgAriaLabel = 'Interactive diabetes clinical concept graph';

export function mcxdeFhirSubtitle(sample: FhirSample): string {
  return (
    'Illustrative <strong>mCODE-inspired</strong> FHIR R4 prototype — not an official HL7/mCODE diabetes artifact. ' +
    `Base resource: <a href="${sample.baseUrl}" target="_blank" rel="noopener noreferrer">${sample.resource}</a>. ` +
    'Design references: <a href="https://build.fhir.org/ig/HL7/fhir-mCODE-ig/StructureDefinition-mcode-primary-cancer-condition.html" ' +
    'target="_blank" rel="noopener noreferrer">mCODE Primary Cancer Condition</a> and ' +
    '<a href="https://build.fhir.org/ig/HL7/fhir-mCODE-ig/StructureDefinition-mcode-tumor-size.html" ' +
    'target="_blank" rel="noopener noreferrer">mCODE Tumor Size</a>.'
  );
}

// Poster-style overview: each domain gets its own generous zone around the
// central patient (see DiabeticGlaucoma/mCxDE_diabetes_v11.html renderMaster).
export const mcxdeMasterLayout: MasterLayoutConfig = {
  layoutWidth: 3650,
  layoutHeight: 3050,
  cx: 1675,
  cy: 1060,
  zones: {
    disease: { catX: 900, catY: 820, gridX: 190, gridY: 180, cols: 3, gapX: 260, gapY: 118 },
    assessment: { catX: 2190, catY: 830, gridX: 2300, gridY: 170, cols: 3, gapX: 250, gapY: 108 },
    external: { catX: 1675, catY: 260, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    context: { catX: 660, catY: 1320, gridX: 200, gridY: 1460, cols: 2, gapX: 295, gapY: 130 },
    tech: { catX: 1280, catY: 1480, gridX: 1100, gridY: 1625, cols: 3, gapX: 260, gapY: 125 },
    outcome: { catX: 2290, catY: 1480, gridX: 2080, gridY: 1625, cols: 3, gapX: 290, gapY: 118 },
    treatment: { catX: 3220, catY: 1360, gridX: 3100, gridY: 1510, cols: 2, gapX: 260, gapY: 120 },

    // These eight nodes remain direct conceptual children of Diabetes Patient.
    // They are placed together only for visual grouping in the overview.
    identity: { catX: 740, catY: 2320, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    history: { catX: 1365, catY: 2320, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    overall: { catX: 1990, catY: 2320, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    risk: { catX: 2615, catY: 2320, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    support: { catX: 740, catY: 2570, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    sdoh: { catX: 1365, catY: 2570, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    preferences: { catX: 1990, catY: 2570, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
    continuing: { catX: 2615, catY: 2570, gridX: 0, gridY: 0, cols: 1, gapX: 0, gapY: 0 },
  },
  patientGroupIds: ['identity', 'history', 'overall', 'risk', 'support', 'sdoh', 'preferences', 'continuing'],
};
