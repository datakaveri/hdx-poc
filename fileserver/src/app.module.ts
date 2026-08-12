import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MinioModule } from './minio/minio.module';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { KeycloakAuthGuard } from './common/keycloak-auth.guard';

@Module({
  imports: [MinioModule, FilesModule, HealthModule],
  providers: [{ provide: APP_GUARD, useClass: KeycloakAuthGuard }],
})
export class AppModule {}
