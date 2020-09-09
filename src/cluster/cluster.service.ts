import { Injectable } from '@nestjs/common';
import * as cluster from 'cluster';
import * as os from 'os'

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
  static clusterize(callback: () => void): void {
    // && !ConfigService.isDevEnvironment()
    if (cluster.isMaster ) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);
      console.log(`cluster.schedulingPolicy=${cluster.schedulingPolicy}`)

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
