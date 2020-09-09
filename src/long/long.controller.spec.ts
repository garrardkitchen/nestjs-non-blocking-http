import { Test, TestingModule } from '@nestjs/testing';
import { LongController } from './long.controller';

describe('LongController', () => {
  let controller: LongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LongController],
    }).compile();

    controller = module.get<LongController>(LongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
