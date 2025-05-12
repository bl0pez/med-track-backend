import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('patients')
  async getPatientsMetrics() {
    return this.metricsService.getPatientsMetrics();
  }

  @Get('users')
  async getUserMetrics() {
    return this.metricsService.getUserMetrics();
  }
}
