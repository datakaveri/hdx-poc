# HDX Guided Tour — Narration Script

Companion script for `tour-video/hdx-tour.mp4`, a silent screen-capture of the in-app guided tour (Take a tour → HDX UI). Each entry below corresponds 1:1 to a step in the tour's checklist and to one shot in the video, in order. The on-screen popover in each shot already displays the step's title and a condensed version of this line as a caption — this script is the fuller, spoken version to record a voiceover against.

Suggested pace: ~5 seconds of screen time per step in the silent cut; a read-aloud VO line should comfortably fit that window at a normal speaking pace (trim if a professional VO artist needs it tighter).

---

## Chapter 1 — HDX Overview & Federation

**1. A federated health data exchange**
HDX is not a central data lake. Think of it as a federation: a central Discovery and Governance entity indexes what's available across the network, so anyone can find it — but the data itself never moves there. Every participating institution runs its own federated node, keeping its own data and services, and operating its own control plane for access control and audit. Data is discovered centrally. It only ever leaves its source with consent.

**2. The federated nodes**
Here's that federation in practice. Every card is an independent institution — Node A, Node B, City General Hospital — each with its own infrastructure and its own control plane. Only metadata and pointers join the shared federated index; the underlying records stay exactly where they are.

**3. What a node hosts**
Opening a node shows exactly what it contributes to the network: the datasets and services it exposes. Node A here hosts seven datasets, spanning diabetes, oncology, cardiovascular, and imaging data, plus one compute service — all discoverable, none of it copied anywhere else.

---

## Chapter 2 — Consumer Flows

**4. Discover datasets**
This is the Data Plane — every dataset from every node, in one federated catalogue. A consumer can filter by node or by track, and scan standards and access tiers at a glance without leaving this page.

**5. Read the metadata**
Opening a dataset surfaces its full metadata before anyone requests anything: standards used, access tier, tags, record counts. This one — the Diabetic Glaucoma Screening Cohort — follows the mCXDE diabetes profile, which is worth seeing as more than a label.

**6. The mCXDE standard, as a graph**
Standards like mCXDE aren't bolted onto a single dataset — they're part of the platform. HDX renders the whole profile as an interactive concept graph. Overview returns to the top-level clinical domains; Fit graph and the zoom controls adjust the view.

**7. Toggle domains on and off**
Each chip in the legend is a clinical domain in the model — Disease, Assessment, Treatment, and so on. Clicking one hides or shows it, which is how you narrow a dense graph down to just the part you care about.

**8. Drill into a concept**
Clicking a domain node expands it into its own detail graph. Clicking a leaf concept goes one level deeper — opening its actual FHIR StructureDefinition next to a worked example Bundle, side by side.

**9. Discover services**
Services are catalogued the same way datasets are — by category, by hosting node, and by which datasets each one is registered to operate on. This is the Service Plane.

**10. Request access, then download**
Every dataset carries a consent gate. A non-owner requests access here; the owning institution — or an admin — approves it before anything moves. Once granted, a download streams from the source node's own file server over an authenticated call. There's never a public link handed out.

**11. Track consent**
Every access request, whether it's one you made or one waiting on something you own, is tracked in one place. Approving access to an entire node automatically grants everything hosted under it — no need to approve each dataset one by one.

**12. Services are gated the same way**
Requesting a service works identically to requesting a dataset. Once you're consented, actually invoking the service routes your data through the control plane's secure enclave — the chokepoint every job passes through. The service itself only ever sees the one dataset it's been granted. It never gets a raw path into a node's storage.

**13. Try this service**
Services with a live try-it flow show this button. Glaucoma Detection is one of them — click through to open its cohort screening demo.

**14. Route a dataset to the service**
This is where a consumer routes a specific dataset to the service. We've already pasted a dataset ID from the exchange — ds-diabetic-glaucoma, the same cohort we looked at earlier — so the next step is simply to load it.

**15. Execute the service**
With the cohort loaded, running the service is one click. Every patient in the cohort gets sent through the glaucoma screening model.

**16. Walk through the results**
And here are the results — one row per patient, positive and negative screenings side by side. Clicking any row expands its fundus photograph, the model's stated conclusion, and the raw FHIR input and output bundles that were actually exchanged for that patient. This is the full round trip: a consented dataset, routed through the control plane, processed by a service, and returned as a structured, auditable result.

---

## Chapter 3 — Provider Flows

**17. Bring an institution onto the exchange**
Everything a provider does starts here — one of three wizards: onboard a node, a dataset, or a service.

**18. Onboard a federated node**
This is how an institution — say, ICMR — joins the federation in the first place. They register their basic details here. The request sits pending until an HDX admin reviews and approves it; approval is what grants the institution the node-owner role and a control-plane identity scoped to their own node.

**19. Onboard a dataset**
Once an institution is an approved node owner, publishing a dataset is a short wizard: basic info, the standards and access tier it follows, and an optional sample file. As soon as it's published, it's discoverable in the Data Plane we saw earlier.

**20. Onboard a service**
Onboarding a service follows the same shape — register it against your node, declare which datasets it's permitted to operate on, and attach an OpenAPI spec. From that point on, it's discoverable and requestable in the Service Plane, exactly like the Glaucoma Detection service we just tried.

---

*End of tour.*
