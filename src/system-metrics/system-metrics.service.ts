// import { Injectable } from '@nestjs/common';
// import { TankStatus } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class SystemMetricsService {
//   constructor(private readonly prismaService: PrismaService) {}

//   findAll() {
//     return this.prismaService.systemMetrics.findMany();
//   }

//   async incrementPatientsActive() {
//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { total_patients_active: { increment: 1 } },
//     });
//   }

//   async decrementPatientsActive() {
//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { total_patients_active: { decrement: 1 } },
//     });
//   }

//   async incrementPatientsInactive() {
//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { total_patients_inactive: { increment: 1 } },
//     });
//   }

//   async decrementPatientsInactive() {
//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { total_patients_inactive: { decrement: 1 } },
//     });
//   }

//   async incrementTanks(type: TankStatus) {
//     const field = `total_tanks_${type.toLocaleLowerCase()}`;

//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { [field]: { increment: 1 } },
//     });
//   }

//   async decrementTanks(type: TankStatus) {
//     const field = `total_tanks_${type.toLocaleLowerCase()}`;

//     return await this.prismaService.systemMetrics.update({
//       where: { id: 1 },
//       data: { [field]: { decrement: 1 } },
//     });
//   }
// }
