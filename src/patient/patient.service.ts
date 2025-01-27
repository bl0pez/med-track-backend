import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { createPagination } from 'src/helpers/createPagination';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPatientDto: CreatePatientDto, user: User) {
    return this.prismaService.patient.create({
      data: {
        name: createPatientDto.name,
        rut: createPatientDto.rut,
        createdUser: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const isPagination = paginationDto.page && paginationDto.limit;
    const patientId = isNaN(Number(paginationDto?.search))
      ? undefined
      : Number(paginationDto.search);

    const patients = await this.prismaService.patient.findMany({
      skip: isPagination && (paginationDto.page - 1) * paginationDto.limit,
      take: isPagination && paginationDto.limit,
      where: {
        AND: [
          { id: patientId },
          { name: { contains: paginationDto?.search, mode: 'insensitive' } },
          { rut: { contains: paginationDto?.search, mode: 'insensitive' } },
        ],
      },
      include: {
        createdUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const count = await this.prismaService.patient.count({
      where: {
        AND: [
          { id: patientId },
          { name: { contains: paginationDto?.search, mode: 'insensitive' } },
          { rut: { contains: paginationDto?.search, mode: 'insensitive' } },
        ],
      },
    });

    return {
      data: patients,
      metadata: createPagination({
        page: paginationDto.page,
        rowsPerPage: paginationDto.limit,
        count: patients.length,
        totalCount: count,
      }),
    };
  }
}
