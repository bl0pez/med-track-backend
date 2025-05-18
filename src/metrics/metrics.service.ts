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

  async getUserMetrics() {
    const [admin, users, operators] = await Promise.all([
      this.prismaService.user.count({ where: { roles: { has: 'ADMIN' } } }),
      this.prismaService.user.count({ where: { roles: { has: 'CUSTOMER' } } }),
      this.prismaService.user.count({ where: { roles: { has: 'OPERATOR' } } }),
    ]);

    return {
      totalUsers: admin + users + operators,
      totalUsersAdmin: admin,
      totalUsersCustomer: users,
      totalUsersOperator: operators,
    };
  }

  async getOxygenTanks() {
    const [delivered, returned] = await Promise.all([
      this.prismaService.oxygenTank.count({ where: { status: 'DELIVERED' } }),
      this.prismaService.oxygenTank.count({ where: { status: 'RETURNED' } }),
    ]);

    return {
      totalOxygenTanks: delivered + returned,
      totalOxygenTanksDelivered: delivered,
      totalOxygenTanksReturned: returned,
    };
  }
}
