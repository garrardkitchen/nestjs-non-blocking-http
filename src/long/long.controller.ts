import { Controller, Get } from '@nestjs/common';
import { LongService } from './long.service'
import { ProducerService } from '../producer';

@Controller('long')
export class LongController {

  constructor(private readonly service: LongService, private readonly producer: ProducerService) {
  }

  @Get()
  getLong(): string {
    return this.service.getLong();
  }

  @Get('queued')
  async getQueued(): Promise<string> {
    console.log(` ${process.pid} - /queued HIT`)
    let job = await this.producer.publish()
    return `Job ${job.id} queued!`
  }
}
