// eslint-disable-next-line max-classes-per-file
export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`The email "${email}" is invalid.`);
    this.name = 'InvalidEmailError';
  }
}

class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  constructor(email: string) {
    this.email = email;
  }

  static validate(email: string): boolean {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) {
      return false;
    }

    if (!email.includes('@')) {
      return false;
    }

    if (!emailRegex.test(email)) {
      return false;
    }

    const [localPart, domainPart] = email.split('@');

    if (email.length > 320) {
      return false;
    }

    if (localPart.length > 64 || localPart.length === 0) {
      return false;
    }

    if (domainPart.length > 255) {
      return false;
    }

    const domainParts = domainPart.split('.');

    if (
      domainParts.some((part) => {
        return part.length > 63;
      })
    ) {
      return false;
    }

    return true;
  }

  static create(email: string): Email | string {
    const isValid = this.validate(email);

    if (!isValid) {
      const { name } = new InvalidEmailError(email);

      return name;
    }

    return new Email(email);
  }
}

export default Email;
