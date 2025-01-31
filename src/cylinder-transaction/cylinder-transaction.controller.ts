import { Body, Controller, Post } from '@nestjs/common';
import { CylinderTransactionService } from './cylinder-transaction.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';
import { CreateCylinderTransactionDto } from './dto/create-cylinder-transaction.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('cylinder-transaction')
export class CylinderTransactionController {
  constructor(
    private readonly cylinderTransactionService: CylinderTransactionService,
  ) {}

  @Post()
  @Auth(Role.ADMIN, Role.OPERATOR)
  async create(
    @Body() createCylinderTransactionDto: CreateCylinderTransactionDto,
    @GetUser() user: User,
  ) {
    return this.cylinderTransactionService.create(
      createCylinderTransactionDto,
      user,
    );
  }
}
