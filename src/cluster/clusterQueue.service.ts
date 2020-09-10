import { Injectable } from '@nestjs/common';
import * as cluster from 'cluster';
import * as os from 'os'
import { worker, workers } from 'cluster';

//const numCPUs = 3 //os.cpus().length;

@Injectable()
export class ClusterQueueService {

  static clusterizeQueue(numCPUs: number, callback: () => void): void {

    if (cluster.isMaster ) {

      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      console.log(`SCHED_NONE: ${cluster.SCHED_NONE}`)
      console.log(`SCHED_RR: ${cluster.SCHED_RR}`)

      console.log(`cluster.schedulingPolicy=${cluster.schedulingPolicy}`)

      for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        console.log(`${worker.process.pid}`);
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });

      console.log(cluster.workers)
    } else {
        callback()
    }
  }
}
