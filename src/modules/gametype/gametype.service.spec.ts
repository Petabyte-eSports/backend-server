import { Test, TestingModule } from '@nestjs/testing';
import { GametypeService } from './gametype.service';

describe('GametypeService', () => {
  let service: GametypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GametypeService],
    }).compile();

    service = module.get<GametypeService>(GametypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
