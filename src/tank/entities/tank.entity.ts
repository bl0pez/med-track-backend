// import { $Enums } from "@prisma/client";
// import { Type } from "class-transformer";
// import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

// export class Tank {
//     id: number;

//     @IsString()
//     number_tank: string;

//     @IsEnum($Enums.RequestType)
//     request_type: $Enums.RequestType;

//     @IsEnum($Enums.TankCapacity)
//     capacity: $Enums.TankCapacity;

//     @IsEnum($Enums.TankStatus)
//     status: $Enums.TankStatus;

//     @IsOptional()
//     @Type(() => Number)
//     @IsInt()
//     @IsPositive()
//     patient_id: number | null;

//     @IsOptional()
//     @Type(() => Number)
//     @IsInt()
//     @IsPositive()
//     service_id: number | null;

//     @IsOptional()
//     @Type(() => Number)
//     @IsInt()
//     @IsPositive()
//     external_id: number | null;

//     deliveredAt: Date;
//     returnedAt: Date;
//     createdAt: Date;
//     updatedAt: Date;
// }
