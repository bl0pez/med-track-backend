import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { RequestType } from 'src/interfaces';

export class CreateCylinderTransactionDto {
  @IsString()
  serialNumber: string;

  @IsEnum(RequestType)
  requestType: RequestType;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  recipientId: number;
}
