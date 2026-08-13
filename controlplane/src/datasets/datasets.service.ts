import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { FileserverClientService } from '../fileserver-client/fileserver-client.service';
import { AuthUser, isAdmin, isOwnerOfNode } from '../common/authz';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import seedDatasets from '../seed/datasets.seed.json';

const INDEX = 'hdx-datasets';

interface DatasetDoc extends CreateDatasetDto {
  id: string;
  ownerId?: string;
  visibility: 'public' | 'private';
}

@Injectable()
export class DatasetsService implements OnModuleInit {
  constructor(
    private readonly es: ElasticsearchService,
    private readonly fileserverClient: FileserverClientService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.es.ensureIndex(INDEX);
    await this.es.seedIfEmpty(INDEX, seedDatasets as DatasetDoc[]);
  }

  /** Private datasets stay listed (with `visibility` intact) so they're discoverable and requestable — only their detail/data is gated client-side. */
  async list(_user: AuthUser | undefined): Promise<DatasetDoc[]> {
    return this.es.list<DatasetDoc>(INDEX);
  }

  getById(id: string): Promise<DatasetDoc | undefined> {
    return this.es.getById<DatasetDoc>(INDEX, id);
  }

  async create(dto: CreateDatasetDto, user: AuthUser): Promise<DatasetDoc> {
    if (!isOwnerOfNode(user, dto.nodeId)) {
      throw new ForbiddenException('Only the owning node_owner (or an admin) can register a dataset for this node');
    }
    const id = dto.id ?? randomUUID();
    const doc: DatasetDoc = { ...dto, id, ownerId: user.sub, visibility: dto.visibility ?? 'public' };
    await this.es.index(INDEX, id, doc);
    return doc;
  }

  async update(id: string, patch: UpdateDatasetDto, user: AuthUser): Promise<DatasetDoc | undefined> {
    const existing = await this.getById(id);
    if (!existing) throw new NotFoundException(`Dataset "${id}" not found`);
    if (!isAdmin(user) && existing.ownerId !== user.sub) throw new ForbiddenException('Not authorized to update this dataset');
    await this.es.update<DatasetDoc>(INDEX, id, patch);
    return this.getById(id);
  }

  async remove(id: string, user: AuthUser, authorization: string | undefined): Promise<void> {
    const existing = await this.getById(id);
    if (!existing) throw new NotFoundException(`Dataset "${id}" not found`);
    if (!isAdmin(user) && existing.ownerId !== user.sub) throw new ForbiddenException('Not authorized to delete this dataset');
    await this.fileserverClient.deleteEntityFiles(id, authorization);
    await this.es.delete(INDEX, id);
  }

  /** Used by NodesService.remove() to cascade a node delete to its datasets. */
  async removeAllForNode(nodeId: string, authorization: string | undefined): Promise<void> {
    const datasets = await this.es.findByField<DatasetDoc>(INDEX, 'nodeId', nodeId);
    for (const d of datasets) {
      await this.fileserverClient.deleteEntityFiles(d.id, authorization);
    }
    await this.es.deleteByField(INDEX, 'nodeId', nodeId);
  }
}
