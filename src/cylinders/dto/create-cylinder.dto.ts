import { CylinderCapacity } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateCylinderDto {
  @IsString()
  serialNumber: string;

  @IsEnum([CylinderCapacity.SIX_M3, CylinderCapacity.SIX_M3])
  capacity: CylinderCapacity;
}
