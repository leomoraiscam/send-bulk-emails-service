// eslint-disable-next-line max-classes-per-file
export class InvalidPasswordLengthError extends Error {
  constructor() {
    super(`The password must have between 6 and 255 characters.`);
    this.name = 'InvalidPasswordLengthError';
  }
}

class Password {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  constructor(password: string) {
    this.password = password;
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

  static create(password: string): Password | string {
    const isValid = this.validate(password);

    if (!isValid) {
      const { name } = new InvalidPasswordLengthError();

      return name;
    }

    return new Password(password);
  }
}

export default Password;
