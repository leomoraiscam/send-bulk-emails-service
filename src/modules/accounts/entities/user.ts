import Email from './email';
import Name from './name';
import Password from './password';

interface IUserProps {
  name: Name;
  email: Email;
  password: Password;
}

class User {
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  constructor(name: Name, email: Email, password: Password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create({ name, email, password }: IUserProps): User | Error {
    return new User(name, email, password);
  }
}

export default User;
