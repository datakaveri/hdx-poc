import { Module } from '@nestjs/common';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { DatasetsModule } from '../datasets/datasets.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [DatasetsModule, ServicesModule],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService],
})
export class NodesModule {}
