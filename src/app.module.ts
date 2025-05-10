import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { OxygenTanksModule } from './oxygen-tanks/oxygen-tanks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    PatientModule,
    OxygenTanksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
