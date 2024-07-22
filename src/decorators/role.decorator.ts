import { SetMetadata } from '@nestjs/common';
import { Role } from './../enums/role.enum';
export let ROLES_KEYS = 'roles';
export const Roles = (...roles: Role[]) =>
  SetMetadata((ROLES_KEYS = 'roles'), roles);
