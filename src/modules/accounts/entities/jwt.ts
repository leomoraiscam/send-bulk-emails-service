import { sign, verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { Either, left, right } from '@core/logic/Either';

import { User } from '.';
import { IJWTProps, IJWTTokenPayload } from './dtos/IJwtProps';
import { InvalidJWTTokenError } from './errors';

export class JWT {
  private readonly userId: string;
  private readonly token: string;

  private constructor({ userId, token }: IJWTProps) {
    this.userId = userId;
    this.token = token;
  }

  public get value(): string {
    return this.token;
  }

  public static decodeToken(
    token: string
  ): Either<InvalidJWTTokenError, IJWTTokenPayload> {
    try {
      const decoded = verify(token, auth.secretKey) as IJWTTokenPayload;

      return right(decoded);
    } catch (err) {
      return left(new InvalidJWTTokenError());
    }
  }

  public static createFromJWT(
    token: string
  ): Either<InvalidJWTTokenError, JWT> {
    const jwtPayloadOrError = this.decodeToken(token);

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value);
    }

    return right(new JWT({ token, userId: jwtPayloadOrError.value.sub }));
  }

  public static signUser({ email }: User): Either<null, JWT> {
    const token = sign({}, auth.secretKey, {
      subject: String(email),
      expiresIn: auth.expiresIn,
    });

    return right(new JWT({ userId: 'userId', token }));
  }
}
