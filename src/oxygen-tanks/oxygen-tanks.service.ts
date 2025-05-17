import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOxygenTankDto } from './dto/create-oxygen-tank.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OxygenTanksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByPatientId(paginationDto: PaginationDto, patientId: number) {
    const isPagination = paginationDto.page && paginationDto.limit;

    const oxygenTanks = await this.prismaService.oxygenTank.findMany({
      skip: isPagination && (paginationDto.page - 1) * paginationDto.limit,
      take: isPagination && paginationDto.limit,
      where: {
        AND: {
          patientId: Number(patientId),
          OR: [
            {
              serialNumber: {
                contains: paginationDto?.search,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
      ...this.defaultCondition(),
    });

    const count = await this.prismaService.oxygenTank.count({
      where: {
        AND: {
          patientId: Number(patientId),
          OR: [
            {
              serialNumber: {
                contains: paginationDto?.search,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
    });

    return {
      oxygenTanks,
      metadata: createPagination({
        page: paginationDto.page,
        rowsPerPage: paginationDto.limit,
        count: oxygenTanks.length,
        totalCount: count,
      }),
    };
  }

  async create(createOxygenTankDto: CreateOxygenTankDto, userId: number) {
    const isSerialNumberExists = await this.prismaService.oxygenTank.findFirst({
      where: {
        serialNumber: createOxygenTankDto.serialNumber,
        status: 'DELIVERED',
      },
    });

    if (isSerialNumberExists) {
      throw new BadRequestException(
        `Ya existe un tanque de oxígeno con el número de serie ${createOxygenTankDto.serialNumber}, cierre el tanque antes de crear uno nuevo`,
      );
    }

    return await this.prismaService.oxygenTank.create({
      data: {
        serialNumber: createOxygenTankDto.serialNumber,
        deliveredAt: new Date(),
        status: 'DELIVERED',
        patient: {
          connect: {
            id: createOxygenTankDto.patientId,
          },
        },
        deliveredBy: {
          connect: {
            id: userId,
          },
        },
        size: createOxygenTankDto.size,
      },
    });
  }

  async findBySerialNumber(serialNumber: string) {
    const oxygenTank = await this.prismaService.oxygenTank.findFirst({
      where: {
        serialNumber,
        status: 'DELIVERED',
      },
    });

    if (!oxygenTank) {
      return {
        oxygenTank: null,
      };
    }

    return {
      oxygenTank,
    };
  }

  async returnTank(id: number, serialNumber: string, user: User) {
    const oxygenTank = await this.prismaService.oxygenTank.findFirst({
      where: {
        id,
        serialNumber,
        status: 'DELIVERED',
      },
    });

    if (!oxygenTank) {
      throw new BadRequestException(
        `El tanque de oxígeno con el número de serie ${serialNumber} no existe o ya ha sido cerrado`,
      );
    }

    return await this.prismaService.oxygenTank.update({
      where: {
        id,
      },
      data: {
        status: 'RETURNED',
        returnedAt: new Date(),
        receivedById: user.id,
      },
    });
  }

  private defaultCondition() {
    return {
      orderBy: [
        {
          returnedAt: 'desc' as const,
        },
        {
          deliveredAt: 'desc' as const,
        },
      ],
      include: {
        receivedBy: {
          select: {
            name: true,
          },
        },
        deliveredBy: {
          select: {
            name: true,
          },
        },
      },
    };
  }
}
