import { Controller } from '@nestjs/common';
import { CylinderTransactionService } from './cylinder-transaction.service';

@Controller('cylinder-transaction')
export class CylinderTransactionController {
  constructor(private readonly cylinderTransactionService: CylinderTransactionService) {}
}
