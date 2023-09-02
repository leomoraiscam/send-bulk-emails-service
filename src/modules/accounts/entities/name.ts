import { Either, left, right } from '@core/logic/Either';

import { InvalidNameError } from './errors/InvalidNameError';

export class Name {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public get value(): string {
    return this.name;
  }

  public static validate(name: string): boolean {
    if (!name) {
      return false;
    }

    if (name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    return true;
  }

  public static create(name: string): Either<InvalidNameError, Name> {
    const isValid = this.validate(name);

    if (!isValid) {
      return left(new InvalidNameError(name));
    }

    return right(new Name(name));
  }
}
