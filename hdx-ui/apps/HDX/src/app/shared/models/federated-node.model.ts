export type NodeArchetype = 'greenfield' | 'brownfield';
export type NodeStatus = 'online' | 'degraded' | 'offline';
export type ApprovalStatus = 'pending' | 'approved';

export interface FederatedNode {
  id: string;
  name: string;
  institution: string;
  location: string;
  archetype: NodeArchetype;
  status: NodeStatus;
  description: string;
  /** e.g. "HDX Data Adaptor" for brownfield nodes wrapping an existing warehouse */
  onboardedVia: string;
  /** Keycloak user id (`sub`) of the requester — set server-side, not client-supplied. */
  ownerId?: string;
  /** Server-controlled: 'pending' until a platform admin approves the request. */
  approvalStatus?: ApprovalStatus;
}
