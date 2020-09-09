import { Controller, Get } from '@nestjs/common';
import {LongService} from './long.service'

@Controller('long')
export class LongController {

  constructor(private readonly service: LongService) {
  }

  @Get()
  getLong(): string {
    return this.service.getLong();
  }
}
