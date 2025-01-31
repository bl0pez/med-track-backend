import { Module } from '@nestjs/common';
import { CylinderTransactionService } from './cylinder-transaction.service';
import { CylinderTransactionController } from './cylinder-transaction.controller';

@Module({
  controllers: [CylinderTransactionController],
  providers: [CylinderTransactionService],
})
export class CylinderTransactionModule {}
