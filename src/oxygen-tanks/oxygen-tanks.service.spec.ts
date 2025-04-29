import { Test, TestingModule } from '@nestjs/testing';
import { OxygenTanksService } from './oxygen-tanks.service';

describe('OxygenTanksService', () => {
  let service: OxygenTanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OxygenTanksService],
    }).compile();

    service = module.get<OxygenTanksService>(OxygenTanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
