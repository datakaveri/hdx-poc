import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

/**
 * Thin wrapper around the ES client: one index per entity type, dynamic
 * mapping (fine for a PoC), seed-on-empty so `docker compose up` gives you
 * the same demo catalogue every time without a manual seeding step.
 */
@Injectable()
export class ElasticsearchService {
  private readonly logger = new Logger(ElasticsearchService.name);
  readonly client = new Client({ node: process.env.ELASTICSEARCH_URL ?? 'http://localhost:9200' });

  async ensureIndex(index: string): Promise<void> {
    const exists = await this.client.indices.exists({ index });
    if (!exists) {
      await this.client.indices.create({ index });
      this.logger.log(`Created index "${index}"`);
    }
  }

  async seedIfEmpty<T extends { id: string }>(index: string, docs: T[]): Promise<void> {
    const { count } = await this.client.count({ index });
    if (count > 0) return;
    if (docs.length === 0) return;
    const operations = docs.flatMap((doc) => [{ index: { _index: index, _id: doc.id } }, doc]);
    await this.client.bulk({ refresh: true, operations });
    this.logger.log(`Seeded ${docs.length} documents into "${index}"`);
  }

  async list<T>(index: string): Promise<T[]> {
    const res = await this.client.search<T>({ index, size: 1000, query: { match_all: {} } });
    return res.hits.hits.map((h) => h._source as T);
  }

  async getById<T>(index: string, id: string): Promise<T | undefined> {
    try {
      const res = await this.client.get<T>({ index, id });
      return res._source;
    } catch {
      return undefined;
    }
  }

  async index<T extends object>(index: string, id: string, doc: T): Promise<void> {
    await this.client.index({ index, id, document: doc, refresh: true });
  }

  async update<T extends object>(index: string, id: string, patch: Partial<T>): Promise<void> {
    await this.client.update({ index, id, doc: patch, refresh: true });
  }

  async delete(index: string, id: string): Promise<void> {
    await this.client.delete({ index, id, refresh: true }).catch(() => undefined);
  }

  /** Sets `ownerId` on every document in `index` that doesn't already have one — used to attribute the bundled demo data to hdx.admin so it behaves like normal owned data (Profile, delete, etc). Idempotent: a no-op once every document has an owner. */
  async backfillMissingOwner<T extends { id: string; ownerId?: string }>(index: string, ownerId: string): Promise<void> {
    const unowned = (await this.list<T>(index)).filter((doc) => !doc.ownerId);
    if (unowned.length === 0) return;
    await Promise.all(unowned.map((doc) => this.update<T>(index, doc.id, { ownerId } as Partial<T>)));
    this.logger.log(`Backfilled ownerId=${ownerId} on ${unowned.length} document(s) in "${index}"`);
  }

  /** Finds every document where `field` equals `value` — used to gather a node's datasets/services before a cascade delete. */
  async findByField<T>(index: string, field: string, value: string): Promise<T[]> {
    const res = await this.client.search<T>({ index, size: 1000, query: { term: { [`${field}.keyword`]: value } } });
    return res.hits.hits.map((h) => h._source as T);
  }

  async deleteByField(index: string, field: string, value: string): Promise<void> {
    await this.client.deleteByQuery({
      index,
      refresh: true,
      query: { term: { [`${field}.keyword`]: value } },
    });
  }
}
