import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { KeycloakAdminService } from '../keycloak-admin/keycloak-admin.service';
import { FileserverClientService } from '../fileserver-client/fileserver-client.service';
import { DatasetsService } from '../datasets/datasets.service';
import { ServicesService } from '../services/services.service';
import { AuthUser, isAdmin, isOwnerOfNode } from '../common/authz';
import { CreateNodeDto } from './dto/create-node.dto';
import seedNodes from '../seed/nodes.seed.json';

const INDEX = 'hdx-nodes';

interface NodeDoc extends CreateNodeDto {
  id: string;
  ownerId?: string;
  approvalStatus: 'pending' | 'approved';
}

@Injectable()
export class NodesService implements OnModuleInit {
  constructor(
    private readonly es: ElasticsearchService,
    private readonly keycloakAdmin: KeycloakAdminService,
    private readonly fileserverClient: FileserverClientService,
    private readonly datasets: DatasetsService,
    private readonly services: ServicesService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.es.ensureIndex(INDEX);
    await this.es.seedIfEmpty(INDEX, seedNodes as NodeDoc[]);
  }

  /** Approved nodes, plus the caller's own pending submissions (if any). */
  async list(user: AuthUser | undefined): Promise<NodeDoc[]> {
    const all = await this.es.list<NodeDoc>(INDEX);
    return all.filter((n) => n.approvalStatus === 'approved' || (user && n.ownerId === user.sub));
  }

  listPending(): Promise<NodeDoc[]> {
    return this.es.findByField<NodeDoc>(INDEX, 'approvalStatus', 'pending');
  }

  getById(id: string): Promise<NodeDoc | undefined> {
    return this.es.getById<NodeDoc>(INDEX, id);
  }

  async create(dto: CreateNodeDto, user: AuthUser): Promise<NodeDoc> {
    const id = dto.id ?? randomUUID();
    const doc: NodeDoc = {
      ...dto,
      id,
      status: dto.status ?? 'online',
      ownerId: user.sub,
      approvalStatus: 'pending',
    };
    await this.es.index(INDEX, id, doc);
    return doc;
  }

  async approve(id: string): Promise<NodeDoc> {
    const node = await this.getById(id);
    if (!node) throw new NotFoundException(`Node "${id}" not found`);
    await this.es.update<NodeDoc>(INDEX, id, { approvalStatus: 'approved' });
    if (node.ownerId) {
      await this.keycloakAdmin.assignRole(node.ownerId, 'node_owner');
      await this.keycloakAdmin.setNodeIdAttribute(node.ownerId, id);
    }
    return { ...node, approvalStatus: 'approved' };
  }

  /** Cascades to every dataset/service registered against this node, and their uploaded files. */
  async remove(id: string, user: AuthUser, authorization: string | undefined): Promise<void> {
    const node = await this.getById(id);
    if (!node) throw new NotFoundException(`Node "${id}" not found`);
    if (!isAdmin(user) && !isOwnerOfNode(user, id)) {
      throw new ForbiddenException('Not authorized to delete this node');
    }
    await this.datasets.removeAllForNode(id, authorization);
    await this.services.removeAllForNode(id, authorization);
    await this.fileserverClient.deleteEntityFiles(id, authorization);
    await this.es.delete(INDEX, id);
  }
}
