import { Module } from '@nestjs/common';
import { TankService } from './tank.service';
import { TankController } from './tank.controller';
import { SystemMetricsModule } from 'src/system-metrics/system-metrics.module';

@Module({
  imports: [SystemMetricsModule],
  controllers: [TankController],
  providers: [TankService],
})
export class TankModule {}
