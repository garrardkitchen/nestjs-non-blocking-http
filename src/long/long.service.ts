import { Injectable,Logger } from '@nestjs/common';

@Injectable()
export class LongService {
  constructor(private readonly logger: Logger) {}

  getLong() {

    for (let x=0; x<100000; x++) {
      for (let y=0; y<100000; y++) {
      }
      if (x % 10000 == 0) this.logger.log(`${x}`)
    }
    return 'finished'
  }
}
