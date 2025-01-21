import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { TankModule } from './tank/tank.module';
import { SystemMetricsModule } from './system-metrics/system-metrics.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PatientModule, TankModule, SystemMetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
