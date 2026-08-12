import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  readonly bucket = process.env.MINIO_BUCKET ?? 'hdx-datasets';

  readonly client = new Client({
    endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
    port: Number(process.env.MINIO_PORT ?? 9000),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY ?? 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY ?? 'minioadmin',
  });

  async onModuleInit(): Promise<void> {
    const exists = await this.client.bucketExists(this.bucket).catch(() => false);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
      this.logger.log(`Created bucket "${this.bucket}"`);
    }
  }

  putObject(key: string, buffer: Buffer, contentType: string, originalFilename: string) {
    return this.client.putObject(this.bucket, key, buffer, buffer.length, {
      'Content-Type': contentType,
      'original-filename': encodeURIComponent(originalFilename),
    });
  }

  getObjectStream(key: string) {
    return this.client.getObject(this.bucket, key);
  }

  statObject(key: string) {
    return this.client.statObject(this.bucket, key);
  }

  /** Lists every object under a prefix (e.g. `${entityId}/`) — used to cascade-delete an entity's files. */
  async listObjectsByPrefix(prefix: string): Promise<string[]> {
    const keys: string[] = [];
    const stream = this.client.listObjectsV2(this.bucket, prefix, true);
    for await (const obj of stream) {
      if (obj.name) keys.push(obj.name);
    }
    return keys;
  }

  async removeObjects(keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    await this.client.removeObjects(this.bucket, keys);
  }
}
