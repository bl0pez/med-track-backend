import { Controller, Get, Param } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/interfaces';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('oxygen-tanks/:year')
  async getOxygenTankWithYear(@Param() { year }: { year: string }) {
    return this.metricsService.getOxygenTankWithYear(Number(year));
  }

  @Get('patients')
  @Auth()
  async getPatientsMetrics() {
    return this.metricsService.getPatientsMetrics();
  }

  @Get('users')
  @Auth(Role.ADMIN)
  async getUserMetrics() {
    return this.metricsService.getUserMetrics();
  }

  @Get('oxygen-tanks')
  @Auth()
  async getOxygenTanksMetrics() {
    return this.metricsService.getOxygenTanks();
  }
}
