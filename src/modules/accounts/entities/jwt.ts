import { sign, verify } from 'jsonwebtoken';

import auth from '@config/auth';

import User from './user';

interface IJWTData {
  userId: string;
  token: string;
}

export interface IJWTTokenPayload {
  exp: number;
  sub: string;
}

class JWT {
  private readonly userId: string;
  private readonly token: string;

  get value(): string {
    return this.token;
  }

  private constructor({ userId, token }: IJWTData) {
    this.userId = userId;
    this.token = token;
  }

  static decodeToken(token: string): IJWTTokenPayload {
    try {
      const decoded = verify(token, auth.secretKey) as IJWTTokenPayload;

      return decoded;
    } catch (err) {
      throw new Error();
    }
  }

  static createFromJWT(token: string): Error | JWT {
    const jwtPayloadOrError = this.decodeToken(token);

    if (jwtPayloadOrError instanceof Error) {
      throw new Error();
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.sub });

    return jwt;
  }

  static signUser({ email }: User): JWT {
    const token = sign({}, auth.secretKey, {
      subject: String(email),
      expiresIn: auth.expiresIn,
    });

    return new JWT({ userId: 'userId', token });
  }
}

export default JWT;
