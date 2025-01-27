// import { PickType } from "@nestjs/mapped-types";
// import { Tank } from "../entities/tank.entity";
// import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
// import { Type } from "class-transformer";

// export class TankSearchDto extends PickType(Tank, ['patient_id', 'external_id', 'service_id'] as const) {
//     @IsOptional()
//     @IsString()
//     search: string;

//     @Type(() => Number)
//     @IsNumber()
//     @IsPositive()
//     @IsOptional()
//     page?: number;

//     @Type(() => Number)
//     @IsNumber()
//     @IsPositive()
//     @IsOptional()
//     limit?: number;
// };