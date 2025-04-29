import { Module } from '@nestjs/common';
import { OxygenTanksService } from './oxygen-tanks.service';
import { OxygenTanksController } from './oxygen-tanks.controller';

@Module({
  controllers: [OxygenTanksController],
  providers: [OxygenTanksService],
})
export class OxygenTanksModule {}
