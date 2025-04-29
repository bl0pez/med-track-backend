export enum RequestType {
  AMBULANCE = 'AMBULANCE',
  EXTERNAL = 'EXTERNAL',
  SERVICE = 'SERVICE',
  PATIENT = 'PATIENT',
}

export enum TimeFilter {
  DAY = 'day',
  MONTH = 'month',
}

export interface JwtPayload {
  id: number;
}

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

export enum TankSize {
  SIX_M3 = 'SIX_M3',
  TEN_M3 = 'TEN_M3',
}

export enum TankStatus {
  DELIVERED = 'DELIVERED',
  RETURNeD = 'RETURNED',
}

export interface Hasher {
  hash(data: string, saltRounds?: number): string;
  compare(data: string, encrypted: string): Promise<boolean>;
}
