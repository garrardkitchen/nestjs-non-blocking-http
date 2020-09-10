import { Test, TestingModule } from '@nestjs/testing';
import { Producer } from './producer';

describe('Producer', () => {
  let provider: Producer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Producer],
    }).compile();

    provider = module.get<Producer>(Producer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
