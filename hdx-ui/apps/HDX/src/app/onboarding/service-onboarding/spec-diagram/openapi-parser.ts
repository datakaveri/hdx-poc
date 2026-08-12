import { load } from 'js-yaml';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

export interface OpenApiOperation {
  tag: string;
  method: string;
  path: string;
  summary: string;
  operationId: string;
}

export interface OpenApiSchema {
  name: string;
  refs: string[];
}

export interface ParsedOpenApiSpec {
  title: string;
  description: string;
  operations: OpenApiOperation[];
  schemas: OpenApiSchema[];
}

/** Accepts YAML or JSON text (YAML is a JSON superset, so `load` handles both) and throws a user-facing Error on anything that isn't a usable OpenAPI/Swagger document. */
export function parseOpenApiSpec(raw: string): ParsedOpenApiSpec {
  let doc: unknown;
  try {
    doc = load(raw);
  } catch (e) {
    throw new Error(`Could not parse the file as YAML or JSON: ${e instanceof Error ? e.message : String(e)}`);
  }

  if (!isRecord(doc)) {
    throw new Error('Not a valid OpenAPI/Swagger document — missing a top-level "paths" object.');
  }
  const paths = doc['paths'];
  if (!isRecord(paths)) {
    throw new Error('Not a valid OpenAPI/Swagger document — missing a top-level "paths" object.');
  }

  const info = isRecord(doc['info']) ? doc['info'] : {};
  const components = isRecord(doc['components']) ? doc['components'] : {};
  const schemaMap = isRecord(components['schemas'])
    ? components['schemas']
    : isRecord(doc['definitions'])
      ? doc['definitions']
      : {};

  return {
    title: typeof info['title'] === 'string' ? info['title'] : 'Untitled API',
    description: typeof info['description'] === 'string' ? info['description'] : '',
    operations: extractOperations(paths),
    schemas: extractSchemas(schemaMap),
  };
}

function extractOperations(paths: Record<string, unknown>): OpenApiOperation[] {
  const operations: OpenApiOperation[] = [];
  for (const [path, pathItem] of Object.entries(paths)) {
    if (!isRecord(pathItem)) continue;
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!isRecord(operation)) continue;
      const tags = Array.isArray(operation['tags']) ? operation['tags'] : [];
      operations.push({
        tag: typeof tags[0] === 'string' ? tags[0] : 'Untagged',
        method: method.toUpperCase(),
        path,
        summary: typeof operation['summary'] === 'string' ? operation['summary'] : '',
        operationId: typeof operation['operationId'] === 'string' ? operation['operationId'] : `${method}-${path}`,
      });
    }
  }
  return operations;
}

function extractSchemas(schemaMap: Record<string, unknown>): OpenApiSchema[] {
  const names = new Set(Object.keys(schemaMap));
  return Object.entries(schemaMap).map(([name, schema]) => {
    const refs = new Set<string>();
    collectRefs(schema, refs);
    refs.delete(name);
    return { name, refs: [...refs].filter((r) => names.has(r)) };
  });
}

function collectRefs(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    node.forEach((item) => collectRefs(item, out));
    return;
  }
  if (!isRecord(node)) return;
  for (const [key, value] of Object.entries(node)) {
    if (key === '$ref' && typeof value === 'string') {
      const name = value.split('/').pop();
      if (name) out.add(name);
      continue;
    }
    collectRefs(value, out);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
