import { Test, TestingModule } from '@nestjs/testing';
import { LongService } from './long.service';

describe('LongService', () => {
  let service: LongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongService],
    }).compile();

    service = module.get<LongService>(LongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
