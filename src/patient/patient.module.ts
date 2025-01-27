import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
