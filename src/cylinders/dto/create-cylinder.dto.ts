import { CylinderCapacity } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateCylinderDto {
  @IsString()
  @MinLength(2)
  serialNumber: string;

  @IsEnum([CylinderCapacity.SIX_M3, CylinderCapacity.SIX_M3])
  capacity: CylinderCapacity;
}
