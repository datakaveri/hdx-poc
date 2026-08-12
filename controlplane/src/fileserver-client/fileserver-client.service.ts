import { Injectable, Logger } from '@nestjs/common';

/**
 * Calls Fileserver's cascade-delete endpoint when a node/dataset/service
 * with uploaded files gets deleted. Forwards the original caller's own
 * Authorization header — Fileserver's guard still requires a valid token,
 * and Controlplane already received one, so this avoids standing up
 * separate service-account plumbing just for one internal call.
 */
@Injectable()
export class FileserverClientService {
  private readonly logger = new Logger(FileserverClientService.name);
  private readonly baseUrl = process.env.FILESERVER_URL ?? 'http://localhost:4001';

  async deleteEntityFiles(entityId: string, authorization: string | undefined): Promise<void> {
    try {
      const res = await fetch(`${this.baseUrl}/entities/${entityId}`, {
        method: 'DELETE',
        headers: authorization ? { Authorization: authorization } : {},
      });
      if (!res.ok && res.status !== 404) {
        this.logger.warn(`Fileserver cascade-delete for ${entityId} returned ${res.status}`);
      }
    } catch (err) {
      this.logger.warn(`Fileserver cascade-delete for ${entityId} failed: ${err}`);
    }
  }
}
