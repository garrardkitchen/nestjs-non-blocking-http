import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {ClusterService} from './cluster/cluster.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    Logger.log(`${process.pid} - CONNECTED!`)
  });
}

// os.cpus().length;
// bootstrap();
ClusterService.clusterize(2, bootstrap)


