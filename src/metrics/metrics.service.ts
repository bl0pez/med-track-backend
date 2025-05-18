import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getOxygenTankWithYear(year: number) {
    if (isNaN(year)) {
      throw new BadRequestException('EL año ingresado no es válido');
    }

    const result = await this.prismaService.$queryRaw<
      Array<{
        month: number;
        delivered_count: number;
        returned_count: number;
      }>
    >`
  SELECT
    months.month,
    COALESCE(delivered.delivered_count, 0) AS delivered_count,
    COALESCE(returned.returned_count, 0) AS returned_count
  FROM
    (SELECT generate_series(1, 12) AS month) AS months
  LEFT JOIN (
    SELECT
      CAST(EXTRACT(MONTH FROM "deliveredAt") AS INTEGER) AS month,
      COUNT(*) AS delivered_count
    FROM "OxygenTank"
    WHERE "deliveredAt" IS NOT NULL
      AND EXTRACT(YEAR FROM "deliveredAt") = ${year}
    GROUP BY month
  ) AS delivered ON months.month = delivered.month
  LEFT JOIN (
    SELECT
      CAST(EXTRACT(MONTH FROM "returnedAt") AS INTEGER) AS month,
      COUNT(*) AS returned_count
    FROM "OxygenTank"
    WHERE "returnedAt" IS NOT NULL
      AND EXTRACT(YEAR FROM "returnedAt") = ${year}
    GROUP BY month
  ) AS returned ON months.month = returned.month
  ORDER BY months.month
`;

    return result.map((row: any) => ({
      month: Number(row.month),
      delivered_count: Number(row.delivered_count),
      returned_count: Number(row.returned_count),
    }));
  }
}
