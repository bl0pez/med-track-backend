import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { CylinderStatus } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';

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

  async findAll(paginationDto: PaginationDto) {
    const isPagination = paginationDto.page && paginationDto.limit;

    const [cylinders, count] = await Promise.all([
      this.prismaService.cylinder.findMany({
        skip: isPagination && (paginationDto.page - 1) * paginationDto.limit,
        take: isPagination && paginationDto.limit,
        where: {
          serialNumber: {
            contains: paginationDto?.search,
            mode: 'insensitive',
          },
        },
      }),
      this.prismaService.cylinder.count({
        where: {
          serialNumber: {
            contains: paginationDto?.search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      cylinders,
      metadata: createPagination({
        page: paginationDto.page,
        rowsPerPage: paginationDto.limit,
        count: cylinders.length,
        totalCount: count,
      }),
    };
  }
}
