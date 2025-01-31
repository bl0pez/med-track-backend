import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCylinderTransactionDto } from './dto/create-cylinder-transaction.dto';
import { CylindersService } from 'src/cylinders/cylinders.service';
import { RequestType } from 'src/interfaces';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CylinderTransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cylinderService: CylindersService,
  ) {}

  async create(
    createCylinderTransactionDto: CreateCylinderTransactionDto,
    user: User,
  ) {
    const cylinder = await this.cylinderService.findOneBySerialNumber(
      createCylinderTransactionDto.serialNumber,
    );

    if (!cylinder) {
      throw new BadRequestException(
        `Cilindro N° ${createCylinderTransactionDto.serialNumber} no encontrado`,
      );
    }

    if (cylinder.status !== 'IN_STOCK') {
      throw new BadRequestException(
        `Cilindro N° ${createCylinderTransactionDto.serialNumber} no se encuentra en stock`,
      );
    }

    const { requestType, recipientId } = createCylinderTransactionDto;

    const transaction = await this.prismaService.cylinderTransaction.create({
      data: {
        cylinderId: cylinder.id,
        action: 'DELIVERY',
        deliveredAt: new Date(),
        deliveredBy: user.id,
        patientId: RequestType.PATIENT === requestType ? recipientId : null,
        serviceId: RequestType.SERVICE === requestType ? recipientId : null,
        externalId: RequestType.EXTERNAL === requestType ? recipientId : null,
      },
    });

    await this.cylinderService.update(cylinder.id, {
      status: 'DELIVERED',
    });

    return transaction;
  }
}
