import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueProgress } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('gk-queue')
export class ConsumerService {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 10; i++) {
      await this.sleep(1000); //job.data
      progress += 10;
      job.progress(progress);
    }
    return {};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }


  @OnQueueCompleted()
  async onGlobalCompleted(job: Job, result: any) {
    //const job = await this.immediateQueue.getJob(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
  }

  @OnQueueProgress()
  async onQueueProgress(job: Job, progress: number) {
    //const job = await this.immediateQueue.getJob(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', progress);
  }

  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


}
