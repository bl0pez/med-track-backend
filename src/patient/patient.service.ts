import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';
import { FindOneByIdDto } from './dto/find-one-by-id.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPatientDto: CreatePatientDto, user: User) {
    const isRutExists = await this.findOneByRut(createPatientDto.rut);

    if (isRutExists) {
      throw new BadRequestException('El rut ya está registrado');
    }

    return await this.prismaService.patient.create({
      data: {
        ...createPatientDto,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const isPagination = paginationDto.page && paginationDto.limit;
    const isNumber = !isNaN(Number(paginationDto.search));

    const patients = await this.prismaService.patient.findMany({
      skip: isPagination && (paginationDto.page - 1) * paginationDto.limit,
      take: isPagination && paginationDto.limit,
      where: {
        AND: {
          OR: [
            { id: isNumber ? Number(paginationDto.search) : undefined },
            { name: { contains: paginationDto?.search, mode: 'insensitive' } },
          ],
        },
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
        closedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    const count = await this.prismaService.patient.count({
      where: {
        AND: {
          OR: [
            { id: isNumber ? Number(paginationDto.search) : undefined },
            { name: { contains: paginationDto?.search, mode: 'insensitive' } },
          ],
        },
      },
    });

    return {
      patients: patients,
      metadata: createPagination({
        page: paginationDto.page,
        rowsPerPage: paginationDto.limit,
        count: patients.length,
        totalCount: count,
      }),
    };
  }

  async findOneById({ id }: FindOneByIdDto) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
        closedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!patient) {
      throw new BadRequestException('Patient not found');
    }

    return patient;
  }

  async findOneByRut(rut: string) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        rut,
      },
    });

    return patient;
  }
}
