import { PartialType, PickType } from '@nestjs/mapped-types';
import { CylinderEntity } from '../entities/cylinder.entity';

export class UpdateCylinderDto extends PartialType(
  PickType(CylinderEntity, ['capacity', 'serialNumber', 'status'] as const),
) {}
