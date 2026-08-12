# HDX Platform — Architecture Working Notes

Context handoff from a Claude.ai design conversation. Use this to pick up work in Claude Code without re-explaining background.

## Source documents
- `PM-HDX_Platform_Deep_Dive.docx` — CDPG's HDX platform spec (data marketplace, service marketplace, provider tooling, governance)
- `ADARV_-_Architecture_diagram-Page-2_drawio.png` — existing ADARV architecture (Catalogue UI, Onboarding Server, Keycloak, Controlplane, Fileserver, ElasticSearch, S3, Entity Mapper, Argo Workflow, FHIR, Postgres)

## Baseline: what ADARV already has
- Single centralized deployment — one Keycloak realm, one ElasticSearch (metadata catalogue), one S3 bucket, one Postgres
- Roles: `consumer`, `provider`, `org_admin`, `cos_admin` (single platform admin)
- Working pipeline: dataset upload → Entity Mapper (SNOMED coding) → Argo Workflow → FHIR bundle → stored in Postgres
- In HDX terms, the whole current ADARV stack = **one node's internals**, not yet federated

## HDX target architecture (from the doc)
Four pillars: **data marketplace** (DCAT/RDF catalogue, FHIR, GA4GH Beacon, mCxDE profiles) · **service marketplace** (TRE/TEE, MLOps-as-a-service, federated query, federated learning + DEPA) · **provider tooling ecosystem** (field capture, agentic ETL, de-identification, brownfield adaptors) · **governance** (DAC approval, DEPA consent, audit, time-bound access).

**Federation** = data stays at the source institution; only metadata/pointers centralize. "Catalogue of catalogues" = each node keeps a local DCAT catalogue; a central index harvests lightweight pointers from all nodes rather than storing datasets itself.

**Greenfield vs brownfield nodes** (from Figure 1 in the doc): greenfield = data captured HDX-native from day one (e.g. ICMR node); brownfield = existing hospital/lab data warehouse wrapped by an **HDX Data Adaptor** to join without re-architecting (e.g. Private Hospital node). Figure 1 shows each adaptor (data and service) with its own `auth`/`audit`/`catalogue` sub-blocks — implies per-adaptor auth scoping, though the doc doesn't specify implementation (no Keycloak/realm detail given — that's an open design choice, not something stated in the source).

## PoC scope — decided
Goal: demonstrate DCAT catalogue compliance **and** real federation across two nodes.

1. **DCAT adaptor** (both nodes) — translation layer in front of ElasticSearch, exports dataset records as DCAT/RDF (JSON-LD recommended to start)
2. **Federated index** — new lightweight service; harvests each node's DCAT adaptor endpoint on a schedule, stores pointers (a Postgres table or another ElasticSearch index is enough), exposes one federated search API
3. **Node A** = existing ADARV stack (reused as-is)
4. **Node B** = new, semi-real second stack — its own ElasticSearch + S3, seeded with sample datasets, fronted by its own DCAT adaptor (real second deployment, e.g. separate MicroK8s namespace — not a stub)
5. **Catalogue UI** — point search at the federated index instead of local ElasticSearch directly; tag results by originating node
6. **Auth** — deferred for PoC: single shared Keycloak across both nodes (not production-representative; isolation is future work)
7. **Out of scope for PoC**: FHIR/SNOMED/Entity Mapper/Argo pipeline stays on Node A only

**Open question before building**: when a user downloads a Node B dataset via the federated index, does the request proxy through Node A's Fileserver, or does Catalogue UI talk to Node B's Fileserver directly? Federation principle favors the latter (owning node issues its own presigned URL) — needs Catalogue UI to know how to reach multiple nodes' Fileservers.

## Data plane — standardisation & anonymisation
New pipeline stages, positioned relative to the existing Entity Mapper/FHIR pipeline:

`Raw upload → Standardise (schema + mCxDE mapping) → Anonymise (de-id, k-anonymity, differential privacy) → Entity Mapper + FHIR (existing) → Catalogue publish (DCAT)`

**Open question, unresolved**: should anonymise run *before* or *after* Entity Mapper?
- Anonymise-first: minimizes PHI exposure across systems, but Entity Mapper's SNOMED coding might need context (exact dates, free text) that gets destroyed too early
- Entity Mapper-first: preserves coding accuracy, but means raw PHI passes through more of the pipeline before de-identification
- **Needs input from whoever owns Entity Mapper's input requirements before locking pipeline order.**

## Service plane
- **No-code editor**: reuse the existing GDI No Code Editor — don't rebuild. Integration = point its execution backend at the TEE job API instead of wherever it currently runs jobs. UI/authoring experience unchanged.
- **Jupyter sandbox**: new — python/R script execution, needs kernel isolation, package management, resource limits
- **TEE enclave**: single chokepoint all consumer jobs route through (no-code, sandbox, hackathon submissions alike) — the only thing that touches node-local data. Hardware-attested; code runs "blind." Flagged as a shared bottleneck to watch under concurrent load (e.g. hackathon spike + regular research traffic at once).

## Use case: hackathons & competitions
`Organiser publishes competition dataset → data plane (standardise+anonymise) → catalogue (competition metadata: deadline, eval split, metric) → participant submits notebook → TEE sandbox → leaderboard (scores only)`

Two open design points:
1. **Evaluation holdout**: need TEE to score against a hidden holdout set the participant's model never sees — not just "run the notebook." Decide if in scope for PoC or v2.
2. **Anti-gaming**: rate-limiting/anti-abuse needed so repeated near-identical submissions can't probe the holdout set via score deltas — an operational concern layered on top of the architecture, not solved by it.

## Governance & auth (cross-cutting)
DAC approval · DEPA consent binding · audit trail · time-bound access — spans data plane, federated catalogue, and service plane. For the PoC, auth is intentionally simplified (shared Keycloak, single realm) — production would likely need per-node or per-adaptor auth scoping, revisit once PoC validates the federation mechanics.

## Suggested next steps (pick up here in Claude Code)
- [ ] Resolve standardise/anonymise vs Entity Mapper ordering
- [ ] Decide Node B download routing (proxy vs direct-to-node)
- [ ] Scope TEE holdout-eval design for hackathon use case
- [ ] Start DCAT adaptor: define the JSON-LD schema mapping from existing ElasticSearch dataset documents
- [ ] Stand up Node B's ElasticSearch + S3 in a separate MicroK8s namespace
- [ ] Build federated index harvester (poll interval, storage, search API contract)
