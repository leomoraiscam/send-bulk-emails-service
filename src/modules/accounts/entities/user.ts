import { Either, right } from '@core/logic/Either';
import { InvalidNameError } from '@modules/senders/entities/errors';

import { Name, Email, Password } from '.';
import { IUserProps } from './dtos/IUserProps';
import {
  InvalidEmailError,
  InvalidPasswordLengthError,
  InvalidSecurityPasswordError,
} from './errors';

export class User {
  private readonly _name: Name;
  private readonly _email: Email;
  private readonly _password: Password;

  private constructor(name: Name, email: Email, password: Password) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public get name(): Name {
    return this._name;
  }

  public get email(): Email {
    return this._email;
  }

  public get password(): Password {
    return this._password;
  }

  public static create({
    name,
    email,
    password,
  }: IUserProps): Either<
    | InvalidEmailError
    | InvalidNameError
    | InvalidPasswordLengthError
    | InvalidSecurityPasswordError,
    User
  > {
    return right(new User(name, email, password));
  }
}
