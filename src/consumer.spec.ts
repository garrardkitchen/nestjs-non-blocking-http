import { Test, TestingModule } from '@nestjs/testing';
import { Consumer } from './consumer';

describe('Consumer', () => {
  let provider: Consumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Consumer],
    }).compile();

    provider = module.get<Consumer>(Consumer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
