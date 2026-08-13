#!/usr/bin/env python3
"""
HDX Keycloak bootstrap for Keycloak 26.7+ (stdlib only, runs in python:3.12-alpine).

Same bootstrap pattern as braid-cohort-management-portal/setup/setup.py, trimmed
down to what HDX needs at this stage (no Organizations/orgs, no IdP brokering):

Creates:
  realm   hdx           - loginTheme "hdx" (see ../theme/hdx), self-registration enabled
    - realm role  hdx_admin      platform admin (carried in the standard realm_access.roles claim)
    - realm role  consumer       default role, auto-granted to every new/self-registered user
    - realm role  node_owner     granted by Controlplane once an admin approves a node request
    - client      hdx-ui         public SPA (Angular, PKCE S256) for hdx-ui/
      - protocol mapper node_id  exposes the node_owner's node_id user attribute as a token claim,
                                  so Controlplane can authorize per-node writes off the JWT alone
    - user        hdx.admin      demo login, has hdx_admin role

Safe to re-run (409 Conflict is treated as 'already exists'). User/credential creation
is explicitly idempotent via ensure_user(): it looks the user up first and only creates
the dummy password credential if the user (or its credential) doesn't already exist, so
a password changed by hand won't get silently reset on the next run.

Keycloak's `start-dev` embedded H2 database is backed by the `keycloak-data` named
volume (see ../../docker-compose.yml), so the realm this script creates — and every
user, role mapping, and node_id attribute in it — survives a plain `docker compose
down` + `up` (only `down -v` wipes it, same as `es-data`/`minio-data`). This script's
idempotency is what makes that safe: every `kc-setup` run after the first one hits an
already-populated realm and is expected to no-op straight through.

This also means hdx.admin's Keycloak user id (the JWT `sub` claim) is now stable
across restarts rather than being re-randomized on every fresh boot — Controlplane's
seed-ownership backfill (attributing the bundled demo nodes/datasets/services to
hdx.admin) depends on that id not drifting, or every restart would orphan the
previous run's ownerId references.
"""
import json, os, sys, time, urllib.request, urllib.error

KC = os.environ.get("KC_URL", "http://keycloak:8080")
PUB = os.environ.get("KC_PUBLIC_URL", "http://localhost:8081")
APP = os.environ.get("APP_URL", "http://localhost:4300")  # browser-visible Angular origin
ADMIN, ADMIN_PW, DEMO_PW = "admin", "admin", "Demo123!"
REALM = "hdx"
CLIENT_ID = "hdx-ui"
REDIRECT_URIS = [f"{PUB}/*", f"{APP}/*", "http://localhost:4300/*", "http://localhost:4200/*"]


def http(method, url, body=None, ctype="application/json", token=None, ok=(200, 201, 204, 409)):
    data = None
    if body is not None:
        data = body.encode() if isinstance(body, str) else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, method=method)
    if body is not None:
        req.add_header("Content-Type", ctype)
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        if e.code in ok:
            return e.code, raw
        print(f"!! {method} {url} -> {e.code}: {raw[:500]}", flush=True)
        raise


def wait_for_kc():
    for _ in range(120):
        try:
            s, _ = http("GET", f"{KC}/realms/master/.well-known/openid-configuration")
            if s == 200:
                print("Keycloak is up.", flush=True)
                return
        except Exception:
            pass
        time.sleep(2)
    sys.exit("Keycloak did not come up in time")


def get_token():
    body = f"grant_type=password&client_id=admin-cli&username={ADMIN}&password={ADMIN_PW}"
    s, raw = http("POST", f"{KC}/realms/master/protocol/openid-connect/token",
                  body, "application/x-www-form-urlencoded")
    return json.loads(raw)["access_token"]


TOKEN = None
def api(method, path, body=None, ctype="application/json", ok=(200, 201, 204, 409)):
    return http(method, f"{KC}/admin{path}", body, ctype, TOKEN, ok)


def jget(path):
    s, raw = api("GET", path)
    return json.loads(raw) if raw else None


def step(msg):
    print(f"--> {msg}", flush=True)


def ensure_user(username, email, first, last, password, roles=()):
    """Find-or-create a user, and only ever set its password credential if it
    doesn't already have one — reruns won't clobber a hand-changed password."""
    existing = jget(f"/realms/{REALM}/users?username={username}&exact=true")
    if existing:
        uid = existing[0]["id"]
        creds = jget(f"/realms/{REALM}/users/{uid}/credentials") or []
        if not creds:
            step(f"user {username} exists but has no credential — setting dummy password")
            api("PUT", f"/realms/{REALM}/users/{uid}/reset-password",
                {"type": "password", "value": password, "temporary": False})
        return uid

    api("POST", f"/realms/{REALM}/users", {
        "username": username, "email": email, "emailVerified": True,
        "firstName": first, "lastName": last, "enabled": True,
        "credentials": [{"type": "password", "value": password, "temporary": False}],
    })
    uid = jget(f"/realms/{REALM}/users?username={username}&exact=true")[0]["id"]
    if roles:
        role_reps = [jget(f"/realms/{REALM}/roles/{r}") for r in roles]
        api("POST", f"/realms/{REALM}/users/{uid}/role-mappings/realm", role_reps)
    return uid


# --------------------------------------------------------------------------
wait_for_kc()
TOKEN = get_token()

step("realm hdx (loginTheme hdx, self-registration enabled)")
api("POST", "/realms", {
    "realm": REALM, "enabled": True, "displayName": "Health Data Exchange",
    "loginTheme": "hdx", "loginWithEmailAllowed": True,
    "registrationAllowed": True, "registrationEmailAsUsername": False,
    "verifyEmail": False,  # no SMTP configured in this dev stack
    "ssoSessionIdleTimeout": 1800, "accessTokenLifespan": 300,
})
api("PUT", f"/realms/{REALM}", {"realm": REALM, "enabled": True, "loginTheme": "hdx",
                                "registrationAllowed": True})

step("realm role hdx_admin")
api("POST", f"/realms/{REALM}/roles", {"name": "hdx_admin",
                                       "description": "HDX platform administrator"})

step("realm roles consumer, node_owner")
api("POST", f"/realms/{REALM}/roles", {"name": "consumer",
                                       "description": "Default role — can browse public catalogue, request nodes"})
api("POST", f"/realms/{REALM}/roles", {"name": "node_owner",
                                       "description": "Owns an approved federated node (carries a node_id attribute)"})

step("make consumer a realm default role (auto-granted on self-registration)")
default_roles = jget(f"/realms/{REALM}/roles/default-roles-{REALM}")
consumer_role = jget(f"/realms/{REALM}/roles/consumer")
api("POST", f"/realms/{REALM}/roles-by-id/{default_roles['id']}/composites", [consumer_role])

step("dummy demo user hdx.admin (idempotent — see ensure_user)")
ensure_user("hdx.admin", "hdx.admin@hdx.local", "HDX", "Admin", DEMO_PW, roles=["hdx_admin"])

step("client hdx-ui (public SPA, PKCE S256)")
api("POST", f"/realms/{REALM}/clients", {
    "clientId": CLIENT_ID, "protocol": "openid-connect", "publicClient": True,
    "standardFlowEnabled": True, "directAccessGrantsEnabled": False,
    "redirectUris": REDIRECT_URIS,
    "webOrigins": ["+"],
    "attributes": {"pkce.code.challenge.method": "S256"},
})

step("node_id token claim (User Attribute mapper on hdx-ui, for node_owner users)")
client_uuid = jget(f"/realms/{REALM}/clients?clientId={CLIENT_ID}")[0]["id"]
api("POST", f"/realms/{REALM}/clients/{client_uuid}/protocol-mappers/models", {
    "name": "node_id", "protocol": "openid-connect",
    "protocolMapper": "oidc-usermodel-attribute-mapper",
    "config": {
        "user.attribute": "node_id", "claim.name": "node_id",
        "jsonType.label": "String", "id.token.claim": "true",
        "access.token.claim": "true", "userinfo.token.claim": "true",
    },
})

step("declare node_id in the realm's User Profile (Keycloak 24+ drops undeclared attributes silently)")
profile = jget(f"/realms/{REALM}/users/profile")
if not any(a["name"] == "node_id" for a in profile["attributes"]):
    profile["attributes"].append({
        "name": "node_id",
        "displayName": "Owned node id",
        "multivalued": False,
        "permissions": {"view": ["admin", "user"], "edit": ["admin"]},
    })
    api("PUT", f"/realms/{REALM}/users/profile", profile)

print("\n=== HDX Keycloak bootstrap complete ===", flush=True)
print(f"Admin console : {PUB}  (admin / {ADMIN_PW})", flush=True)
print(f"Realm         : {REALM}  (loginTheme: hdx, registrationAllowed: true)", flush=True)
print(f"Client        : {CLIENT_ID}  (public SPA, redirect URIs: {', '.join(REDIRECT_URIS)})", flush=True)
print(f"Demo user     : hdx.admin / {DEMO_PW}  (role: hdx_admin)", flush=True)
print("Roles         : hdx_admin, node_owner, consumer (default on self-registration)", flush=True)
print("Token claim   : node_id (User Attribute mapper on hdx-ui, set on approved node_owner users)", flush=True)
