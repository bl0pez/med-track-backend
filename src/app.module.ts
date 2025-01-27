import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MetricsModule } from './metrics/metrics.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, MetricsModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
