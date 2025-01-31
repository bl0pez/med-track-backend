import { Module } from '@nestjs/common';
import { CylinderTransactionService } from './cylinder-transaction.service';
import { CylinderTransactionController } from './cylinder-transaction.controller';
import { CylindersModule } from '../cylinders/cylinders.module';

@Module({
  imports: [CylindersModule],
  controllers: [CylinderTransactionController],
  providers: [CylinderTransactionService],
})
export class CylinderTransactionModule {}
