import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LongController } from './long/long.controller';
import { LongService } from './long/long.service';
import { ClusterService } from './cluster/cluster.service';
import { ClusterQueueService } from './cluster/clusterQueue.service';
import { BullModule } from '@nestjs/bull';
import { ProducerService } from './producer';
import { ConsumerService } from './consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'gk-queue',
      // redis: {
      //   host: 'localhost',
      //   port: 6379,
      // },
    })
  ],
  controllers: [AppController, LongController],
  providers: [AppService, Logger, LongService, ClusterService, ClusterQueueService, ProducerService, ConsumerService],
})
export class AppModule {}
