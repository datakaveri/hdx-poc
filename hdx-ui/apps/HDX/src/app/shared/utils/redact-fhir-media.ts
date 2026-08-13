interface BundleEntry {
  resource?: {
    resourceType?: string;
    content?: { data?: string };
    name?: unknown;
    identifier?: { value?: string }[];
  };
}

/** The embedded fundus photo is shown separately as a decoded <img> — redact it out of printed Bundle JSON so the pane isn't dominated by a multi-hundred-KB base64 blob. */
export function redactMediaData(bundle: Record<string, unknown>): Record<string, unknown> {
  const clone = structuredClone(bundle);
  const entries = clone['entry'] as BundleEntry[] | undefined;
  for (const entry of entries ?? []) {
    const data = entry.resource?.content?.data;
    if (entry.resource?.resourceType === 'Media' && typeof data === 'string') {
      entry.resource.content!.data = `<base64 image data, ${data.length} chars — see photo above>`;
    }
  }
  return clone;
}

/** The demo presents results as de-identified — strip Patient.name and mask MRN identifiers out of printed Bundle JSON so no direct identifiers surface in the UI. */
export function redactPatientIdentity(bundle: Record<string, unknown>): Record<string, unknown> {
  const clone = structuredClone(bundle);
  const entries = clone['entry'] as BundleEntry[] | undefined;
  for (const entry of entries ?? []) {
    const resource = entry.resource;
    if (resource?.resourceType !== 'Patient') continue;
    if (resource.name !== undefined) {
      resource.name = [{ text: '<withheld — de-identified>' }];
    }
    for (const identifier of resource.identifier ?? []) {
      if (typeof identifier.value === 'string') {
        identifier.value = '<withheld — de-identified>';
      }
    }
  }
  return clone;
}
