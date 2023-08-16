class Email {
  public readonly value: string;

  constructor(email: string) {
    this.value = email;
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

  static create(email: string): Email {
    const isValid = this.validate(email);

    if (!isValid) {
      throw new Error();
    }

    return new Email(email);
  }
}

export default Email;
