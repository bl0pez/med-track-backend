export interface JwtPayload {
  id: number;
}

export enum Role {
  ADMIN,
  USER,
  MAINTENANCE,
}

export interface Hasher {
  hash(data: string, saltRounds?: number): string;
  compare(data: string, encrypted: string): Promise<boolean>;
}
