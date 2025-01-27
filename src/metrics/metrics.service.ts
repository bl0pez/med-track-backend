import { BadRequestException, Injectable } from '@nestjs/common';
import { GetMetricsDto } from './dto/get-metrics.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMetrics(GetMetricsDto: GetMetricsDto) {
    const { day, endTime, month, startTime, year } = GetMetricsDto;

    const lastDayOfMonth = new Date(year, month, 0).getDate();

    return this.prismaService.metrics.findMany({
      where: {
        AND: [
          {
            date: {
              gte: new Date(`${year}-${month}-01`),
              lte: new Date(`${year}-${month}-${lastDayOfMonth}`),
            },
          },
        ],
      },
    });
  }
}
