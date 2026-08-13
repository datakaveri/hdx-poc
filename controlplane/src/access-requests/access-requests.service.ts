import { ConflictException, ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { NodesService } from '../nodes/nodes.service';
import { DatasetsService } from '../datasets/datasets.service';
import { ServicesService } from '../services/services.service';
import { AuthUser, isAdmin } from '../common/authz';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';

const INDEX = 'hdx-access-requests';

export interface AccessRequestDoc {
  id: string;
  requesterId: string;
  resourceType: 'node' | 'dataset' | 'service';
  resourceId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  decidedAt?: string;
  decidedBy?: string;
}

@Injectable()
export class AccessRequestsService implements OnModuleInit {
  constructor(
    private readonly es: ElasticsearchService,
    private readonly nodes: NodesService,
    private readonly datasets: DatasetsService,
    private readonly services: ServicesService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.es.ensureIndex(INDEX);
  }

  private list(): Promise<AccessRequestDoc[]> {
    return this.es.list<AccessRequestDoc>(INDEX);
  }

  /** Resolves the owning user id of a node/dataset/service, for authorization checks. */
  private async resolveOwnerId(resourceType: AccessRequestDoc['resourceType'], resourceId: string): Promise<string | undefined> {
    if (resourceType === 'node') return (await this.nodes.getById(resourceId))?.ownerId;
    if (resourceType === 'dataset') return (await this.datasets.getById(resourceId))?.ownerId;
    return (await this.services.getById(resourceId))?.ownerId;
  }

  async mine(user: AuthUser): Promise<AccessRequestDoc[]> {
    return (await this.list()).filter((r) => r.requesterId === user.sub);
  }

  async toReview(user: AuthUser): Promise<AccessRequestDoc[]> {
    const pending = (await this.list()).filter((r) => r.status === 'pending');
    if (isAdmin(user)) return pending;
    const withOwners = await Promise.all(
      pending.map(async (r) => ({ r, ownerId: await this.resolveOwnerId(r.resourceType, r.resourceId) })),
    );
    return withOwners.filter(({ ownerId }) => ownerId === user.sub).map(({ r }) => r);
  }

  async create(dto: CreateAccessRequestDto, user: AuthUser): Promise<AccessRequestDoc> {
    const existing = await this.list();
    const duplicate = existing.some(
      (r) =>
        r.requesterId === user.sub &&
        r.resourceType === dto.resourceType &&
        r.resourceId === dto.resourceId &&
        r.status === 'pending',
    );
    if (duplicate) throw new ConflictException('A pending request for this resource already exists');

    const id = randomUUID();
    const doc: AccessRequestDoc = {
      id,
      requesterId: user.sub,
      resourceType: dto.resourceType,
      resourceId: dto.resourceId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    await this.es.index(INDEX, id, doc);
    return doc;
  }

  private async decide(id: string, user: AuthUser, status: 'approved' | 'rejected'): Promise<AccessRequestDoc> {
    const request = await this.es.getById<AccessRequestDoc>(INDEX, id);
    if (!request) throw new NotFoundException(`Access request "${id}" not found`);
    const ownerId = await this.resolveOwnerId(request.resourceType, request.resourceId);
    if (!isAdmin(user) && ownerId !== user.sub) {
      throw new ForbiddenException('Only the resource owner (or an admin) can decide this request');
    }
    const patch = { status, decidedAt: new Date().toISOString(), decidedBy: user.sub };
    await this.es.update<AccessRequestDoc>(INDEX, id, patch);
    return { ...request, ...patch };
  }

  approve(id: string, user: AuthUser): Promise<AccessRequestDoc> {
    return this.decide(id, user, 'approved');
  }

  reject(id: string, user: AuthUser): Promise<AccessRequestDoc> {
    return this.decide(id, user, 'rejected');
  }
}
