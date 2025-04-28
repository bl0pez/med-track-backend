import { PickType } from '@nestjs/mapped-types';
import { PatientEntity } from '../entities/patient.entity';

export class CreatePatientDto extends PickType(PatientEntity, [
  'name',
  'rut',
  'address',
  'phone',
] as const) {}
