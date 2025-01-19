import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/interfaces';

export const META_ROLES = 'roles';

// @RoleProtected(Role.ADMIN, Role.USER)
export const RoleProtected = (...args: Role[]) => SetMetadata(META_ROLES, args);