import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ProducerService {
  constructor(@InjectQueue('gk-queue') private myQueue: Queue) {
  }

  publish = async (): Promise<Job> => {
    const job = await this.myQueue.add({
       foo: 'bar',
     });
    return job
  }
}
