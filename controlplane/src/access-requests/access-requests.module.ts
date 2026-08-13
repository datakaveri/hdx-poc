import { Module } from '@nestjs/common';
import { AccessRequestsController } from './access-requests.controller';
import { AccessRequestsService } from './access-requests.service';
import { NodesModule } from '../nodes/nodes.module';
import { DatasetsModule } from '../datasets/datasets.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [NodesModule, DatasetsModule, ServicesModule],
  controllers: [AccessRequestsController],
  providers: [AccessRequestsService],
})
export class AccessRequestsModule {}
