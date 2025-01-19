import { ConflictException, Injectable } from '@nestjs/common';
import { PatientStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        const [patients, total] = await Promise.all([
            this.prismaService.patient.findMany(),
            this.prismaService.patient.count()
        ])

        return {
            patients: patients,
            total: total
        }
    }

    async create(createPatientDto: CreatePatientDto) {
        const patient = await this.findOneByRut(createPatientDto.rut);

        if (patient) {
            throw new ConflictException('Paciente ya registrado');
        };

        return this.prismaService.patient.create({
            data: {
                rut: createPatientDto.rut,
                name: createPatientDto.name,
                status: PatientStatus.ACTIVE
            }
        });
    }

    async findOneByRut(rut: string) {
        const patient = await this.prismaService.patient.findFirst({
            where: {
                rut: rut
            }
        });

        if (!patient) {
            return null;
        }

        return patient;
    }
}
