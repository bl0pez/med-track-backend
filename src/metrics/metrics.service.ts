import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPatientsMetrics() {
    const [total, active, inactive] = await Promise.all([
      this.prismaService.patient.count(),
      this.prismaService.patient.count({ where: { isClosed: false } }),
      this.prismaService.patient.count({ where: { isClosed: true } }),
    ]);

    return {
      totalPatients: total,
      totalPatientsActive: active,
      totalPatientsInactive: inactive,
    };
  }
}
