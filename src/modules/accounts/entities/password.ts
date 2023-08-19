import InvalidPasswordLengthError from './errors/InvalidPasswordLengthError';

class Password {
  private readonly password: string;
  private readonly hashed?: boolean;

  get value(): string {
    return this.password;
  }

  get isHashedValue(): boolean {
    return this.hashed;
  }

  constructor(password: string, hashed: boolean) {
    this.password = password;
    this.hashed = hashed;
  }

  static validate(password: string) {
    if (!password) {
      return false;
    }

    if (password.trim().length < 6 || password.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(password: string, hashed = false): Password | Error {
    const isValid = this.validate(password);

    if (!isValid) {
      return new InvalidPasswordLengthError();
    }

    return new Password(password, hashed);
  }
}

export default Password;
