// eslint-disable-next-line max-classes-per-file
import Email from '@modules/accounts/entities/email';
import Name from '@modules/accounts/entities/name';
import Password from '@modules/accounts/entities/password';
import User from '@modules/accounts/entities/user';

interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export type RegisterUserResponse = Partial<IRegisterUserRequest>;

export class InvalidPasswordLengthError extends Error {
  constructor() {
    super(`The password must have between 6 and 255 characters.`);
    this.name = 'InvalidPasswordLengthError';
  }
}

class RegisterUser {
  async execute(
    request: IRegisterUserRequest
  ): Promise<RegisterUserResponse | string> {
    const { name, email, password } = request;

    const nameOrError = Name.create(name);

    if (nameOrError instanceof Error) {
      throw new Error(`Name to user is invalid`);
    }

    const emailOrError = Email.create(email);

    if (emailOrError instanceof Error) {
      throw new Error(`E-mail to user is invalid`);
    }

    const passwordOrError = Password.create(password) as Password;

    if (passwordOrError instanceof Error) {
      const { name } = new InvalidPasswordLengthError();

      return name;
    }

    const userOrError = User.create({
      name: nameOrError,
      email: emailOrError,
      password: passwordOrError,
    });

    if (userOrError instanceof Error) {
      throw new Error(`User data is incorrect`);
    }

    return {
      name: userOrError.name.value,
      email: userOrError.email.value,
    };
  }
}

export default RegisterUser;
