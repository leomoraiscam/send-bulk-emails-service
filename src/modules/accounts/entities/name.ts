// eslint-disable-next-line max-classes-per-file
export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`The name "${name}" is invalid.`);
    this.name = 'InvalidNameError';
  }
}

class Name {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  private constructor(name: string) {
    this.name = name;
  }

  static validate(name: string): boolean {
    if (!name) {
      return false;
    }

    if (name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(name: string): Name | Error {
    const isValid = this.validate(name);

    if (!isValid) {
      return new InvalidNameError(name);
    }

    return new Name(name);
  }
}

export default Name;
