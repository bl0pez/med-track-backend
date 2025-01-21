import { Injectable } from '@nestjs/common';
import { CreateSystemMetricDto } from './dto/create-system-metric.dto';
import { UpdateSystemMetricDto } from './dto/update-system-metric.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SystemMetricsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.systemMetrics.findMany();
  }
}
