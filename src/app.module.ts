import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LongController } from './long/long.controller';
import { LongService } from './long/long.service';
import { ClusterService } from './cluster/cluster.service';

@Module({
  imports: [],
  controllers: [AppController, LongController],
  providers: [AppService, Logger, LongService, ClusterService],
})
export class AppModule {}
