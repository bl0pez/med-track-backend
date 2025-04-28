import { Patient } from '@prisma/client';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class PatientEntity implements Patient {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
  createdById: number;
  closedById: number;
  isClosed: boolean;
  createdBy: number;
  closedBy: number;
  closedAt: Date;
  @IsString()
  @MinLength(3)
  name: string;
  id: number;
  @IsString()
  @Matches(/^\d{1,8}-[\dkK]$/, {
    message: 'Formato de RUT inválido (XXXXXXX-X)',
  })
  rut: string;
  createdAt: Date;
  updatedAt: Date;
}
