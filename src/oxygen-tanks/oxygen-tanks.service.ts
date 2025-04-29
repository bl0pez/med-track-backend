import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOxygenTankDto } from './dto/create-oxygen-tank.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';

@Injectable()
export class OxygenTanksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByPatientId(paginationDto: PaginationDto, patientId: number) {
    const isPagination = paginationDto.page && paginationDto.limit;
    const isNumber = !isNaN(Number(paginationDto.search));

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
    });

    const count = await this.prismaService.oxygenTank.count({
      where: {
        AND: {
          patientId: Number(patientId),
          OR: [{ id: isNumber ? Number(paginationDto.search) : undefined }],
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
}
