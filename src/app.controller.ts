import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: Logger) {}

  @Get()
  getHello(): string {
    this.logger.log("/ HIT")
    return this.appService.getHello();
  }

  // @Get('long')
  // getLong(): string {
  //   return this.appService.getLong();
  // }
}
