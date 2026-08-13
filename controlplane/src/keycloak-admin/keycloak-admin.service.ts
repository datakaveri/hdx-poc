import { Injectable, Logger } from '@nestjs/common';

/**
 * Talks to Keycloak's admin REST API using the same master-realm admin
 * credentials `keycloak/setup/setup.py` already bootstraps with (the
 * `admin`/`admin` grant, same `grant_type=password&client_id=admin-cli`
 * trick) — a pragmatic PoC choice over standing up a dedicated confidential
 * service-account client with granular realm-management roles.
 */
@Injectable()
export class KeycloakAdminService {
  private readonly logger = new Logger(KeycloakAdminService.name);
  private readonly kcUrl = process.env.KC_ADMIN_URL ?? 'http://localhost:8080';
  private readonly kcUser = process.env.KC_ADMIN_USER ?? 'admin';
  private readonly kcPassword = process.env.KC_ADMIN_PASSWORD ?? 'admin';
  private readonly realm = process.env.KC_REALM ?? 'hdx';

  private async getAdminToken(): Promise<string> {
    const res = await fetch(`${this.kcUrl}/realms/master/protocol/openid-connect/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=password&client_id=admin-cli&username=${this.kcUser}&password=${this.kcPassword}`,
    });
    if (!res.ok) throw new Error(`Keycloak admin auth failed: ${res.status}`);
    const body = (await res.json()) as { access_token: string };
    return body.access_token;
  }

  private async adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const token = await this.getAdminToken();
    const res = await fetch(`${this.kcUrl}/admin/realms/${this.realm}${path}`, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Keycloak admin API ${init.method ?? 'GET'} ${path} -> ${res.status}: ${body}`);
    }
    return res;
  }

  /** Assigns a realm role to a user by id — used to upgrade a node's owner to node_owner. */
  async assignRole(userId: string, roleName: string): Promise<void> {
    const roleRes = await this.adminFetch(`/roles/${roleName}`);
    const role = await roleRes.json();
    await this.adminFetch(`/users/${userId}/role-mappings/realm`, {
      method: 'POST',
      body: JSON.stringify([role]),
    });
    this.logger.log(`Assigned role "${roleName}" to user ${userId}`);
  }

  /** Sets the node_id user attribute, surfaced as a token claim by the hdx-ui client's protocol mapper. */
  async setNodeIdAttribute(userId: string, nodeId: string): Promise<void> {
    const userRes = await this.adminFetch(`/users/${userId}`);
    const user = (await userRes.json()) as { attributes?: Record<string, string[]> };
    await this.adminFetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...user, attributes: { ...user.attributes, node_id: [nodeId] } }),
    });
    this.logger.log(`Set node_id=${nodeId} on user ${userId}`);
  }

  /** The Keycloak id (JWT `sub`) for a username — used to attribute unowned seed data to hdx.admin. */
  async findUserIdByUsername(username: string): Promise<string | undefined> {
    const res = await this.adminFetch(`/users?username=${encodeURIComponent(username)}&exact=true`);
    const users = (await res.json()) as { id: string }[];
    return users[0]?.id;
  }
}
