import { PickType } from '@nestjs/mapped-types';
import { OxygenTankEntity } from '../entities/oxygen-tank.entity';

export class CreateOxygenTankDto extends PickType(OxygenTankEntity, [
  'patientId',
  'size',
  'serialNumber',
] as const) {}
