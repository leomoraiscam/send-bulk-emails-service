import InvalidNameError from './errors/InvalidNameError';

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

  static create(name: string): Name | string {
    const isValid = this.validate(name);

    if (!isValid) {
      const { name: NameError } = new InvalidNameError(name);

      return NameError;
    }

    return new Name(name);
  }
}

export default Name;
