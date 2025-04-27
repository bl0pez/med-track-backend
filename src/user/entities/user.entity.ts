import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class User {
  readonly id: number;

  @IsString()
  @MinLength(3)
  readonly name: string;
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @IsOptional()
  readonly roles: Role[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
