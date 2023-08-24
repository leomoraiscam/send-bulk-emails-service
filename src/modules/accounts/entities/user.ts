import { IUserProps } from './dtos/IUserProps';
import Email from './email';
import Name from './name';
import Password from './password';

class User {
  private readonly _name: Name;
  private readonly _email: Email;
  private readonly _password: Password;

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  constructor(name: Name, email: Email, password: Password) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  static create({ name, email, password }: IUserProps): User | Error {
    return new User(name, email, password);
  }
}

export default User;
