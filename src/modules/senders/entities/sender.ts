import { v4 as uuidV4 } from 'uuid';

import Email from './email';
import Name from './name';

interface ISenderProps {
  name: Name;
  email: Email;
  isValidated?: boolean;
  isDefault?: boolean;
}

class Sender {
  private readonly _id: string;
  private readonly _name: Name;
  private readonly _email: Email;
  private _isDefault: boolean;

  get id(): string {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get isDefault() {
    return this._isDefault;
  }

  unsetAsDefault() {
    this._isDefault = false;
  }

  setAsDefault() {
    this._isDefault = true;
  }

  constructor(name: Name, email: Email, _isDefault?: boolean, id?: string) {
    this._id = id ?? uuidV4();
    this._name = name;
    this._email = email;
    this._isDefault = _isDefault ?? false;
  }

  static create(
    { name, email, isDefault }: ISenderProps,
    id?: string
  ): Sender | Error {
    return new Sender(name, email, isDefault, id);
  }
}

export default Sender;
