import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { CylinderStatus } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';
import { UpdateCylinderDto } from './dto/update-cylinder.dto';

@Injectable()
export class CylindersService {
  private logger = new Logger(CylindersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createCylinderDto: CreateCylinderDto) {
    const cylinder = await this.findOneBySerialNumber(
      createCylinderDto.serialNumber,
    );

    if (cylinder && cylinder.status === CylinderStatus.IN_STOCK) {
      throw new BadRequestException(
        `Cilindro N° ${cylinder.serialNumber} ya se encuentra en stock`,
      );
    }
    try {
      if (cylinder && cylinder.status === CylinderStatus.RETURNED) {
        return await this.update(cylinder.id, {
          ...createCylinderDto,
          status: CylinderStatus.IN_STOCK,
        });
      }

      return await this.prismaService.cylinder.create({
        data: {
          ...createCylinderDto,
          status: CylinderStatus.IN_STOCK,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Error al crear el cilindro');
    }
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

  async findOneBySerialNumber(serialNumber: string) {
    return await this.prismaService.cylinder.findUnique({
      where: {
        serialNumber,
      },
    });
  }

  async update(id: number, updateCylinderDto: UpdateCylinderDto) {
    return await this.prismaService.cylinder.update({
      where: {
        id,
      },
      data: updateCylinderDto,
    });
  }
}
