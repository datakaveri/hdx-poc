interface BundleEntry {
  resource?: { resourceType?: string; content?: { data?: string } };
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
