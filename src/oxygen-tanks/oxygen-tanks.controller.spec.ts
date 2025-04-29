import { Test, TestingModule } from '@nestjs/testing';
import { OxygenTanksController } from './oxygen-tanks.controller';
import { OxygenTanksService } from './oxygen-tanks.service';

describe('OxygenTanksController', () => {
  let controller: OxygenTanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OxygenTanksController],
      providers: [OxygenTanksService],
    }).compile();

    controller = module.get<OxygenTanksController>(OxygenTanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
