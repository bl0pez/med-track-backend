import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemMetricDto } from './create-system-metric.dto';

export class UpdateSystemMetricDto extends PartialType(CreateSystemMetricDto) {}
