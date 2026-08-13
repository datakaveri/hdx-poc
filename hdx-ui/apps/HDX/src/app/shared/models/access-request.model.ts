export type AccessResourceType = 'node' | 'dataset' | 'service';
export type AccessRequestStatus = 'pending' | 'approved' | 'rejected';

export interface AccessRequest {
  id: string;
  requesterId: string;
  resourceType: AccessResourceType;
  resourceId: string;
  status: AccessRequestStatus;
  createdAt: string;
  decidedAt?: string;
  decidedBy?: string;
}
