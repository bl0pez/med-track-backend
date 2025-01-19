import { PickType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}