import Email from './email';
import Name from './name';

interface ISenderProps {
  name: Name;
  email: Email;
  isValidated?: boolean;
  isDefault?: boolean;
}

class Sender {
  private readonly _name: Name;
  private readonly _email: Email;

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  constructor(name: Name, email: Email) {
    this._name = name;
    this._email = email;
  }

  static create({ name, email }: ISenderProps): Sender | Error {
    return new Sender(name, email);
  }
}

export default Sender;
