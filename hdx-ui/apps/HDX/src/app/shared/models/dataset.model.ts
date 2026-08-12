export type DataTrack = 'clinical' | 'genomics' | 'imaging' | 'public-health';
export type AccessTier = 'open' | 'registered' | 'dac-approval';
export type Visibility = 'public' | 'private';

export interface DatasetSampleFile {
  key: string;
  filename: string;
  size: number;
  contentType: string;
}

export interface Dataset {
  id: string;
  nodeId: string;
  title: string;
  description: string;
  track: DataTrack;
  recordCount: number;
  standards: string[];
  access: AccessTier;
  tags: string[];
  updatedAt: string;
  /** Set post-submission once a sample/schema file has been uploaded to the Fileserver. */
  sampleFile?: DatasetSampleFile;
  /** Keycloak user id (`sub`) of the creator — set server-side, not client-supplied. */
  ownerId?: string;
  /** Defaults to 'public' server-side when omitted. */
  visibility?: Visibility;
}
