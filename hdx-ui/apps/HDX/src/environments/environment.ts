export const environment = {
  production: false,
  /** Placeholder for the federated index API once it exists — see HDX_ARCHITECTURE_NOTES.md */
  federatedIndexUrl: '',
  /** Catalogue metadata API — see /controlplane at the repo root. */
  controlplaneUrl: 'http://localhost:4000',
  /** Dataset sample-file upload/download API — see /fileserver at the repo root. */
  fileserverUrl: 'http://localhost:4001',
  /** HAPI FHIR server (no auth) — see hapi-fhir in docker-compose.yml at the repo root. */
  fhirUrl: 'http://localhost:8082/fhir',
  keycloak: {
    url: 'http://localhost:8081',
    realm: 'hdx',
    clientId: 'hdx-ui',
  },
};
