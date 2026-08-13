import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { KeycloakAdminService } from '../keycloak-admin/keycloak-admin.service';

const SEED_INDICES = ['hdx-nodes', 'hdx-datasets', 'hdx-services'];

/**
 * The bundled demo nodes/datasets/services ship without an owner, which
 * leaves them permanently un-editable except through the admin bypass —
 * they never show up under anyone's Profile, and there's no one to approve
 * an access request against them. Attributes them to hdx.admin at boot so
 * they behave like any other owned data.
 *
 * Retries resolving hdx.admin's id briefly: Controlplane's `depends_on:
 * keycloak` only waits for Keycloak's process to start, not for kc-setup to
 * finish creating the `hdx` realm/user, so the very first lookup on a cold
 * `docker compose up` will usually 404.
 */
@Injectable()
export class SeedOwnershipService implements OnModuleInit {
  private readonly logger = new Logger(SeedOwnershipService.name);

  constructor(
    private readonly es: ElasticsearchService,
    private readonly keycloakAdmin: KeycloakAdminService,
  ) {}

  async onModuleInit(): Promise<void> {
    const adminId = await this.resolveAdminId();
    if (!adminId) {
      this.logger.warn('Could not resolve hdx.admin — skipping seed-data ownership backfill this boot.');
      return;
    }
    for (const index of SEED_INDICES) {
      await this.es.ensureIndex(index);
      await this.es.backfillMissingOwner(index, adminId);
    }
  }

  private async resolveAdminId(): Promise<string | undefined> {
    for (let attempt = 0; attempt < 15; attempt++) {
      try {
        const id = await this.keycloakAdmin.findUserIdByUsername('hdx.admin');
        if (id) return id;
      } catch {
        // hdx realm/user not ready yet (kc-setup still running) — retry.
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return undefined;
  }
}
