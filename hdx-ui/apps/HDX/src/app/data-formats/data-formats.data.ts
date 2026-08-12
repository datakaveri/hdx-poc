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
    fullName: 'Diabetes Common Clinical Model (mCxDE v6)',
    description:
      'An mCODE-inspired FHIR R4 clinical model for diabetes: condition, glycemic assessment, continuous glucose ' +
      'monitoring, management plan, and eye health assessment with DICOM imaging — expressed as StructureDefinition ' +
      'profiles with worked example Bundles.',
    resourceCount: 5,
    standards: ['FHIR R4', 'SNOMED CT', 'LOINC', 'DICOM'],
  },
];
