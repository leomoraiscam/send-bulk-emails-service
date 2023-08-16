class Name {
  public readonly value: string;

  private constructor(name: string) {
    this.value = name;
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
      throw new Error();
    }

    return new Name(name);
  }
}

export default Name;
