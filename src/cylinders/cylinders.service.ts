import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { CylinderStatus } from '@prisma/client';

@Injectable()
export class CylindersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCylinderDto: CreateCylinderDto) {
    return await this.prismaService.cylinder.create({
      data: {
        ...createCylinderDto,
        status: CylinderStatus.IN_STOCK,
      },
    });
  }
}
