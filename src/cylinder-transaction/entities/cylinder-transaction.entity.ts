import { $Enums } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CylinderTransactionEntity {
  id: number;

  @IsInt()
  @IsPositive()
  cylinderId: number;

  @IsInt()
  @IsPositive()
  deliveredBy: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  receivedBy?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  patientId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  serviceId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  externalId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  samuId?: number;

  @IsEnum($Enums.TransactionAction)
  action: $Enums.TransactionAction;

  deliveredAt: Date;
  returnedAt: Date;
  performedAt: Date;
}
