import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { randomUUID } from 'crypto';
import { MinioService } from '../minio/minio.service';

@ApiTags('files')
@ApiBearerAuth()
@Controller()
export class FilesController {
  constructor(private readonly minio: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body('refId') refId: string,
    @Body('refType') refType: string,
  ) {
    if (!file) throw new BadRequestException('No file provided (expected multipart field "file")');
    if (!refId) throw new BadRequestException('refId is required');

    // refId is the Elasticsearch-assigned id of the owning node/dataset/service —
    // files sit under <refId>/files/... so an entity's whole folder can be
    // cascade-deleted with a single prefix listing (see DELETE /entities/:entityId).
    const key = `${refId}/files/${randomUUID()}-${file.originalname}`;
    await this.minio.putObject(key, file.buffer, file.mimetype, file.originalname);

    return {
      bucket: this.minio.bucket,
      key,
      refId,
      refType,
      filename: file.originalname,
      size: file.size,
      contentType: file.mimetype,
    };
  }

  @Get('download')
  async download(@Query('key') key: string, @Res() res: Response) {
    if (!key) throw new BadRequestException('key query param is required');
    let filename = key;
    try {
      const stat = await this.minio.statObject(key);
      const encoded = stat.metaData?.['original-filename'];
      if (encoded) filename = decodeURIComponent(encoded);
    } catch {
      throw new NotFoundException(`File "${key}" not found`);
    }
    const stream = await this.minio.getObjectStream(key);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    stream.pipe(res);
  }

  /** Deletes every file under `<entityId>/` — called by Controlplane when a node/dataset/service is deleted. */
  @Delete('entities/:entityId')
  async removeEntityFiles(@Param('entityId') entityId: string) {
    const keys = await this.minio.listObjectsByPrefix(`${entityId}/`);
    await this.minio.removeObjects(keys);
    return { deleted: keys.length };
  }
}
