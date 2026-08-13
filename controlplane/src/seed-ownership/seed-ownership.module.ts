import { Module } from '@nestjs/common';
import { NodesModule } from '../nodes/nodes.module';
import { DatasetsModule } from '../datasets/datasets.module';
import { ServicesModule } from '../services/services.module';
import { SeedOwnershipService } from './seed-ownership.service';

@Module({
  // Imported (not just used) so Nest initializes Nodes/Datasets/Services —
  // and therefore their onModuleInit seeding — before this module's own
  // onModuleInit runs; Nest resolves lifecycle hooks in dependency order.
  imports: [NodesModule, DatasetsModule, ServicesModule],
  providers: [SeedOwnershipService],
})
export class SeedOwnershipModule {}
