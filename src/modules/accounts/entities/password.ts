import { Either, left, right } from '@core/logic/Either';

import { InvalidSecurityPasswordError } from './errors';
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError';

export class Password {
  private readonly password: string;
  private readonly hashed?: boolean;

  private constructor(password: string, hashed: boolean) {
    this.password = password;
    this.hashed = hashed;
  }

  public get value(): string {
    return this.password;
  }

  public get isHashedValue(): boolean {
    return this.hashed;
  }

  public static validate(password: string): boolean {
    if (!password) {
      return false;
    }

    if (password.trim().length < 6 || password.trim().length > 255) {
      return false;
    }

    return true;
  }

  public static create(
    password: string,
    hashed = false
  ): Either<
    InvalidPasswordLengthError | InvalidSecurityPasswordError,
    Password
  > {
    const isValid = this.validate(password);

    if (!isValid) {
      return left(new InvalidPasswordLengthError());
    }

    if (!hashed) {
      return left(new InvalidSecurityPasswordError());
    }

    return right(new Password(password, hashed));
  }
}
