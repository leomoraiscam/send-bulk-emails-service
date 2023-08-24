export interface IJWTProps {
  userId: string;
  token: string;
}

export interface IJWTTokenPayload {
  exp: number;
  sub: string;
}
