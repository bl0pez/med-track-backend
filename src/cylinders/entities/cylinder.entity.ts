import { CylinderCapacity, CylinderStatus } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CylinderEntity {
  id: number;

  @IsString()
  @MinLength(2)
  serialNumber: string;

  @IsEnum(CylinderCapacity)
  capacity: CylinderCapacity;

  @IsEnum(CylinderStatus)
  status: CylinderStatus;
  createdAt: Date;
  updatedAt: Date;
}
