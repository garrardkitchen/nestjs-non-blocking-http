import { Injectable, Logger } from '@nestjs/common';
import * as cluster from 'cluster';
import * as os from 'os'
import { worker, workers } from 'cluster';

//const numCPUs = 3 //os.cpus().length;

@Injectable()
export class ClusterService {

  static clusterize(numCPUs: number, callback: () => void): void {

    if (cluster.isMaster ) {

      let procs = (numCPUs > os.cpus().length) ? os.cpus().length : numCPUs

      console.log(`GOING TO USE ${procs} PROCESSES`)
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);
      console.log(`SCHED_NONE: ${cluster.SCHED_NONE}`)
      console.log(`SCHED_RR: ${cluster.SCHED_RR}`)
      console.log(`cluster.schedulingPolicy=${cluster.schedulingPolicy}`)

      for (let i = 0; i < procs; i++) {
        const worker = cluster.fork();
        console.log(`CREATING PROCESS ${worker.process.pid}`);
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });

      // console.log(cluster.workers)
    } else {
        callback()
    }
  }
}
