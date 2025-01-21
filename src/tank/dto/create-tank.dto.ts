import { PickType } from "@nestjs/mapped-types";
import { Tank } from "../entities/tank.entity";

export class CreateTankDto extends PickType(Tank, ['number_tank', 'request_type', 'capacity', 'status', 'patient_id', 'service_id', 'external_id'] as const) {}
