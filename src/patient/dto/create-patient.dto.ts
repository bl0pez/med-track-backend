import { PickType } from "@nestjs/mapped-types";
import { Patient } from "../entities/patient.entity";

export class CreatePatientDto extends PickType(Patient, ['name', 'rut'] as const) {}