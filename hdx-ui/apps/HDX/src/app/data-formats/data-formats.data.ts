export interface DataFormat {
  id: string;
  name: string;
  fullName: string;
  description: string;
  resourceCount: number;
  standards: string[];
}

export const dataFormats: DataFormat[] = [
  {
    id: 'mcxde',
    name: 'mCXDE',
    fullName: 'Diabetes Common Clinical Model (mC(Dia)DE v11)',
    description:
      'An mCODE-inspired FHIR R4 clinical model for diabetes: disease, assessment, monitoring & technology, treatment, ' +
      'outcomes, special clinical contexts, and patient-level context (identity, history, risk, support, preferences) — ' +
      'expressed as StructureDefinition profiles with worked example Bundles across 53 concepts.',
    resourceCount: 53,
    standards: ['FHIR R4', 'SNOMED CT', 'LOINC', 'DICOM'],
  },
  {
    id: 'mcode',
    name: 'mCODE',
    fullName: 'mCODE STU4 Oncology Model',
    description:
      'HL7 mCODE STU4 content in the established clinical graph view: disease staging, assessment, genomics, ' +
      'treatment, and outcome, grouped around the Cancer Patient. This dataset is illustrative of the concept model ' +
      'only — no worked FHIR StructureDefinition/Bundle examples are attached.',
    resourceCount: 0,
    standards: ['FHIR R4', 'HL7 mCODE STU4'],
  },
];
