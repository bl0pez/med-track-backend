// import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { CreateTankDto } from './dto/create-tank.dto';
// import { UpdateTankDto } from './dto/update-tank.dto';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { $Enums, Prisma, TankCapacity } from '@prisma/client';
// import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { createPagination } from 'src/helpers/createPagination';
// import { TankSearchDto } from './dto/tank-search.dto';
// import { SystemMetricsService } from 'src/system-metrics/system-metrics.service';

// @Injectable()
// export class TankService {

//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly systemMetricsService: SystemMetricsService
//   ) {}

//   async create(createTankDto: CreateTankDto) {

//     const { external_id, patient_id, service_id } = createTankDto;

//     if (!external_id && !patient_id && !service_id) {
//       throw new BadRequestException("Se debe especificar un paciente, servicio o id externo");
//     }

//     try {
//       const tank = await this.prismaService.tank.create({
//         data: {
//           number_tank: createTankDto.number_tank,
//           request_type: createTankDto.request_type,
//           capacity: createTankDto.capacity,
//           status: createTankDto.status,
//           deliveredAt: new Date(),
//           patient_id: createTankDto.patient_id,
//           service_id: createTankDto.service_id,
//           external_id: createTankDto.external_id,
//         }
//       });

//       await this.systemMetricsService.incrementTanks(createTankDto.status);

//       return tank;

//     } catch (error) {
//       this.customError(error);
//     }
    
//   }

//   async findAll(paginationDto: PaginationDto) {
    
//     const tanks = await this.prismaService.tank.findMany({
//       take: paginationDto.limit,
//       skip: paginationDto?.limit * (paginationDto?.page - 1) || 0,
//       where: {
//         AND: [
//           { number_tank: { contains: paginationDto?.search, mode: 'insensitive' } },
//         ]
//       }
//     });

//     const rowsPerPage = await this.prismaService.tank.count({
//       where: {
//         AND: [
//           { number_tank: { contains: paginationDto?.search, mode: 'insensitive' } },
//         ]
//       }
//     });

//     return {
//       tanks: tanks,
//       metadata: createPagination({
//         page: paginationDto.page,
//         rowsPerPage: paginationDto.limit,
//         count: rowsPerPage,
//       })
//     };

//   }

//   async findOneByCode(code: string) {
//     const tank = await this.prismaService.tank.findFirst({
//       where: {
//         number_tank: code,
//         capacity: TankCapacity.SIX_M2,
//         returnedAt: null
//       },
//       include: {
//         patient: true,
//         service: true
//       }
//     });

//     if (!tank) {
//       throw new BadRequestException("Tanque no encontrado");
//     }

//     return tank;

//   }

//   async searchTanks(tankSearchDto: TankSearchDto) {
//     const { patient_id, external_id, service_id } = tankSearchDto;

//     if (!patient_id && !external_id && !service_id) {
//       throw new BadRequestException("Se debe especificar un paciente, servicio o id externo");
//     }

//     const tanks = await this.prismaService.tank.findMany({
//       take: tankSearchDto.limit,
//       skip: tankSearchDto?.limit * (tankSearchDto?.page - 1) || 0,
//       where: {
//         OR: [
//           { patient_id: patient_id },
//           { external_id: external_id },
//           { service_id: service_id },
//         ],
//         AND: [
//           { number_tank: { contains: tankSearchDto?.search, mode: 'insensitive' } },
//         ],
//       },
//       orderBy: {
//         status: 'asc'
//       }
//     });

//     const totalRows = await this.prismaService.tank.count({
//       where: {
//         OR: [
//           { patient_id: patient_id },
//           { external_id: external_id },
//           { service_id: service_id },
//         ],
//         AND: [
//           { number_tank: { contains: tankSearchDto?.search, mode: 'insensitive' } },
//         ]
//       }
//     });

//     return {
//       tanks: tanks,
//       metadata: createPagination({
//         page: tankSearchDto.page,
//         rowsPerPage: tankSearchDto.limit,
//         count: totalRows,
//     })
//     }
//   }

//   async close(id: number) {
//     const tank = await this.findOneById(id);

//     if (tank.status === $Enums.TankStatus.RETURNED) {
//       throw new BadRequestException("Tanque ya ha sido devuelto");
//     }

//     try {
//       const tank = await this.prismaService.tank.update({
//         where: {
//           id: id
//         },
//         data: {
//           status: $Enums.TankStatus.RETURNED,
//           returnedAt: new Date()
//         }
//       });

//       await this.systemMetricsService.decrementTanks(tank.status);

//       return tank;

//     } catch (error) {
//       this.customError(error);
//     }
//   }

//   async findOneById(id: number) {
//     const tank = await this.prismaService.tank.findFirst({
//       where: {
//         id: id
//       }
//     });

//     if (!tank) {
//       throw new BadRequestException("Tanque no encontrado");
//     }

//     return tank;
//   }

//   update(id: number, updateTankDto: UpdateTankDto) {
//     return `This action updates a #${id} tank`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} tank`;
//   }

//   private customError(error: Error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2003") {
        
//         if (error.message.includes("patient_id")) {
//           throw new BadRequestException("Paciente no encontrado");
//         }

//         if (error.message.includes("service_id")) {
//           throw new BadRequestException("Servicio no encontrado");
//         }

//         if (error.message.includes("request_type")) {
//           throw new BadRequestException("Tipo de solicitud no encontrado");
//         }
//       }
//     }

//     throw new InternalServerErrorException();
//   }
// }
