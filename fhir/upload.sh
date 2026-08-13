#!/usr/bin/env bash
# Uploads mCxDE StructureDefinitions and patient Bundles to a FHIR server.
#
# Usage:
#   ./upload.sh [FHIR_BASE_URL]
#
# Defaults to the local HDX HAPI FHIR server (see ../docker-compose.yml).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FHIR_BASE="${1:-${FHIR_BASE_URL:-http://localhost:8082/fhir}}"

STRUCTURE_DEFINITIONS_DIR="${SCRIPT_DIR}/structure_definitions"
BUNDLE_DIRS=(
  "${SCRIPT_DIR}/patient_bundles"
  "${SCRIPT_DIR}/glaucoma_bundles"
  "${SCRIPT_DIR}/glaucoma_bundles_results"
)

command -v jq >/dev/null 2>&1 || { echo "jq is required but not installed." >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required but not installed." >&2; exit 1; }

put_resource() {
  local file="$1"
  local resource_type resource_id url http_code

  resource_type=$(jq -r '.resourceType' "$file")
  resource_id=$(jq -r '.id' "$file")

  if [[ -z "$resource_type" || "$resource_type" == "null" || -z "$resource_id" || "$resource_id" == "null" ]]; then
    echo "  SKIP  $file (missing resourceType/id)"
    return
  fi

  url="${FHIR_BASE}/${resource_type}/${resource_id}"
  http_code=$(curl -s -o /tmp/fhir_upload_response.json -w '%{http_code}' \
    -X PUT "$url" \
    -H 'Content-Type: application/fhir+json' \
    --data @"$file")

  if [[ "$http_code" =~ ^2 ]]; then
    echo "  OK    ${resource_type}/${resource_id} (HTTP ${http_code})"
  else
    echo "  FAIL  ${resource_type}/${resource_id} (HTTP ${http_code})"
    cat /tmp/fhir_upload_response.json >&2
    echo >&2
    return 1
  fi
}

post_transaction() {
  local file="$1"
  local bundle_id http_code

  bundle_id=$(jq -r '.id' "$file")

  http_code=$(curl -s -o /tmp/fhir_upload_response.json -w '%{http_code}' \
    -X POST "$FHIR_BASE" \
    -H 'Content-Type: application/fhir+json' \
    --data @"$file")

  if [[ "$http_code" =~ ^2 ]]; then
    echo "  OK    transaction ${bundle_id} (HTTP ${http_code})"
  else
    echo "  FAIL  transaction ${bundle_id} (HTTP ${http_code})"
    cat /tmp/fhir_upload_response.json >&2
    echo >&2
    return 1
  fi
}

echo "FHIR base URL: ${FHIR_BASE}"

echo
echo "Uploading StructureDefinitions..."
for file in "${STRUCTURE_DEFINITIONS_DIR}"/*.json; do
  put_resource "$file"
done

upload_bundle_dir() {
  local dir="$1"
  for bundle_file in "${dir}"/*.json; do
    echo " Bundle: $(basename "$bundle_file")"

    # 1. Submit as a transaction so each entry is created/updated as its own
    #    queryable resource (PUT by resourceType/id, applied atomically).
    tmp_txn="$(mktemp)"
    jq '
      .type = "transaction"
      | .entry = [.entry[] | . + {request: {method: "PUT", url: (.resource.resourceType + "/" + .resource.id)}}]
    ' "$bundle_file" > "$tmp_txn"
    post_transaction "$tmp_txn"
    rm -f "$tmp_txn"

    # 2. Also store the original collection Bundle document itself under
    #    Bundle/{id}, so the grouping (which resources belong to this example)
    #    stays queryable on the server too, not just as local JSON.
    put_resource "$bundle_file"
  done
}

echo
echo "Uploading patient bundles..."
for dir in "${BUNDLE_DIRS[@]}"; do
  echo " Directory: $(basename "$dir")"
  upload_bundle_dir "$dir"
done

echo
echo "Done."
