import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {
  }
  getHello(): string {
    return 'Hello World!';
  }

}
