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

export interface Hasher {
  hash(data: string, saltRounds?: number): string;
  compare(data: string, encrypted: string): Promise<boolean>;
}
