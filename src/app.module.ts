import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { OxygenTanksModule } from './oxygen-tanks/oxygen-tanks.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PatientModule, OxygenTanksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
