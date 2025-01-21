import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class PaginationDto {
      @IsString()
      @IsOptional()
      search?: string;
    
      @Type(() => Number)
      @IsNumber()
      @IsPositive()
      @IsOptional()
      page?: number;
    
      @Type(() => Number)
      @IsNumber()
      @IsPositive()
      @IsOptional()
      limit?: number;
}