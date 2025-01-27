// import { PatientStatus } from '@prisma/client';
// import { Type } from 'class-transformer';
// import {
//   IsEnum,
//   IsNumber,
//   IsOptional,
//   IsPositive,
//   IsString,
// } from 'class-validator';

// export class findPatientsDto {
//   @IsString()
//   @IsOptional()
//   search?: string;

//   @IsEnum(PatientStatus)
//   @IsOptional()
//   status?: PatientStatus;

//   @Type(() => Number)
//   @IsNumber()
//   @IsPositive()
//   @IsOptional()
//   page?: number;

//   @Type(() => Number)
//   @IsNumber()
//   @IsPositive()
//   @IsOptional()
//   limit?: number;
// }
