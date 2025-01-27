import { Patient, PatientStatus } from '@prisma/client';
import { IsString, Matches, MinLength } from 'class-validator';

export class PatientEntity implements Patient {
  status: PatientStatus;
  createdBy: number;
  closedBy: number;
  closedAt: Date;
  @IsString()
  @MinLength(3)
  name: string;
  id: number;
  @IsString()
  @Matches(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/) // 12.345.678-9
  rut: string;
  createdAt: Date;
  updatedAt: Date;
}
