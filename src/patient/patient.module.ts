import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SystemMetricsModule } from 'src/system-metrics/system-metrics.module';

@Module({
  imports: [SystemMetricsModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
