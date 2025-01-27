import { Type } from 'class-transformer';
import {
  IsOptional,
  IsISO8601,
  Matches,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class GetMetricsDto {
  @IsOptional()
  @IsISO8601()
  day?: string; //(formato YYYY-MM-DD)

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'La hora de inicio debe estar en formato HH:mm',
  })
  startTime?: string; //(HH:mm)

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'La hora de finalización debe estar en formato HH:mm',
  })
  endTime?: string; //(HH:mm)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'El mes debe ser mayor o igual a 1' })
  @Max(12, { message: 'El mes debe ser menor o igual a 12' })
  month?: number; // (01-12)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2025, { message: 'El año debe ser mayor o igual a 2025' })
  @Max(new Date().getFullYear(), {
    message: `El año debe ser menor o igual a ${new Date().getFullYear()}`,
  })
  year?: number; //(2000-2100)
}
