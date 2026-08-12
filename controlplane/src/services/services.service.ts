import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { FileserverClientService } from '../fileserver-client/fileserver-client.service';
import { AuthUser, isAdmin, isOwnerOfNode } from '../common/authz';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import seedServices from '../seed/services.seed.json';

const INDEX = 'hdx-services';

interface ServiceDoc extends CreateServiceDto {
  id: string;
  ownerId?: string;
  visibility: 'public' | 'private';
}

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    private readonly es: ElasticsearchService,
    private readonly fileserverClient: FileserverClientService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.es.ensureIndex(INDEX);
    await this.es.seedIfEmpty(INDEX, seedServices as ServiceDoc[]);
  }

  async list(user: AuthUser | undefined): Promise<ServiceDoc[]> {
    const all = await this.es.list<ServiceDoc>(INDEX);
    return all.filter((s) => s.visibility !== 'private' || isAdmin(user) || (user && s.ownerId === user.sub));
  }

  getById(id: string): Promise<ServiceDoc | undefined> {
    return this.es.getById<ServiceDoc>(INDEX, id);
  }

  async create(dto: CreateServiceDto, user: AuthUser): Promise<ServiceDoc> {
    if (dto.nodeId === 'platform') {
      if (!isAdmin(user)) throw new ForbiddenException('Only an admin can register a platform-wide service');
    } else if (!isOwnerOfNode(user, dto.nodeId)) {
      throw new ForbiddenException('Only the owning node_owner (or an admin) can register a service for this node');
    }
    const id = dto.id ?? randomUUID();
    const doc: ServiceDoc = { ...dto, id, ownerId: user.sub, visibility: dto.visibility ?? 'public' };
    await this.es.index(INDEX, id, doc);
    return doc;
  }

  async update(id: string, patch: UpdateServiceDto, user: AuthUser): Promise<ServiceDoc | undefined> {
    const existing = await this.getById(id);
    if (!existing) throw new NotFoundException(`Service "${id}" not found`);
    if (!isAdmin(user) && existing.ownerId !== user.sub) throw new ForbiddenException('Not authorized to update this service');
    await this.es.update<ServiceDoc>(INDEX, id, patch);
    return this.getById(id);
  }

  async remove(id: string, user: AuthUser, authorization: string | undefined): Promise<void> {
    const existing = await this.getById(id);
    if (!existing) throw new NotFoundException(`Service "${id}" not found`);
    if (!isAdmin(user) && existing.ownerId !== user.sub) throw new ForbiddenException('Not authorized to delete this service');
    await this.fileserverClient.deleteEntityFiles(id, authorization);
    await this.es.delete(INDEX, id);
  }

  /** Used by NodesService.remove() to cascade a node delete to its services. */
  async removeAllForNode(nodeId: string, authorization: string | undefined): Promise<void> {
    const services = await this.es.findByField<ServiceDoc>(INDEX, 'nodeId', nodeId);
    for (const s of services) {
      await this.fileserverClient.deleteEntityFiles(s.id, authorization);
    }
    await this.es.deleteByField(INDEX, 'nodeId', nodeId);
  }
}
