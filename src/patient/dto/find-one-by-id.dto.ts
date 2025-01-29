import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class FindOneByIdDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id: number;
}
