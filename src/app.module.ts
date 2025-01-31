import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MetricsModule } from './metrics/metrics.module';
import { PatientModule } from './patient/patient.module';
import { CylindersModule } from './cylinders/cylinders.module';
import { CylinderTransactionModule } from './cylinder-transaction/cylinder-transaction.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, MetricsModule, PatientModule, CylindersModule, CylinderTransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
