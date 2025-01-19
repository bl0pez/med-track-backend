import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// @Auth()
export function Auth(...roles: Role[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtAuthGuard, UserRoleGuard),
  );
}