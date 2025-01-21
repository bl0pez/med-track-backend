import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindOneByIdDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
