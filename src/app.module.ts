import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
