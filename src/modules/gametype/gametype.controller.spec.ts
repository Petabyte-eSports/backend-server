import { Test, TestingModule } from '@nestjs/testing';
import { GametypeController } from './gametype.controller';
import { GametypeService } from './gametype.service';

describe('GametypeController', () => {
  let controller: GametypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GametypeController],
      providers: [GametypeService],
    }).compile();

    controller = module.get<GametypeController>(GametypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
