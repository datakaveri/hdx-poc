import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { KeycloakAdminModule } from './keycloak-admin/keycloak-admin.module';
import { FileserverClientModule } from './fileserver-client/fileserver-client.module';
import { NodesModule } from './nodes/nodes.module';
import { DatasetsModule } from './datasets/datasets.module';
import { ServicesModule } from './services/services.module';
import { AccessRequestsModule } from './access-requests/access-requests.module';
import { SeedOwnershipModule } from './seed-ownership/seed-ownership.module';
import { HealthModule } from './health/health.module';
import { KeycloakAuthGuard } from './common/keycloak-auth.guard';

@Module({
  imports: [
    ElasticsearchModule,
    KeycloakAdminModule,
    FileserverClientModule,
    NodesModule,
    DatasetsModule,
    ServicesModule,
    AccessRequestsModule,
    SeedOwnershipModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: KeycloakAuthGuard }],
})
export class AppModule {}
