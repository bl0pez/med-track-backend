import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SystemMetricsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.systemMetrics.findMany();
  }

  async incrementPatientsActive() {
    return await this.prismaService.systemMetrics.update({
      where: { id: 1 },
      data: { total_patients_active: { increment: 1 } },
    });
  }

  async decrementPatientsActive() {
    return await this.prismaService.systemMetrics.update({
      where: { id: 1 },
      data: { total_patients_active: { decrement: 1 } },
    });
  }

  async incrementPatientsInactive() {
    return await this.prismaService.systemMetrics.update({
      where: { id: 1 },
      data: { total_patients_inactive: { increment: 1 } },
    });
  }

  async decrementPatientsInactive() {
    return await this.prismaService.systemMetrics.update({
      where: { id: 1 },
      data: { total_patients_inactive: { decrement: 1 } },
    });
  }
}
