import { Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { GetMetricsDto } from './dto/get-metrics.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetrics(@Query() getMetricsDto: GetMetricsDto) {
    return this.metricsService.getMetrics(getMetricsDto);
  }
}
