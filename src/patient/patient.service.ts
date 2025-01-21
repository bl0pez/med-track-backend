import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PatientStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { findPatientsDto } from './dto/find-patients.dto';
import { createPagination } from 'src/helpers/createPagination';
import { FindOneByIdDto } from './dto/find-one-by-id.dto';
import { SystemMetricsService } from 'src/system-metrics/system-metrics.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly systemMetricsService: SystemMetricsService,
  ) {}

  async findAll(query: findPatientsDto) {
    const patientId = isNaN(Number(query?.search))
      ? undefined
      : Number(query?.search);

    const patients = await this.prismaService.patient.findMany({
      take: query?.limit,
      skip: query?.limit * (query?.page - 1) || 0,
      where: {
        AND: [
          { id: patientId },
          { name: { contains: query?.search, mode: 'insensitive' } },
          { rut: { contains: query?.search, mode: 'insensitive' } },
        ],
        status: query?.status,
      },
    });

    const totalRows = await this.prismaService.patient.count({
      where: {
        AND: [
          { id: patientId },
          { name: { contains: query?.search, mode: 'insensitive' } },
          { rut: { contains: query?.search, mode: 'insensitive' } },
        ],
        status: query?.status,
      },
    });

    return {
      patients: patients,
      metadata: createPagination({
        page: query.page,
        rowsPerPage: query.limit,
        count: totalRows,
      }),
    };
  }

  async create(createPatientDto: CreatePatientDto) {
    const patient = await this.findOneByRut(createPatientDto.rut);

    if (patient) {
      throw new ConflictException('Paciente ya registrado');
    }

    const newPatient = await this.prismaService.patient.create({
      data: {
        rut: createPatientDto.rut,
        name: createPatientDto.name,
        status: PatientStatus.ACTIVE,
      },
    });

    await this.patientMetrics(PatientStatus.ACTIVE);

    return newPatient;
  }

  async findOneByRut(rut: string) {
    const patient = await this.prismaService.patient.findFirst({
      where: {
        rut: rut,
      },
    });

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findOneById({ id }: FindOneByIdDto) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id: id,
      },
      include: {
        tanks: true,
      }
    });

    if (!patient) {
      throw new BadRequestException('Paciente no encontrado');
    }

    return patient;
  }

  private async patientMetrics(status: PatientStatus) {
    if (status === PatientStatus.ACTIVE) {
      return this.systemMetricsService.incrementPatientsActive();
    }

    return this.systemMetricsService.incrementPatientsInactive();
  }
}
