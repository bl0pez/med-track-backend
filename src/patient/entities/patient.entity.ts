import { PatientStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsString, isString, Matches, MinLength } from "class-validator";

export class Patient  {
    @IsString()
    @MinLength(3)
    name: string;
    id: number;
    @IsString()
    @Matches(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$/) // 12.345.678-9
    rut: string;
    @IsEnum(PatientStatus)
    status: PatientStatus;
    createdAt: Date;
    updatedAt: Date;
}