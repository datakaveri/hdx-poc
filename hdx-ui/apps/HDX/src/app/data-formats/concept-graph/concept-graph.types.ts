// Shared shape for the interactive D3 concept-graph engine, ported from the
// standalone diabetes_mCxDE_v6_fhirImaging.html prototype and generalized so
// the same engine can render other datasets (mCxDE, mCODE, ...).

export type ConceptType =
  | 'patient'
  | 'disease'
  | 'assessment'
  | 'tech'
  | 'genomics'
  | 'treatment'
  | 'outcome'
  | 'context'
  | 'external'
  | 'element'
  | 'value';

export interface ConceptNode {
  id: string;
  name: string;
  type: ConceptType;
  children?: ConceptNode[];
  expandable?: string | null;
  fhirSample?: string | null;
  rootClickable?: boolean;
}

export interface DetailGraph {
  title: string;
  type: ConceptType;
  data: ConceptNode;
  crossLinks: [string, string, string][];
}

export interface FhirSample {
  title: string;
  resource: string;
  baseUrl: string;
  profile: Record<string, unknown>;
  bundle: Record<string, unknown>;
}

export interface MasterZoneConfig {
  catX: number;
  catY: number;
  gridX: number;
  gridY: number;
  cols: number;
  gapX: number;
  gapY: number;
}

export interface MasterLayoutConfig {
  layoutWidth: number;
  layoutHeight: number;
  cx: number;
  cy: number;
  zones: Record<string, MasterZoneConfig>;
  /**
   * Ids that are visually pulled out of the individual zone-rect treatment and
   * grouped into one unlabeled enclosure with a single connector back to the
   * root (mCxDE v11's eight "peer" patient-context branches). Empty/omitted
   * for datasets that don't use this grouping.
   */
  patientGroupIds?: string[];
}

export interface LegendItem {
  type: ConceptType;
  label: string;
}
