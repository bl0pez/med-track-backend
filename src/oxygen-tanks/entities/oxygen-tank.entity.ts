import { OxygenTank } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TankSize, TankStatus } from 'src/interfaces';

export class OxygenTankEntity implements OxygenTank {
  id: number;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsEnum(TankSize)
  size: TankSize;

  @IsEnum(TankStatus)
  status: TankStatus;

  deliveredAt: Date;
  returnedAt: Date;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  patientId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  deliveredById: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  receivedById: number;
}
