import { Visibility } from './dataset.model';

export type ServiceCategory =
  | 'tee-enclave'
  | 'mlops'
  | 'federated-query'
  | 'federated-learning'
  | 'no-code-editor'
  | 'jupyter-sandbox';

export interface ServiceOffering {
  id: string;
  /** 'platform' when offered network-wide rather than by a single node */
  nodeId: string | 'platform';
  name: string;
  category: ServiceCategory;
  description: string;
  /** Dataset ids this service is registered to operate against, for demo linkage in the graph explorer */
  operatesOn: string[];
  /** Raw OpenAPI/Swagger spec text (YAML or JSON), attached post-submission from the onboarding success screen */
  openApiSpec?: string;
  /** Keycloak user id (`sub`) of the creator — set server-side, not client-supplied. */
  ownerId?: string;
  /** Defaults to 'public' server-side when omitted. */
  visibility?: Visibility;
}
