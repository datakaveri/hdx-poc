import { Global, Module } from '@nestjs/common';
import { FileserverClientService } from './fileserver-client.service';

@Global()
@Module({
  providers: [FileserverClientService],
  exports: [FileserverClientService],
})
export class FileserverClientModule {}
