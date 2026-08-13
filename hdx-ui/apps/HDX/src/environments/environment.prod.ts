/**
 * Production (VM host 65.2.128.179, plain HTTP — no TLS/domain yet).
 * Swapped in for environment.ts via the `prod-vm` build configuration
 * (see apps/HDX/project.json) which docker-compose.prod.yml selects.
 */
export const environment = {
  production: true,
  /** Placeholder for the federated index API once it exists — see HDX_ARCHITECTURE_NOTES.md */
  federatedIndexUrl: '',
  /** Catalogue metadata API — see /controlplane at the repo root. */
  controlplaneUrl: 'http://65.2.128.179:4000',
  /** Dataset sample-file upload/download API — see /fileserver at the repo root. */
  fileserverUrl: 'http://65.2.128.179:4001',
  /** HAPI FHIR server (no auth) — see hapi-fhir in docker-compose.yml at the repo root. */
  fhirUrl: 'http://65.2.128.179:8082/fhir',
  keycloak: {
    url: 'http://65.2.128.179:8081',
    realm: 'hdx',
    clientId: 'hdx-ui',
  },
};
